const mongoose = require("mongoose");
const user = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: [true, "email must be filled up"],
  },
  password: {
    type: String,
    required: [true, "password must be filled up"],
  },
});

module.exports = mongoose.model("User", user);
