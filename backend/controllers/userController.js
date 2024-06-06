const generateToken = require("../config/jwt");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  // parsing request body
  const username = req.body.username;
  const password = req.body.password;
  const role = "student";

  // checking if user already exists
  const user = await User.findOne({ username: username });
  if (user) {
    res.send({
      status: "false",
      message: "User with that username already exists",
    });
    return;
  }

  // creating a new user
  const newUser = await User.create({
    username: username,
    password: password,
    role: role,
  });

  res.send({
    status: "true",
    message: "New user created",
    body: newUser,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  // parsing request body
  const username = req.body.username;
  const password = req.body.password;

  // checking if the user exists and password is correct
  const user = await User.findOne({ username: username });
  if (user && (await user.isPasswordMatched(password))) {
    res.send({
      status: "true",
      message: "User logged in successfully",
      body: { token: generateToken(user._id) },
    });
    return;
  } else {
    res.send({
      status: "false",
      message: "Username or Password is incorrect",
    });
  }
});

const getAllUser = asyncHandler(async (req, res) => {
  try {
    // finding all users
    const allUsers = await User.find();
    res.send({
      status: true,
      message: "All users fetched successfully",
      body: {
        ...allUsers,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const userID = req.user._id;

  try {
    const user = await User.findByIdAndUpdate(
      userID,
      {
        username: req.body.username,
      },
      { new: true }
    );
    res.send({
      status: "true",
      message: "Updated user successfully",
      body: {
        user,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const userID = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userID);
    res.send({
      status: "true",
      message: "User deleted successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getUser = asyncHandler(async (req, res) => {
  const userID = req.params.id;

  try {
    const user = await User.findById(userID);
    res.send({
      status: "true",
      message: "User found successfully",
      body: { user },
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  registerUser,
  loginUser,
  getAllUser,
  updateUser,
  deleteUser,
  getUser,
};
