const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema({
  name: String,
  date: { type: Date, default: Date.now },
  class: String,
  phone: Number,
  id: Number,
  isAttend: Boolean,
});

module.exports = mongoose.model("Attendance", attendanceSchema);
