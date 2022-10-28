const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { getUsers, saveUser, SignupUser } = require("../controllers/users.controller");
const router = express.Router();

router.get("/", getUsers);

router.post("/user", saveUser);

router.post("/login",SignupUser);

module.exports = router;
