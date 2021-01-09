import { Request } from "express"

export interface User {
    password? : String,
    name?: String,
    email?: String,
}

export interface IGetUserAuthInfoRequest extends Request {
  user: User// or any other type
}
