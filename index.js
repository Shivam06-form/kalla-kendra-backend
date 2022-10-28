const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routs/users.route");
const PORT = process.env.PORT || 5000;
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();

// use middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(userRouter);

// delete node moduls
// app.use((req, res, next) => {
//   res.status(404).json({
//     message: "resource not found",
//   });
// });

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.svtk34j.mongodb.net/?retryWrites=true&w=majority`
);

app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});
