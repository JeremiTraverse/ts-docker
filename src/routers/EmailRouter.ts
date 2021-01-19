import { Router, Request } from 'express';
import dotenv from "dotenv";
import {IRequestSession} from "../types";
var nodemailer = require('nodemailer');
dotenv.config();

let EmailRouter = Router();

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
    secure: false
});

EmailRouter.post('/forgot-password', (req : IRequestSession, res) => {
 const destEmail = req.session.userEmail;
 const mailOptions = {
  from: process.env.MY_EMAIL,
  to: destEmail,
  subject: "Popina forgot password",
  text: "test"
 }
 transporter.sendMail(mailOptions, function(err, info) {
  if(err) {
    res.send(err)
  } else {
    res.send(info)
  }
 })
});

export default EmailRouter;
