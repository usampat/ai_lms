const Quiz = require("../models/quizModel");
const asyncHandler = require("express-async-handler");

const createQuiz = asyncHandler(async (req, res) => {
  const { title, description, duration, questions } = req.body;
  let author = req.body.author ? req.body.author : req.user;

  // saving quiz to database
  const quiz = new Quiz({
    title,
    description,
    duration,
    questions,
    author: author,
  });
  await quiz.save();

  res.send({
    status: "true",
    message: "New quiz created",
    body: quiz,
  });
});

const getAllQuizzes = asyncHandler(async (req, res) => {
  let quizzes = [];

  // if the logged in user is admin, then return all quizzes
  if (req.user.role == "admin") quizzes = await Quiz.find();
  // else if the user is instructor then return quizzes in which user is author
  else quizzes = await Quiz.find({ author: req.user._id });

  res.send({
    status: "true",
    message: "All quizzes fetched successfully",
    body: quizzes,
  });
});

const getQuizById = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);

  // checks if quiz is found and the quiz is made by the same user
  if (
    !quiz ||
    (req.user.role == "instructor" && !quiz.instructor._id.equals(req.user._id))
  ) {
    res.status(404).send({
      status: "false",
      message: "Quiz not found",
    });
    return;
  }

  res.send({
    status: "true",
    message: "Quiz found successfully",
    body: quiz,
  });
});

const updateQuiz = asyncHandler(async (req, res) => {
  // find and update the quiz in database
  const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  // check if quiz was present
  if (!quiz) {
    res.status(404).send({
      status: "false",
      message: "Quiz not found",
    });
    return;
  }

  res.send({
    status: "true",
    message: "Quiz updated successfully",
    body: quiz,
  });
});

const deleteQuiz = asyncHandler(async (req, res) => {
  // find and delete the quiz in the database
  const quiz = await Quiz.findByIdAndDelete(req.params.id);

  // check if the quiz was present
  if (!quiz) {
    res.status(404).send({
      status: "false",
      message: "Quiz not found",
    });
    return;
  }
  res.send({
    status: "true",
    message: "Quiz deleted successfully",
  });
});

// New function to submit quiz and return grade
const submitQuiz = asyncHandler(async (req, res) => {
  const { answers } = req.body;
  const quiz = await Quiz.findById(req.params.id);

  if (!quiz) {
    res.status(404).send({
      status: "false",
      message: "Quiz not found",
    });
    return;
  }

  let totalQuestions = quiz.questions.length;
  let correctAnswers = 0;

  quiz.questions.forEach((question, index) => {
    const correctOption = question.options.find((option) => option.isCorrect);
    if (correctOption && correctOption.option === answers[index]) {
      correctAnswers++;
    }
  });

  let grade = (correctAnswers / totalQuestions) * 100;

  res.send({
    status: "true",
    message: "Quiz submitted successfully",
    body: {
      totalQuestions,
      correctAnswers,
      grade,
    },
  });
});

module.exports = {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  submitQuiz,
};
