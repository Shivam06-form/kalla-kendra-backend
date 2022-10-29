const express = require("express");
const cors = require("cors");
require("dotenv").config();

const {
  getUsers,
  saveResume,
  Signup,
  Login,
} = require("../controllers/users.controller");
const router = express.Router();

router.get("/", getUsers);

router.post("/resume", saveResume);

router.post("/Signup", Signup);

router.post("/Login", Login);

module.exports = router;
