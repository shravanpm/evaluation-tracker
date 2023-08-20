const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    answer: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    evaluationUserMapping: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "evaluation-user-mapping",
      required: true,
    },
    markAwarded: { type: Number, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Answer = mongoose.model("answer", answerSchema);

module.exports = Answer;
