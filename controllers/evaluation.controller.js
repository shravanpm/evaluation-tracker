const express = require("express");
const Evaluation = require("../models/evaluation.model");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const evaluation = await Evaluation.create(req.body);
    return res.status(200).send({ evaluation });
  } catch (err) {
    return res.status(400).send({ message: err.message, loggedIn: false });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log({ id });

    const evaluation = await Evaluation.findById(id)
      .populate("questions")
      .populate("instructor")
      .exec();
    return res.status(200).send({ evaluation });
  } catch (error) {
    return res.status(400).send({ message: err.message, loggedIn: false });
  }
});

module.exports = router;
