import express , { Request }from "express";
import "dotenv/config";
import cors from "cors";
import AuthRouter from "./routers/AuthRouter";
import db from "./database";
import {authenticateSession} from "./bin/auth";

var cookieParser = require("cookie-parser")
var session = require("express-session")
var bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: true,
  })
)

app.get("/", (_, res) => {
    console.log('called');
    res.send("dockering ts");
});

db.sequelize.authenticate()
    .then(() => console.log("db connected..."))
    .catch((err) => console.log(err))
app.use("/auth", AuthRouter);

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
