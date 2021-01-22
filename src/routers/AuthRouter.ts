import { Router , Request} from "express";
import db from "../database";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import { generateToken, generateRandomString, authenticateSession, decypherToken, hashPassword } from "../bin/auth";
import { IRequestSession, User, IForgotPassword } from "../types";
import {getUser} from "../bin/queries";
dotenv.config();

let AuthRouter = Router();

AuthRouter.post('/register', async (req : Request, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUND));
    const hashedPw = bcrypt.hashSync(password, salt);   
    db.User.findOne({where: {email:email}})
        .then(response => {
            if(response !== null) {
                res.send("email is already used");
                console.log("email is already used");
            } else {
                console.log(hashedPw, "hashed password")
                db.User.create({name, email, password : hashedPw})
                    .then(response => {
                        res.send({"success" : "user had been created"})
                    });
            }
        });
})

AuthRouter.post('/login', async (req : IRequestSession, res) => {
    const email = req.body.email;
    await db.User.findOne({where : {email}})
        .then(response => {
            if(response !== null) {
                const isPasswordValid = bcrypt.compareSync(req.body.password, response.password);
                if(isPasswordValid) {
                    const user = {email: response.email, password: response.password, name: response.name}
                    const accessToken = generateToken(user);
                    const sessionId = generateRandomString(); 
                    // create session
                    try {
                      db.Sessions.create({sessionUser : accessToken, sessionId: sessionId});
                    } catch(err) {
                      res.send({"err" : `coudlnt create the session : ${err}` })

                    }
                    // save sessionId into a cookie
                    req.session.userEmail = response.email;
                    req.session.sessionId = sessionId;
                    res.send({"success": "User is logged in"})
                } else {
                    res.send({"error": "wrong password"});
                }    
            }
            else {
                res.send({"error": "wrong email"});
            }
        })
});

AuthRouter.get('/posts', authenticateSession, async (req: IRequestSession, res) => {
  res.send("here a the posts");
})

AuthRouter.post("/logout", authenticateSession, async (req : IRequestSession, res) => {
  const sessionId = req.session.sessionId;
  try {
    const session = await db.Sessions.findOne({where : {sessionId : sessionId}});
    if(!session) {
      res.send({"error": "No session found for the user"});
    }
    else {
      session.sessionId = null;
      await session.save();
      res.send({"success" : "Logout sucessful"});
    }
  } catch(err) {
    res.send({"error" : `coudlnt find the session : ${err}`});
  }
})

AuthRouter.post('/forgot-password', async (req : IForgotPassword, res) => {
  const newPassword = await hashPassword(req.body.newPassword);
  const user = await getUser(req.body.email)
  if(!user) {
    res.send({"error" : "Couldnt find the user"});
  }
  user.password = newPassword;
  await user.save();
  res.send({"success" : "User's password changed successfuly"});
})

AuthRouter.post('/reset-password', authenticateSession, async (req : IRequestSession, res) => {
  const newPassword = req.body.newPassword;
  const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUND));
  const hashedPw = bcrypt.hashSync(newPassword, salt);   
  const user = await getUser(req.body.password) 
  if (!user) {
    res.send({"error" : "Couldnt find the user"});
  }
  user.password = hashedPw;
  await user.save();
  res.send({"success" : "Password has been reseted sucessfully"});
});

export default AuthRouter 
