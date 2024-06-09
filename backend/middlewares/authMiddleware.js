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
        next();
      }
    } catch (error) {
      throw new Error("User authentication token invalid!");
    }
  } else {
    throw new Error("User authentication token is not passed properly!");
  }
});

const onlyAdmin = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (!user) throw new Error("User is not set!");
  if (user.role !== "admin") throw new Error("User is not admin!");
  next();
});

const onlyInstructor = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (!user) throw new Error("User is not set!");
  if (user.role !== "instructor") throw new Error("User is not instructor!");
  next();
});

const onlyAllow = (listOfRoles) => {
  return asyncHandler(async (req, res, next) => {
    const user = req.user;
    if (!user) throw new Error("User is not set!");
    if (!listOfRoles.includes(user.role))
      throw new Error("User is not authorised for this operation!");
    next();
  });
};

module.exports = { authMiddleware, onlyAdmin, onlyInstructor, onlyAllow };
