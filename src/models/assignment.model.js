const mongoose = require("mongoose");

const Assignment = mongoose.Schema({
  title: String,
  startDate: String,
  dueDate: String,
  files: String,
  instruction: String,
  points: Number,
  topic: String,
  isAccepting: Boolean,
  edit: {
    isEdit: Boolean,
    editTime: String,
  },
  handledIn: [],
  assigned: [],
  marked: {
    mark: Number,
    _id: String,
  },
});

module.exports = mongoose.model("Assignment", Assignment);
