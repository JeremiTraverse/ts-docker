import { Request } from "express"
let session = require('express-session');
export interface User {
    password? : String,
    name?: String,
    email?: String,
}

export interface IGetUserAuthInfoRequest extends Request {
  user: User// or any other type
}

export interface IRequestSession extends Request {
  session: any
}

