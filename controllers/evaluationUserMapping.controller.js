const express = require("express");
const EvaluationUserMapping = require("../models/evaluationUserMapping.model");
const authenticate = require("../middleware/authenticate");
const mongoose = require("mongoose");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const evaluationUserMapping = await EvaluationUserMapping.create(req.body);
    return res.status(200).send({ evaluationUserMapping });
  } catch (err) {
    return res.status(400).send({ message: err.message, loggedIn: false });
  }
});

router.get("/user/:user", async (req, res) => {
  try {
    const user = req.params.user;
    const evaluationUserMapping = await EvaluationUserMapping.find({
      user,
    })
      .populate({
        path: "evaluation",
        select: ["evaluationName", "cutOffMark"],
      })
      //   .populate("evaluation")
      .lean()
      .exec();
    return res.status(200).send({ evaluationUserMapping });
  } catch (err) {
    return res.status(400).send({ message: err.message, loggedIn: false });
  }
});

router.get("/user/:user", async (req, res) => {
  try {
    const user = req.params.user;
    const evaluationUserMapping = await EvaluationUserMapping.find({
      user,
    })
      .populate({
        path: "evaluation",
        select: ["evaluationName", "cutOffMark"],
      })
      //   .populate("evaluation")
      .lean()
      .exec();
    return res.status(200).send({ evaluations: evaluationUserMapping });
  } catch (err) {
    return res.status(400).send({ message: err.message, loggedIn: false });
  }
});

router.get("/instructor/:instructorId", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const instructorId = req.params.instructorId;
  const skip = (page - 1) * limit;
  try {
    const evaluationUserMappingsWithInstructor =
      await EvaluationUserMapping.aggregate([
        {
          $lookup: {
            from: "evaluations",
            localField: "evaluation",
            foreignField: "_id",
            as: "evaluation",
          },
        },
        {
          $unwind: "$evaluation",
        },
        {
          $match: {
            "evaluation.instructor":
              mongoose.Types.ObjectId.createFromHexString(instructorId),
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
        {
          $project: {
            "evaluation.evaluationName": 1,
            "evaluation.cutOffMark": 1,
          },
        },
      ]);

    return res
      .status(200)
      .send({ evaluations: evaluationUserMappingsWithInstructor });
  } catch (err) {
    return res.status(400).send({ message: err.message, loggedIn: false });
  }
});

module.exports = router;
