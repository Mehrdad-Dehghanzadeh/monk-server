/** @format */

const express = require("express");
const process = require("process");
const cors = require("cors");
const ticket = require("./routes/ticket");
const answer = require("./routes/answer");
const auth = require("./routes/auth");

const port = 666;
const mode = process.env.MODE;
const app = new express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/tickets", ticket);
app.use("/answers", answer);
app.use("/auth", auth);

app.listen(port, () => {
  console.log(`server is runing at port:${port} for ${mode} mode`);
});
