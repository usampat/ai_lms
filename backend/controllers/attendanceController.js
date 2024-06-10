const Attendance = require("../models/attendanceModel");
const asyncHandler = require("express-async-handler");

const createAttendance = asyncHandler(async (req, res) => {
  const { student, date } = req.body;

  const attendance = new Attendance({
    student,
    date,
  });
  await attendance.save();

  res.send({
    status: "true",
    message: "New attendance record created",
    body: attendance,
  });
});

const getAllAttendance = asyncHandler(async (req, res) => {
  const attendance = await Attendance.find().populate("student", "username");

  res.send({
    status: "true",
    message: "All attendance records fetched successfully",
    body: attendance,
  });
});

const getAttendanceById = asyncHandler(async (req, res) => {
  const attendance = await Attendance.findById(req.params.id).populate(
    "student",
    "username"
  );
  if (!attendance) {
    res.status(404).send({
      status: "false",
      message: "Attendance record not found",
    });
    return;
  }

  res.send({
    status: "true",
    message: "Attendance record found successfully",
    body: attendance,
  });
});

const updateAttendance = asyncHandler(async (req, res) => {
  const attendance = await Attendance.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!attendance) {
    res.status(404).send({
      status: "false",
      message: "Attendance record not found",
    });
    return;
  }

  res.send({
    status: "true",
    message: "Attendance record updated successfully",
    body: attendance,
  });
});

const deleteAttendance = asyncHandler(async (req, res) => {
  const attendance = await Attendance.findByIdAndDelete(req.params.id);
  if (!attendance) {
    res.status(404).send({
      status: "false",
      message: "Attendance record not found",
    });
    return;
  }

  res.send({
    status: "true",
    message: "Attendance record deleted successfully",
  });
});

module.exports = {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
};
