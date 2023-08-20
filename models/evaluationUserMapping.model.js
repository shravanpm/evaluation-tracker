const mongoose = require("mongoose");

const evaluationUserMappingSchema = new mongoose.Schema(
  {
    evaluation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "evaluation",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    isPassed: { type: Boolean, required: false },
    isAttended: { type: Boolean, required: true },
    marksObtained: { type: Number, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const EvaluationUserMapping = mongoose.model(
  "evaluation-user-mapping",
  evaluationUserMappingSchema
);

module.exports = EvaluationUserMapping;
