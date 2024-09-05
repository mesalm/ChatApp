const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: "string",
      require: true,
      trim: true
    },
    email: {
      type: "string",
      require: [true],
      unique: true,
      validate: [isEmail, "insert validate email"]
    },
    password: {
      type: "string",
      require: [true]
    },
    phone: {
      type: "string",
      require: [true]
    },
    profileImage: {
      data: Buffer,
      contentType: String
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
