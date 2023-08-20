const express = require("express");
const userController = require("./controllers/user.controller");
const questionController = require("./controllers/question.controller");
const evaluationController = require("./controllers/evaluation.controller");
const evaluationUserMappingController = require("./controllers/evaluationUserMapping.controller");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
// app.use(express.static("views"))

app.use("/api/user", userController);
app.use("/api/question", questionController);
app.use("/api/evaluation", evaluationController);
app.use("/api/evaluation-user-mapping", evaluationUserMappingController);

module.exports = app;
