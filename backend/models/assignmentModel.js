// AssignmentModel.js
const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const assignmentSchema = new mongoose.Schema({
  course: {
    type: mongoose.Types.ObjectId,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
    required: true,
  },
  attachments: {
    type: [String],
    required: false,
  },
  author: {
    type: mongoose.Types.ObjectId,
    required: true,
  },

  submissions: {
    type: [submissionSchema],
    default: [],
  },
  allowedSubmissions: {
    type: [String],
    default: ["all"],
    required: true,
  },
  grader: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Assignment", assignmentSchema);
