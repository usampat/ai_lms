const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require("./config/db");
const { handleNotFound, handleError } = require("./middlewares/errorHandler");
const userRouter = require("./routes/userRoutes");
const courseRouter = require("./routes/courseRoutes");
const assignmentRouter = require("./routes/assignmentRouter");
const quizRouter = require("./routes/quizRouter");
const discussionRouter = require("./routes/discussionRouter");
const announcementRouter = require("./routes/announcementRouter");
const attendanceRouter = require("./routes/attendanceRouter");
const fileRouter = require("./routes/fileRouter");

// setting up environment variables
require("dotenv").config();
// connecting to database
connectDB();

// server
const app = express();

app.use(cors());
app.use(bodyParser.json());

// health check route
app.get("/health", (req, res) => {
  res.send({
    health: "good",
  });
});

// routes
app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/assignment", assignmentRouter);
app.use("/quiz", quizRouter);
app.use("/discussion", discussionRouter);
app.use("/announcement", announcementRouter);
app.use("/attendance", attendanceRouter);
app.use("/file", fileRouter);

// handling error routes
app.use(handleNotFound);
app.use(handleError);

// starting server on port based on environment variable
const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
