const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { getUsers, saveResume } = require("../controllers/users.controller");
const router = express.Router();

router.get("/", getUsers);

router.post("/resume", saveResume);

module.exports = router;
