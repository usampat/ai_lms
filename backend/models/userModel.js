const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profile_picture: {
    type: String,
    deafult: "",
  },
  role: {
    type: String,
    required: true,
  },
  passwordResetToken: {
    type: String,
  },
  resetTokenExpires: {
    type: Number
  }
});

userSchema.methods.isPasswordMatched = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generatePasswordResetToken = async function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  this.resetTokenExpires = Date.now() + 30 * 60 * 1000;

  return token;
};

module.exports = mongoose.model("User", userSchema);
