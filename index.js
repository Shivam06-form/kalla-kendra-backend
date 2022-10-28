const express = require("express");
const cors = require("cors");
const userRouter = require("./routs/users.route");
const { connectDB } = require("./config/db_connection");
const PORT = process.env.PORT || 5000;
const app = express();

connectDB();

// use middleware
app.use(cors());
app.use(express.json());
app.use(userRouter);

// not found node modules
// app.use((req, res, next) => {
//   res.status(404).json({
//     message: "resource not found",
//   });
// });

app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});
