const mongoose = require("mongoose");
// currently no use
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const user = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, "Please tell us your name!"],
    unique: true,
    minlength: 8,
    // validate: [validator, "Please provide a valid name"],
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
    select: true,
  },
});

// user.pre("save", async function (next) {
//   // Hash the password with cost of
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// user.method.correctPassword = async function (candidatePassword, userPassword) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

const User = mongoose.model("users", user);

module.exports = User;
