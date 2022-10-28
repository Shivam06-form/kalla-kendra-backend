const express = require("express");
require("dotenv").config();

const {
  getUsers,
  saveResume,
  Signup,
} = require("../controllers/users.controller");
const router = express.Router();
router.get("/", getUsers);

router.post("/resume", saveResume);

router.post("/Signup", Signup);
module.exports = router;
