const path = require("path");
const Resume = require("../models/resume.model");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");


const getUsers = (req, res) => {
  res.send("server is running");
};

// post resume
const saveResume = async (req, res) => {
  const resume = await Resume.create({
    ...req.body,
  });

  res.json(resume);
};

const Signup = async (req, res, next) => {
  const { Name, email, password } = req.body;

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return next(
      res.status(500).json({ error: error.message })
    );
  }

  try {
    const newUser = new User({
      Name,
      email,
      password: hashedPassword,
    });
    return next(res.status(202).json(newUser));
  } catch (error) {
    return next(res.status(201).json({ error: error.message }));
  }

  // to compare password
  // bcrypt.compare(password, existingUser.password); 
};

module.exports = {
  saveResume,
  getUsers,
  Signup,
};
