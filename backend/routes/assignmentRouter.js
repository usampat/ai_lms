const express = require("express");
const { authMiddleware, onlyAllow } = require("../middlewares/authMiddleware");
const {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
} = require("../controllers/assignmentController");

const assignmentRouter = express.Router();

assignmentRouter.post(
  "/add",
  authMiddleware,
  onlyAllow(["instructor", "admin"]),
  createAssignment
);

assignmentRouter.get(
  "/all",
  authMiddleware,
  onlyAllow(["instructor", "admin"]),
  getAllAssignments
);

assignmentRouter.get(
  "/:id",
  authMiddleware,
  onlyAllow(["instructor", "admin"]),
  getAssignmentById
);

assignmentRouter.put(
  "/:id",
  authMiddleware,
  onlyAllow(["instructor", "admin"]),
  updateAssignment
);

assignmentRouter.delete(
  "/:id",
  authMiddleware,
  onlyAllow(["instructor", "admin"]),
  deleteAssignment
);

module.exports = assignmentRouter;
