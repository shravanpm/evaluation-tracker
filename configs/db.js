const mongoose = require("mongoose");

mongoose;

const connect = async () => {
  return mongoose.connect(
    "mongodb+srv://shravan:DkbL3ngegbUvBG2x@cluster0.qmixdbd.mongodb.net/evaluationValidator?retryWrites=true&w=majority"
  );
};

module.exports = connect;

const password = "DkbL3ngegbUvBG2x";
