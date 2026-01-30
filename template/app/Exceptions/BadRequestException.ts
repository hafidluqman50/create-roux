import { Exception } from "./Exception"

export class BadRequestException extends Exception {
  constructor(message: string, data:any|null) {
    super(message, 400, data)
  }
}