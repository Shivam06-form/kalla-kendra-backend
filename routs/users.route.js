const express = require("express");
const cors = require("cors");
require("dotenv").config();

const {
  getUsers,
  saveResume,
  getResume,
  Signup,
  Login,
  ForgetPassword,
  uploadPic,
} = require("../controllers/users.controller");
const router = express.Router();

router.get("/", getUsers);

router.post("/resume", saveResume);
router.get("/:id", getResume);
router.post("/:id/profile", uploadPic);
router.post("/Signup", Signup);

router.post("/Login", Login);

router.patch("/ForgetPassword", ForgetPassword);

module.exports = router;
