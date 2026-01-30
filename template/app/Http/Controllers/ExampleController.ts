import { Request, Response } from 'express'
import ExampleService from '@Services/ExampleService'
import ExampleCreateRequest from '@Requests/Example/ExampleCreateRequest'
import ExampleUpdateRequest from '@Requests/Example/ExampleUpdateRequest'

class ExampleController {
  private service: ExampleService

  constructor(service = new ExampleService()) {
    this.service = service
    this.index = this.index.bind(this)
    this.show = this.show.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.destroy = this.destroy.bind(this)
  }

  async index(req: Request, res: Response): Promise<Response> {
    const data = await this.service.list()
    return res.json({ data })
  }

  async show(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id)
    const data = await this.service.getById(id)
    return res.json({ data })
  }

  async create(req: Request, res: Response): Promise<Response> {
    const payload = ExampleCreateRequest.validate(req.body)
    const data = await this.service.create(payload)
    return res.status(201).json({ data })
  }

  async update(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id)
    const payload = ExampleUpdateRequest.validate(req.body)
    const data = await this.service.update(id, payload)
    return res.json({ data })
  }

  async destroy(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id)
    const data = await this.service.remove(id)
    return res.json({ data })
  }
}

export default ExampleController
