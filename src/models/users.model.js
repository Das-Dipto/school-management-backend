const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now().toString(),
    required: false,
  },
  role: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  zipCode: {
    type: Number,
    required: false,
  },
  avatar: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
});

const StudentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  presentClass: {
    type: String,
    required: true,
  },
});

const TeacherSchema = new mongoose.Schema({
  teacherId: {
    type: String,
    required: true,
  },
  gradeLevel: {
    type: String,
    required: true,
  },
  qualifications: {
    type: String,
    required: true,
  },
  yearsOfExperience: { type: String, required: true },
});

const ParentsSchema = new mongoose.Schema({
  parentId: {
    type: String,
    required: true,
  },
  childrens: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
        required: true,
      },
    ],
    default: [],
  },
});

const User = mongoose.model("User", UserSchema);
const Student = User.discriminator("student", StudentSchema);
const Teacher = User.discriminator("teacher", TeacherSchema);
const Parent = User.discriminator("parent", ParentsSchema);

module.exports = {
  User,
  Student,
  Teacher,
  Parent,
};
