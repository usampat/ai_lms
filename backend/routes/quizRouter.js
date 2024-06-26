const express = require("express");
const quizRouter = express.Router();

const {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  submitQuiz,
} = require("../controllers/quizController");
const { authMiddleware, onlyAllow } = require("../middlewares/authMiddleware");

quizRouter.post(
  "/add",
  authMiddleware,
  onlyAllow(["instructor", "admin"]),
  createQuiz
);
quizRouter.get(
  "/all",
  authMiddleware,
  onlyAllow(["instructor", "admin"]),
  getAllQuizzes
);
quizRouter.get(
  "/:id",
  authMiddleware,
  onlyAllow(["instructor", "admin"]),
  getQuizById
);
quizRouter.put(
  "/:id",
  authMiddleware,
  onlyAllow(["instructor", "admin"]),
  updateQuiz
);
quizRouter.delete(
  "/:id",
  authMiddleware,
  onlyAllow(["instructor", "admin"]),
  deleteQuiz
);

quizRouter.post(
  "/:id/submit",
  authMiddleware,
  onlyAllow(["student"]),
  submitQuiz
);

module.exports = quizRouter;
