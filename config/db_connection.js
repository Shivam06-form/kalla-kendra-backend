//Import mongoose library
const mongoose = require("mongoose");

// connect with database
const connectDB = () => {
  mongoose
    .connect(process.env.DB_URI, { useNewUrlParser: true })
    .then((res) => {
      console.log("database connected");
    })
    .catch((err) => {
      console.log("database disconnected");
    });
};

//connect db
module.exports = {
  connectDB,
};