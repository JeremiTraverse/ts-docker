import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
import {IRequestSession} from "../types";
import db from "../database";

dotenv.config();

interface User {
    email?: String,
    password?: String,
    name: String
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
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded){
    if(err) {
      return err;
    } else {
      return decoded;
    }
  })
}

export function generateRandomString() {
  return crypto.randomBytes(64).toString('hex');
}
