import { ExampleCreateDTO } from '@DTOs/Example/ExampleCreateDTO'

class ExampleCreateRequest {
  static validate(payload: Record<string, unknown>): ExampleCreateDTO {
    const name = String(payload.name ?? '').trim()
    if (!name) {
      throw new Error('name is required')
    }

    const description = typeof payload.description === 'string'
      ? payload.description
      : undefined

    return { name, description }
  }
}

export default ExampleCreateRequest
