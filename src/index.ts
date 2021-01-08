import express from "express";
import "dotenv/config";
import cors from "cors";
import AuthRouter from "./routers/AuthRouter";
import db from "./database";
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

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
