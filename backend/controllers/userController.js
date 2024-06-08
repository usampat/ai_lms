const generateToken = require("../config/jwt");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const sendEmail = require("../config/email");

const registerUser = asyncHandler(async (req, res) => {
  // parsing request body
  const username = req.body.username;
  let password = req.body.password;
  const email = req.body.email;
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

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  // creating a new user
  const newUser = await User.create({
    username: username,
    password: password,
    email: email,
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

const updatePassword = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const password = req.body.password;
  try {
    const user = await User.findById(userId);
    if (password) {
      user.password = password;
      await user.save();
      res.send({
        status: "true",
        message: "Password updated successfully",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const forgotPassworkToken = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email: email });
  if (!user) throw new Error("User with the given email doesn't exist");
  try {
    const token = await user.generatePasswordResetToken();
    await user.save();
    const resetLink = `http://localhost:4000/reset-password/${token}`;

    const data = {
      subject: "AI LMS: Reset Password",
      to: email,
      text: `Hey ${user.username}, your reset link is ${resetLink}`,
      html: resetLink,
    };
    sendEmail(data);

    res.send({
      status: "true",
      message: "Reset password link sent successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  let password = req.body.password;
  const token = req.params.token;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    resetTokenExpires: { $gt: Date.now() },
  });

  if (!user) throw new Error("Token expired, please try again!");

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  user.password = password;
  user.passwordResetToken = undefined;
  user.resetTokenExpires = undefined;
  await user.save();

  res.send({
    status: "true",
    message: "Password reset successfully",
  });
});

module.exports = {
  registerUser,
  loginUser,
  getAllUser,
  updateUser,
  deleteUser,
  getUser,
  updatePassword,
  forgotPassworkToken,
  resetPassword,
};
