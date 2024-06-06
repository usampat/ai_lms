const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        req.user = user;
        console.log(req.user);
        next();
      }
    } catch (error) {
      throw new Error("Not Authorized");
    }
  } else {
    throw new Error("Not valid request");
  }
});

const onlyAdmin = asyncHandler(async (req, res, next) => {
  const user = req.user;
  console.log(user);
  if (user.role !== "admin") throw new Error("User is not admin!");
  next();
});

const onlyInstructor = asyncHandler(async (req, res, next) => {
  const username = req.user.username;
  const user = await User.findOne({ username: username });
  if (user.role !== "instructor") throw new Error("User is not instructor!");
  next();
});

module.exports = { authMiddleware, onlyAdmin, onlyInstructor };
