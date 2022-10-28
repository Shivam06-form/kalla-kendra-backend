const uuid = require("uuid4");
const path = require("path");
const bcrypt = require("bcryptjs");
const { MongoClient, ServerApiVersion } = require("mongodb");
const User = require("../models/users.model");
const getUsers = (req, res) => {
  res.send("server is running");
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.svtk34j.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const saveUser = async (req, res) => {
  await client.connect();
  const userCollection = client.db("createResume").collection("user");

  const newUser = req.body;
  console.log("adding new user", newUser);
  const result = await userCollection.insertOne(newUser);
  res.send(result);
};

// exports.saveUser = (req, res) => {
//   const name = req.body.name;
//   console.log(name);
//   const age = Number(req.body.age);
//   const user = {
//     name,
//     age,
//   };
//   users.push(user);
//   res.status(201).json({
//     success: true,
//     users,
//   });
// };

const SignupUser = async (req, res, next) => {
  const { Name, email, password } = req.body;
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return console.log("Could not creat user,please try later");
  }
  try {
    const newUser = await User.create({
      Name,
      email,
      password: hashedPassword,
    });
    res.status(202).json(newUser);
  } catch (error) {
    return next(res.status(201).json({ Error: error.message }));
  }
};

module.exports = {
  saveUser,
  getUsers,
  SignupUser,
};
