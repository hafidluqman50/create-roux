import ExampleRepository from '@Repositories/ExampleRepository'
import { ExampleCreateDTO } from '@DTOs/Example/ExampleCreateDTO'
import { ExampleUpdateDTO } from '@DTOs/Example/ExampleUpdateDTO'

class ExampleService {
  private repository: ExampleRepository

  constructor(repository = new ExampleRepository()) {
    this.repository = repository
  }

  async list(): Promise<ReturnType<ExampleRepository['list']>> {
    return this.repository.list()
  }

  async getById(id: number): Promise<ReturnType<ExampleRepository['getById']>> {
    return this.repository.getById(id)
  }

  async create(payload: ExampleCreateDTO): Promise<ReturnType<ExampleRepository['create']>> {
    return this.repository.create(payload)
  }

  async update(id: number, payload: ExampleUpdateDTO): Promise<ReturnType<ExampleRepository['update']>> {
    return this.repository.update(id, payload)
  }

  async remove(id: number): Promise<ReturnType<ExampleRepository['remove']>> {
    return this.repository.remove(id)
  }
}

export default ExampleService
