const express = require("express");
const bodyParser = require("body-parser");

const connectDB = require("./config/db");
const { handleNotFound, handleError } = require("./middlewares/errorHandler");
const userRouter = require("./routes/userRoutes");

// setting up environment variables
require("dotenv").config();
// connecting to database
connectDB();

// server
const app = express();

app.use(bodyParser.json());

app.use("/user", userRouter);
app.use(handleNotFound);
app.use(handleError);

app.get("/health", (req, res) => {
  res.send({
    health: "good",
  });
});
// starting server on port based on environment variable
const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
