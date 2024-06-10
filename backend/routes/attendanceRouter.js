const express = require("express");
const attendanceRouter = express.Router();
const {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendanceController");

attendanceRouter.post("/", createAttendance);
attendanceRouter.get("/", getAllAttendance);
attendanceRouter.get("/:id", getAttendanceById);
attendanceRouter.put("/:id", updateAttendance);
attendanceRouter.delete("/:id", deleteAttendance);

module.exports = attendanceRouter;
