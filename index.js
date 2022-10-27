const express = require("express");
const cors = require("cors");
const userRouter = require("./routs/users.route");
const PORT = process.env.PORT || 5000;
const app = express();

// use middleware
app.use(cors());
app.use(express.json());
app.use(userRouter);

// delete node moduls
// app.use((req, res, next) => {
//   res.status(404).json({
//     message: "resource not found",
//   });
// });

app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});
