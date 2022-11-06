const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const userRouter = require("./routs/users.route");
const { connectDB } = require("./config/db_connection");
const { ErrorHandler } = require("./middleware/ErrorHander");
const PORT = process.env.PORT || 5000;
const app = express();

// use middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);
app.use("/uploads", express.static("uploads"));
// delete node moduls
// app.use((req, res, next) => {
//   res.status(404).json({
//     message: "resource not found",
//   });
// });

// For Handling All Errors
app.use("*", (req, res, next) => {
  return next(ErrorHandler(`Cannot GET ${req.originalUrl}`, "fail", 500));
});

// For Handling Error's
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

connectDB();

app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});
