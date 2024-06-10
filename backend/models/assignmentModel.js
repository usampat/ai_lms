const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
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
    type: [String],
    default: [],
    requierd: [],
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
