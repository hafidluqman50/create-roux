#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')

const [,, type, rawName] = process.argv

const supported = new Set(['model', 'service', 'repository', 'controller', 'route'])

if (!type || !rawName || !supported.has(type)) {
  console.log('Usage: node scripts/generate.js <model|service|repository|controller|route> <Name>')
  process.exit(1)
}

const toWords = (value) => {
  const spaced = value
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]/g, ' ')
  return spaced
    .split(' ')
    .map((part) => part.trim())
    .filter(Boolean)
}

const words = toWords(rawName)
if (words.length === 0) {
  console.log('Invalid name. Example: npm run generate:model -- User')
  process.exit(1)
}

const pascal = words.map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).join('')
const camel = pascal[0].toLowerCase() + pascal.slice(1)
const kebab = words.map((w) => w.toLowerCase()).join('-')

const projectRoot = path.resolve(__dirname, '..')

const templates = {
  model: () => `import { DataTypes, Model, Optional } from 'sequelize'\nimport database from '@config/database'\n\ninterface ${pascal}Attributes {\n  id: number\n  createdAt?: Date\n  updatedAt?: Date\n}\n\ninterface ${pascal}CreationAttributes extends Optional<${pascal}Attributes, 'id' | 'createdAt' | 'updatedAt'> {}\n\nclass ${pascal} extends Model<${pascal}Attributes, ${pascal}CreationAttributes> implements ${pascal}Attributes {\n  public id!: number\n  public readonly createdAt!: Date\n  public readonly updatedAt!: Date\n}\n\n${pascal}.init(\n  {\n    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }\n  },\n  {\n    sequelize: database,\n    tableName: '${kebab}s',\n    timestamps: true\n  }\n)\n\nexport default ${pascal}\n`,
  repository: () => `import ${pascal} from '@Models/${pascal}'\n\nclass ${pascal}Repository {\n  async list(): Promise<${pascal}[]> {\n    return ${pascal}.findAll()\n  }\n\n  async getById(id: number): Promise<${pascal} | null> {\n    return ${pascal}.findByPk(id)\n  }\n\n  async create(payload: Record<string, unknown>): Promise<${pascal}> {\n    return ${pascal}.create(payload as unknown as ${pascal})\n  }\n\n  async update(id: number, payload: Record<string, unknown>): Promise<${pascal} | null> {\n    const record = await ${pascal}.findByPk(id)\n    if (!record) return null\n    return record.update(payload as unknown as ${pascal})\n  }\n\n  async remove(id: number): Promise<${pascal} | null> {\n    const record = await ${pascal}.findByPk(id)\n    if (!record) return null\n    await record.destroy()\n    return record\n  }\n}\n\nexport default ${pascal}Repository\n`,
  service: () => `import ${pascal}Repository from '@Repositories/${pascal}Repository'\n\nclass ${pascal}Service {\n  private repository: ${pascal}Repository\n\n  constructor(repository = new ${pascal}Repository()) {\n    this.repository = repository\n  }\n\n  async list(): Promise<ReturnType<${pascal}Repository['list']>> {\n    return this.repository.list()\n  }\n\n  async getById(id: number): Promise<ReturnType<${pascal}Repository['getById']>> {\n    return this.repository.getById(id)\n  }\n\n  async create(payload: Record<string, unknown>): Promise<ReturnType<${pascal}Repository['create']>> {\n    return this.repository.create(payload)\n  }\n\n  async update(id: number, payload: Record<string, unknown>): Promise<ReturnType<${pascal}Repository['update']>> {\n    return this.repository.update(id, payload)\n  }\n\n  async remove(id: number): Promise<ReturnType<${pascal}Repository['remove']>> {\n    return this.repository.remove(id)\n  }\n}\n\nexport default ${pascal}Service\n`,
  controller: () => `import { Request, Response } from 'express'\nimport ${pascal}Service from '@Services/${pascal}Service'\n\nclass ${pascal}Controller {\n  private service: ${pascal}Service\n\n  constructor(service = new ${pascal}Service()) {\n    this.service = service\n    this.index = this.index.bind(this)\n    this.show = this.show.bind(this)\n    this.create = this.create.bind(this)\n    this.update = this.update.bind(this)\n    this.destroy = this.destroy.bind(this)\n  }\n\n  async index(req: Request, res: Response): Promise<Response> {\n    const data = await this.service.list()\n    return res.json({ data })\n  }\n\n  async show(req: Request, res: Response): Promise<Response> {\n    const id = Number(req.params.id)\n    const data = await this.service.getById(id)\n    return res.json({ data })\n  }\n\n  async create(req: Request, res: Response): Promise<Response> {\n    const data = await this.service.create(req.body)\n    return res.status(201).json({ data })\n  }\n\n  async update(req: Request, res: Response): Promise<Response> {\n    const id = Number(req.params.id)\n    const data = await this.service.update(id, req.body)\n    return res.json({ data })\n  }\n\n  async destroy(req: Request, res: Response): Promise<Response> {\n    const id = Number(req.params.id)\n    const data = await this.service.remove(id)\n    return res.json({ data })\n  }\n}\n\nexport default ${pascal}Controller\n`,
  route: () => `import { Router } from 'express'\nimport ${pascal}Controller from '@Controllers/${pascal}Controller'\n\nconst router = Router()
const controller = new ${pascal}Controller()
\nrouter.get('/', controller.index)
router.get('/:id', controller.show)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.destroy)
\nexport default router\n`
}

const targets = {
  model: path.join(projectRoot, 'app', 'Models', `${pascal}.ts`),
  repository: path.join(projectRoot, 'app', 'Http', 'Repositories', `${pascal}Repository.ts`),
  service: path.join(projectRoot, 'app', 'Http', 'Services', `${pascal}Service.ts`),
  controller: path.join(projectRoot, 'app', 'Http', 'Controllers', `${pascal}Controller.ts`),
  route: path.join(projectRoot, 'routes', `${kebab}.ts`)
}

const targetPath = targets[type]
if (!targetPath) {
  console.log(`Unsupported type: ${type}`)
  process.exit(1)
}

fs.mkdirSync(path.dirname(targetPath), { recursive: true })

if (fs.existsSync(targetPath)) {
  console.log(`File already exists: ${path.relative(projectRoot, targetPath)}`)
  process.exit(1)
}

fs.writeFileSync(targetPath, templates[type](), 'utf8')

if (type === 'route') {
  const appRoutesPath = path.join(projectRoot, 'routes', 'app.ts')
  if (fs.existsSync(appRoutesPath)) {
    let content = fs.readFileSync(appRoutesPath, 'utf8')
    const importMarkerStart = '// AUTO-GENERATED ROUTES IMPORTS'
    const importMarkerEnd = '// END AUTO-GENERATED ROUTES IMPORTS'
    const useMarkerStart = '// AUTO-GENERATED ROUTES'
    const useMarkerEnd = '// END AUTO-GENERATED ROUTES'

    const importLine = `import ${camel}Routes from '@routes/${kebab}'`
    const useLine = `app.use('/api/${kebab}', ${camel}Routes)`

    const insertBetween = (text, start, end, line) => {
      const startIndex = text.indexOf(start)
      if (startIndex === -1) return text
      const endIndex = text.indexOf(end, startIndex)
      if (endIndex === -1) return text
      const before = text.slice(0, startIndex + start.length)
      const middle = text.slice(startIndex + start.length, endIndex)
      const after = text.slice(endIndex)
      if (middle.includes(line)) return text
      const paddedLine = `\n${line}`
      return `${before}${paddedLine}${middle}${after}`
    }

    content = insertBetween(content, importMarkerStart, importMarkerEnd, importLine)
    content = insertBetween(content, useMarkerStart, useMarkerEnd, useLine)

    fs.writeFileSync(appRoutesPath, content, 'utf8')
  }
}

console.log(`Generated ${type}: ${path.relative(projectRoot, targetPath)}`)
