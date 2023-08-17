const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: { type: String },
    type: { type: String, required: true, enum: ["mcq", "descriptive"] },
    options: {
      type: [String],
      required: function () {
        return this.type === "mcq";
      },
      validate: {
        validator: function (value) {
          return this.type !== "mcq" || this.options.length > 0;
        },
        message: 'Options array must not be empty when type is "mcq"',
      },
    },
    maximumMark: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Question = mongoose.model("question", questionSchema);

module.exports = Question;
