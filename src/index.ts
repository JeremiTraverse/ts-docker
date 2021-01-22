import express , { Request }from "express";
import "dotenv/config";
import cors from "cors";
import AuthRouter from "./routers/AuthRouter";
import EmailRouter from "./routers/EmailRouter";
import db from "./database";

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
    secret: process.env.SESSION_TOKEN_SECRET, 
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (_, res) => {
    res.send("dockering ts");
});

let retries = 5;

try {
db.sequelize.authenticate()
    .then(() => console.log("db connected..."))
    .catch((err) => console.log(err))
} catch (err) {
  console.log(err);
  retries -= 1;
  console.log(`retries left : ${retries}`);
}

app.use("/auth", AuthRouter);
app.use("/email", EmailRouter);
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
