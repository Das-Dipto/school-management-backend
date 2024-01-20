const mongoose = require("mongoose");

const Attendance = mongoose.Schema({
  roll: Number,
  name: String,
  isAttend: Boolean,
  date: new Date(),
  class: String,
});

module.exports = mongoose.model("Attendance", Attendance);
