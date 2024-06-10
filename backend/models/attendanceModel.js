const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  student: {
    type: [mongoose.Types.ObjectId],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
