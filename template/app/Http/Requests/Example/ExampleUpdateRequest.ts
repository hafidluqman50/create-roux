import { ExampleUpdateDTO } from '@DTOs/Example/ExampleUpdateDTO'

class ExampleUpdateRequest {
  static validate(payload: Record<string, unknown>): ExampleUpdateDTO {
    const data: ExampleUpdateDTO = {}

    if (payload.name !== undefined) {
      const name = String(payload.name ?? '').trim()
      if (!name) throw new Error('name cannot be empty')
      data.name = name
    }

    if (payload.description !== undefined) {
      data.description = String(payload.description)
    }

    return data
  }
}

export default ExampleUpdateRequest
