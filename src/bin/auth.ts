import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IGetUserAuthInfoRequest } from "../types";
dotenv.config();

interface User {
    email?: String,
    password?: String,
    name: String
}

let refreshTokens = [];

export function refreshToken(req) {
    console.log(req);
    const refreshToken = req.body.refreshToken;
    if (refreshToken == null) return 401; 
    if (!refreshTokens.includes(refreshToken)) return 403;
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return 403;
        const accessToken = generateToken({name: user.name}, "access");
        return accessToken;
    })

}

export function authenticateToken(req : IGetUserAuthInfoRequest, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err){ 
            refreshToken(req);
        }
        req.user = user;
        next();
   })
}

export function generateToken(user : User, tokenType : String ) {
    if(tokenType == "refresh")  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET); 

    if(tokenType == "access" ) return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "10s"});
}


