import { Router , Request} from "express";
import db from "../database";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
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
                        res.send(response)
                        console.log(`user with email ${email} and name ${name} was successfully created`);
                    });
            }
        });
})

AuthRouter.post('/login', async (req, res) => {
    const email = req.body.email;

    await db.User.findOne({where : {email}})
        .then(response => {
            if(response !== null) {
                const isPasswordValid = bcrypt.compareSync(req.body.password, response.password);
                console.log("email found hihi", isPasswordValid); 
                if(isPasswordValid) {
                    const user = {username: response.username, password: response.password}
                    console.log("Loggin successfull"); 
                    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn : "10m"})
                    res.json(accessToken);
                } else {
                    res.send("Wrong password");
                    console.log("Wrong password");
                }    
            }
            else {
                res.send("couldn't find a user with the email provided");
                console.log("email not found")
            }
        })
});


export default AuthRouter 
