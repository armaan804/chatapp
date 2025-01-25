const express = require("express");
// const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const db = require("./db");
const bodyparser = require("body-parser");
const authroutes = require("./routes/authroutes");
const messageroute = require("./routes/messageroute");
const userroute = require("./routes/userroute");
const { app, server } = require("./socketio");
const path = require("path");

const port = process.env.PORT || 3001;
// console.log(dotenv);
// const __dirname = path.resolve();
app.use(bodyparser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(cors());

app.use("/auth", authroutes);
app.use("/message", messageroute);
app.use("/user", userroute);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

server.listen(port, () => {
  console.log(`node server running on port no. ${port}`);
});
