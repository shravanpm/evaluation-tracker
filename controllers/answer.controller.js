const express = require("express");
const Answer = require("../models/answer.model");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const answer = await Answer.create(req.body).lean().exec();
    return res.status(200).send({ answer });
  } catch (err) {
    return res.status(400).send({ message: err.message, loggedIn: false });
  }
});

module.exports = router;
