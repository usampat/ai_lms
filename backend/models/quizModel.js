const mongoose = require("mongoose");

const OptionSchema = new mongoose.Schema({
  option: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
});

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [OptionSchema],
    required: true,
  },
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  duration: {
    type: Number,
    required: false,
  },
  questions: [QuestionSchema],
});

module.exports = mongoose.model("Quiz", quizSchema);
