const mongoose = require("mongoose");

let courseSchema = new mongoose.Schema({
  title: {
    type: String,
    reqiured: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: false,
  },
  instructor: {
    type: mongoose.Types.ObjectId,
    required: false,
  },
  announcements: {
    type: [mongoose.Types.ObjectId],
    default: [],
    required: false,
  },
  discussions: {
    type: [mongoose.Types.ObjectId],
    default: [],
    required: false,
  },
  assignments: {
    type: [mongoose.Types.ObjectId],
    default: [],
    required: false,
  },
  quizzes: {
    type: [mongoose.Types.ObjectId],
    default: [],
    required: false,
  },
  attendance: {
    type: [mongoose.Types.ObjectId],
    default: [],
    required: false,
  },
  people: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Course", courseSchema);
