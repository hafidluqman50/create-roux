#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)
const targetName = args[0] || 'roux-app'
const targetDir = path.resolve(process.cwd(), targetName)
const templateDir = path.resolve(__dirname, '..', 'template')

const ensureEmptyTarget = () => {
  if (!fs.existsSync(targetDir)) return
  const files = fs.readdirSync(targetDir)
  if (files.length > 0) {
    console.error(`Target directory is not empty: ${targetDir}`)
    process.exit(1)
  }
}

const copyDir = (src, dest) => {
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.DS_Store') {
      continue
    }

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

const updatePackageName = () => {
  const pkgPath = path.join(targetDir, 'package.json')
  if (!fs.existsSync(pkgPath)) return
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
  pkg.name = targetName
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8')
}

ensureEmptyTarget()
copyDir(templateDir, targetDir)
updatePackageName()

console.log(`\nRoux project created at ${targetDir}`)
console.log('Next steps:')
console.log(`  cd ${targetName}`)
console.log('  npm install')
console.log('  cp .env.example .env')
console.log('  npm run compile')
console.log('  npm run start')
