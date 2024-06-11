const User = require("../models/userModel");
const Course = require("../models/courseModel");
const asyncHandler = require("express-async-handler");

const createCourse = asyncHandler(async (req, res) => {
  const { title, description, code } = req.body;

  // check if instructor was passed in the request
  let instructor = req.body.instructor;
  if (!instructor) {
    instructor = req.user;
  }

  // add course to database
  const course = new Course({
    title,
    description,
    code,
    instructor: instructor,
  });
  await course.save();

  res.send({
    status: "true",
    message: "New course created",
    body: course,
  });
});

const getAllCourses = asyncHandler(async (req, res) => {
  let courses = [];

  // if the logged in user is admin, then return all courses
  if (req.user.role == "admin") courses = await Course.find();
  // else if the user is instructor then return courses in which user is instructor
  else courses = await Course.find({ instructor: req.user._id });

  res.send({
    status: "true",
    message: "All courses fetched successfully",
    body: courses,
  });
});

const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  // check if course was found
  // also checks if the instructor of the course is same as the logged in user
  if (
    !course ||
    (req.user.role == "instructor" &&
      !course.instructor._id.equals(req.user._id))
  ) {
    res.status(404).send({
      status: "false",
      message: "Course not found",
    });
    return;
  }

  res.send({
    status: "true",
    message: "Course found successfully",
    body: course,
  });
});

const updateCourseDetails = asyncHandler(async (req, res) => {
  // update the course with the given parameters
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  // if the course id is valid
  if (!course) {
    res.status(404).send({
      status: "false",
      message: "Course not found",
    });
    return;
  }

  res.send({
    status: "true",
    message: "Course updated successfully",
    body: course,
  });
});

const deleteCourse = asyncHandler(async (req, res) => {
  // deletes the course with provided ID
  const course = await Course.findByIdAndDelete(req.params.id);

  // checks if the course was found
  if (!course) {
    res.status(404).send({
      status: "false",
      message: "Course not found",
    });
    return;
  }

  res.send({
    status: "true",
    message: "Course deleted successfully",
  });
});

const addStudentToCourse = asyncHandler(async (req, res) => {
  const { studentId } = req.body;
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(404).send({
      status: "false",
      message: "Course not found",
    });
    return;
  }
  const student = await User.findById(studentId);
  if (!student) {
    res.status(404).send({
      status: "false",
      message: "Student not found",
    });
    return;
  }

  if (course.people.includes(studentId)) {
    res.status(400).send({
      status: "false",
      message: "Student is already enrolled in this course",
    });
    return;
  }

  course.people.push(studentId);
  await course.save();

  res.send({
    status: "true",
    message: "Student added to the course successfully",
    body: course,
  });
});

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourseDetails,
  deleteCourse,
  addStudentToCourse,
};
