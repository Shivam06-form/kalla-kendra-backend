const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
// currently no use
const crypto = require("crypto");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    require: [true, "Please provide your password"],
    minlength: 8,
    select: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
