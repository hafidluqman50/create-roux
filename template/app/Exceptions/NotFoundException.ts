import { Exception } from "./Exception"

export class NotFoundException extends Exception {
  public data: any|null
  
  constructor(message: any, data: any|null) {
    super(message, 404, data)
  }
}