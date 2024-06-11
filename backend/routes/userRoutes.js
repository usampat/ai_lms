const express = require("express");
const {
  registerUser,
  loginUser,
  getLoggedInUser,
  getAllUser,
  updateUser,
  deleteUser,
  getUser,
  updatePassword,
  forgotPassworkToken,
  resetPassword,
} = require("../controllers/userController");
const { onlyAdmin, authMiddleware } = require("../middlewares/authMiddleware");

const userRouter = express.Router();

userRouter.get("/", authMiddleware, getLoggedInUser);
userRouter.get("/all-users", authMiddleware, onlyAdmin, getAllUser);
userRouter.get("/:id", authMiddleware, getUser);

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/forgot-password", forgotPassworkToken);

userRouter.put("/update", authMiddleware, updateUser);
userRouter.put("/update-password", authMiddleware, updatePassword);
userRouter.put("/reset-password/:token", resetPassword);

userRouter.delete("/:id", authMiddleware, onlyAdmin, deleteUser);

module.exports = userRouter;
