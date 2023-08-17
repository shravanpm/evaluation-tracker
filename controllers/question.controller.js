const express = require("express");
const Question = require("../models/question.model");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.post("/", async (req, res) => {
  console.log({ body: req.body });
  try {
    const question = await Question.create(req.body);
    return res.status(200).send({ question });
  } catch (err) {
    return res.status(400).send({ message: err.message, loggedIn: false });
  }
});

module.exports = router;
