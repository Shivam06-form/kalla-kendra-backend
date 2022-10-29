const path = require("path");
const Resume = require("../models/resume.model");
const User = require("../models/user.model");
const { error } = require("console");
const bcrypt = require("bcryptjs");
const { ErrorHandler } = require("../middleware/ErrorHander");
const { isValidObjectId } = require("mongoose");

const getUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find({}, "-password");
  } catch (error) {
    return next(
      ErrorHandler("Fetching users failed,please try again later.", 500)
    );
  }
  res.json({
    users: users.map((user) => user.toObject({ getters: true })),
    message: "API wroking fine",
  });
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

  // let hashedPassword;
  // try {
  //   hashedPassword = await bcrypt.hash(password, 12);
  // } catch (error) {
  //   return next(ErrorHandler(error.message, "error", 500));
  // }

  let existingUser;
  try {
    existingUser = await User.findOne({ Name: Name });
  } catch (error) {
    return next(
      ErrorHandler("Siging up failed please try again later", "error", 400)
    );
  }

  if (existingUser) {
    return next(
      ErrorHandler(
        "User exists already , please try another name",
        "error",
        404
      )
    );
  }
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(
      ErrorHandler("Siging up failed please try again later", "error", 400)
    );
  }

  if (existingUser) {
    return next(
      ErrorHandler(
        "Email id exists already , please login insted",
        "error",
        404
      )
    );
  }

  const newUser = new User({
    Name,
    email,
    password,
  });

  try {
    await newUser.save();
  } catch (err) {
    return next(ErrorHandler(err, "error", 404));
  }

  res.status(202).json(newUser);
  // to compare password
  // bcrypt.compare(password, existingUser.password);
};

const Login = async (req, res, next) => {
  const { email, password } = req.body;

  let user;
  try {
    user = await User.findOne({ email: email });
  } catch (error) {
    console.log(error.message);
  }

  if (!user) {
    return next(
      ErrorHandler("Invalid credentails , could not log you in.", "error", 403)
    );
  }
  let isValidPassword;

  try {
    isValidPassword = await bcrypt.compare(password, user.password);
  } catch (error) {
    return next(
      ErrorHandler("Invalid credentails , could not log you in", "error", 403)
    );
  }

  if (!isValidPassword) {
    return next(ErrorHandler("Invalid Password Or Email ", "error", 403));
  }

  // console.log(user, isValidPassword);
  res.status(200).json({ user });
};

module.exports = {
  saveResume,
  getUsers,
  Signup,
  Login,
};
