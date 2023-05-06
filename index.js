const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { noticeRouter } = require("./route/notice.route");
const app = express();

app.use(express.json());
require("dotenv").config();

app.use(
  cors({
    origin: "*",
  })
);

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Home Page of Notice App");
});

app.use("/notice", noticeRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`connected to DB`);
  } catch (error) {
    console.log("error connecting to DB", error);
  }
});
