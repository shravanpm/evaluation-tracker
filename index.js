const express = require("express");
const userController = require("./controllers/user.controller");
const questionController = require("./controllers/question.controller");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
// app.use(express.static("views"))

app.use("/api/user", userController);
app.use("/api/question", questionController);

module.exports = app;
