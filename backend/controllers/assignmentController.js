const Assignment = require("../models/assignmentModel");
const asyncHandler = require("express-async-handler");

// Create a new assignment
const createAssignment = asyncHandler(async (req, res) => {
  // parsing the body
  const {
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
    title,
    description,
    points,
    attachments,
    allowedSubmissions,
    grader,
    author: author,
  });
  await assignment.save();

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

module.exports = {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
};
