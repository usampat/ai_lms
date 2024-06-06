const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUser,
  updateUser,
  deleteUser,
  getUser,
} = require("../controllers/userController");
const { onlyAdmin, authMiddleware } = require("../middlewares/authMiddleware");

const userRouter = express.Router();

userRouter.get("/user/:id", authMiddleware, getUser);
userRouter.get("/all-users", authMiddleware, onlyAdmin, getAllUser);

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.put("/update", authMiddleware, updateUser);

userRouter.delete("/:id", authMiddleware, onlyAdmin, deleteUser);

module.exports = userRouter;
