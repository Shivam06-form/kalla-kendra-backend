const path = require("path");
const Resume = require("../models/resume.model");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { ErrorHandler } = require("../middleware/ErrorHander");
const jwt = require("jsonwebtoken");

// get users
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
    message: "API working fine",
  });
};

// get resume
const getResume = async (req, res, next) => {
  console.log(req.params);

  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.status(200).json({ data: resume });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// post resume
const saveResume = async (req, res) => {
  try {
    const resume = await Resume.create(req.body);
    res.status(200).json({ data: resume });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }

  res.json(resume);
};

// file system for image
const uploadPic = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(402).json({ message: "Resource not found" });
    }
    const uploadImage = req.files.uploadImage;
    // validate Image
    const fileSize = uploadImage.size / 1000;
    const fileExt = uploadImage.name.split(".")[1];
    if (fileSize > 5000) {
      return res
        .status(400)
        .json({ message: "file size must be lower than 5000kb" });
    }

    if (!["jpg", "png"].includes(fileExt)) {
      return res
        .status(400)
        .json({ message: "file extensions must be jpg or png" });
    }
    const fileName = `${req.params.id}${path.extname(uploadImage.name)}`;
    uploadImage.mv(`uploads/${fileName}`, async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      // update resume image field
      await Resume.findByIdAndUpdate(req.params.id, { uploadImage: fileName });
      res.status(200).json({
        data: {
          file: `${req.protocol}://${req.get("host")}/uploads/${fileName}`,
        },
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server Error" });
  }
};

// signup

const Signup = async (req, res, next) => {
  const { Name, email, password } = req.body;

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

  let hashPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    Name,
    email,
    password: hashPassword,
  });

  try {
    await newUser.save();
  } catch (err) {
    return next(ErrorHandler(err, "error", 404));
  }

  let token;
  try {
    token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      "supersecreat_dnot_share",
      {
        expiresIn: "1h",
      }
    );
  } catch (err) {
    return next(
      ErrorHandler("Signing up failed , please try again", "error", 500)
    );
  }

  res.status(202).json({ newUser, token: token });
  // to compare password
  // bcrypt.compare(password, existingUser.password);
};

// login

const Login = async (req, res, next) => {
  const { email, password } = req.body;

  let user;
  try {
    user = await User.findOne({ email: email });
  } catch (error) {
    return next(ErrorHandler(error.message, "error", 403));
  }

  if (!user) {
    return next(
      ErrorHandler("Invalid credentails , could not log you in.", "error", 403)
    );
  }

  let isValidPassword = false;

  try {
    isValidPassword = await bcrypt.compare(password, user.password);
  } catch (error) {
    return next(
      ErrorHandler("Invalid credentails , could not log you in", "error", 500)
    );
  }
  // console.log(isValidPassword);

  if (!isValidPassword) {
    return next(ErrorHandler("Invalid Password Or Email ", "error", 403));
  }

  // console.log(user, isValidPassword);
  res.status(200).json({ user });
};

// forgot password
const ForgetPassword = async (req, res, next) => {
  const { email, password, Confirmpassword } = req.body;
  let user;
  try {
    user = await User.findOne({ email: email });
  } catch (error) {
    return next(ErrorHandler(error.message, "error", 403));
  }

  if (!user) {
    return next(ErrorHandler("Cannot Find The E-Mail Id", "error", 403));
  }

  if (Confirmpassword !== password) {
    return next(ErrorHandler("Confirmpassword is not same", "error", 403));
  }

  let UpdatedUser;
  try {
    let hashPassword = await bcrypt.hash(password, 12);

    const filter = { email: email };
    const update = { password: hashPassword };
    UpdatedUser = await User.findOneAndUpdate(filter, update);
    UpdatedUser.save();
  } catch (error) {
    return next(ErrorHandler(error.message, "error", 403));
  }

  res.status(200).json({ UpdatedUser, message: "User Updated Successful" });
};

module.exports = {
  saveResume,
  getResume,
  getUsers,
  Signup,
  Login,
  ForgetPassword,
  uploadPic,
};
