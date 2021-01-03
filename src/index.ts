import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;
app.get("/", (_, res) => {
    res.send("dockering ts");
});

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
