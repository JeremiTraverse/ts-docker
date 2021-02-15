import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
import {IRequestSession} from "../types";
import db from "../database";
import bcrypt from "bcrypt";

dotenv.config();

interface User {
  email?: String,
  password?: String,
  name: String
}

export async function hashPassword (password : String){
  const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUND));
  const hashedPassword = bcrypt.hashSync(password, salt)
  return hashedPassword; 
}

export async function authenticateSession(req : IRequestSession , res, next) {
  const sessionId = req.session.sessionId;
  console.log(sessionId);
  if(req.path === "/auth/login") {next()}
  if(sessionId) {
    await db.Sessions.findOne({where: {sessionId : sessionId}})
      .then(response => {
        if(response !== null){
          next();
        }
        else {
          res.sendStatus(403);
        }
      })
  }
  else {
    res.sendStatus(401);
  }
}

export function generateToken(user : User) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}

export function decypherToken(token) {
  const decoded = jwt.decode(token);
  return decoded;
}

export function generateRandomString() {
  return crypto.randomBytes(64).toString('hex');
}
