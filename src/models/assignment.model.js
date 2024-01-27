const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Assignment = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  instruction: {
    type: String,
    required: false,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    default: Date.now.toString(),
  },
  files: {
    type: String,
    required: false,
  },
  points: Schema.Types.Mixed,
  topic: {
    type: String,
    required: true,
  },
  isAccepting: {
    type: Boolean,
    default: true,
  },
  edit: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    editTime: {
      type: String,
      default: Date.now().toString(),
    },
  },
  handedIn: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        select: ["userName", "email", "photo", "_id"],
      },
    ],
    default: [],
  },
  assigned: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        select: ["name", "email", "photo", "_id"],
      },
    ],
    default: [],
  },
  marked: {
    type: [
      {
        students: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
          select: ["name", "email", "photo", "_id"],
        },
        mark: {
          type: Boolean,
          default: false,
        },
      },
    ],
    default: [],
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    select: ["name", "email", "photo", "_id"],
  },
  class: {
    type: Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
});

module.exports = mongoose.model("Assignment", Assignment);
