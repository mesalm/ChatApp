const mongoose = require("mongoose");

const dbConnect = async () => {
  await mongoose.connect(process.env.COACTION_STRANGE);
  console.log("Connect to MongoDB ");
};

module.exports = dbConnect;
