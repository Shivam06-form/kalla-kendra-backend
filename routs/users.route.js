const express = require("express");
require("dotenv").config();
const {
  getUsers,
  saveResume,
  Signup,
} = require("../controllers/users.controller");
const router = express.Router();

// route started from here

router.get("/", getUsers);
router.post("/resume", saveResume);
router.post("/Signup", Signup);

// exports
module.exports = router;
