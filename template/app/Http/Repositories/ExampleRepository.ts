import Example from '@Models/Example'
import { ExampleCreateDTO } from '@DTOs/Example/ExampleCreateDTO'
import { ExampleUpdateDTO } from '@DTOs/Example/ExampleUpdateDTO'

class ExampleRepository {
  async list(): Promise<Example[]> {
    return Example.findAll()
  }

  async getById(id: number): Promise<Example | null> {
    return Example.findByPk(id)
  }

  async create(payload: ExampleCreateDTO): Promise<Example> {
    return Example.create(payload)
  }

  async update(id: number, payload: ExampleUpdateDTO): Promise<Example | null> {
    const record = await Example.findByPk(id)
    if (!record) return null
    return record.update(payload)
  }

  async remove(id: number): Promise<Example | null> {
    const record = await Example.findByPk(id)
    if (!record) return null
    await record.destroy()
    return record
  }
}

export default ExampleRepository
