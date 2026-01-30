import { Exception } from "./Exception"

export class ServerErrorException extends Exception {
  
  public data: any|null
  
  constructor(message: any, data: any|null) {
    super(message, 500, data)
  }
}