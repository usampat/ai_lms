const Assignment = require("../models/assignmentModel");
const asyncHandler = require("express-async-handler");

const fs = require("fs");
const path = require("path");
const multer = require("multer");

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const assignmentId = req.params.id;
    const uploadDir = path.join(
      __dirname,
      `${process.env.UPLOAD_DIR}/assignment-${assignmentId}`
    );
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Create a new assignment
const createAssignment = asyncHandler(async (req, res) => {
  // parsing the body
  const {
    course,
    title,
    description,
    points,
    attachments,
    allowedSubmissions,
    grader,
  } = req.body;
  let author = req.body.author ? req.body.author : req.user;

  // saving the assignment in database
  const assignment = new Assignment({
    course,
    title,
    description,
    points,
    attachments,
    allowedSubmissions,
    grader,
    author: author,
  });
  await assignment.save();

  // Create a directory for the assignment submissions
  const assignmentDir = path.join(
    __dirname,
    `${process.env.UPLOAD_DIR}/assignment-${assignment._id}`
  );
  if (!fs.existsSync(assignmentDir)) {
    fs.mkdirSync(assignmentDir, { recursive: true });
  }

  res.send({
    status: "true",
    message: "New assignment created",
    body: assignment,
  });
});

// Get all assignments
const getAllAssignments = asyncHandler(async (req, res) => {
  let assignments = [];

  // if the logged in user is admin, then return all assignments
  if (req.user.role == "admin") assignments = await Assignment.find();
  // else if the user is instructor then return assignments in which user is author
  else assignments = await Assignment.find({ author: req.user._id });

  res.send({
    status: "true",
    message: "All assignments fetched successfully",
    body: assignments,
  });
});

// Get an assignment by ID
const getAssignmentById = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);
  if (!assignment || !req.user._id.equals(assignment.author._id)) {
    res.status(404).send({
      status: "false",
      message: "Assignment not found",
    });
    return;
  }
  res.send({
    status: "true",
    message: "Assignment found successfully",
    body: assignment,
  });
});

// Update an assignment by ID
const updateAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!assignment) {
    res.status(404).send({
      status: "false",
      message: "Assignment not found",
    });
    return;
  }
  res.send({
    status: "true",
    message: "Assignment updated successfully",
    body: assignment,
  });
});

// Delete an assignment by ID
const deleteAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findByIdAndDelete(req.params.id);
  if (!assignment) {
    res.status(404).send({
      status: "false",
      message: "Assignment not found",
    });
    return;
  }
  res.send({
    status: "true",
    message: "Assignment deleted successfully",
  });
});

// Add a new submission to an assignment
const addSubmission = asyncHandler(async (req, res) => {
  const assignmentId = req.params.id;
  const userId = req.user._id;
  const assignment = await Assignment.findById(assignmentId);

  if (!assignment) {
    res.status(404).send({
      status: "false",
      message: "Assignment not found",
    });
    return;
  }

  // Save file to the assignment's folder
  const file = req.file;
  if (!file) {
    res.status(400).send({
      status: "false",
      message: "No file submitted",
    });
    return;
  }

  const newSubmission = {
    user: userId,
    content: file.filename,
  };

  assignment.submissions.push(newSubmission);
  await assignment.save();

  res.send({
    status: "true",
    message: "Submission added successfully",
    body: newSubmission,
  });
});

module.exports = {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
  addSubmission,
  upload,
};
