const path = require("path");
const Resume = require("../models/resume.model");

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

module.exports = {
  saveResume,
  getUsers,
};
