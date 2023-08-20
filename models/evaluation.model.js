const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema(
  {
    evaluationName: { type: String, required: true },
    questions: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "question",
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    cutOffMark: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Evaluation = mongoose.model("evaluation", evaluationSchema);

module.exports = Evaluation;
