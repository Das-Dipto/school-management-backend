const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Attendance = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now.toString(),
  },
  students: {
    type: [
      {
        isAttendance: {
          type: Boolean,
          require: false,
        },
        onLeave: {
          type: Boolean,
          require: true,
        },
        student: {
          type: Schema.Types.ObjectId,
          ref: "students",
          require: true,
          select: ["name, email, class, roll"],
        },
      },
    ],
  },
});

module.exports = mongoose.model("Attendance", Attendance);

// const attendances = [
//   {
//     date: "27/01/2024",
//     students: [
//       {
//         isAttendance: true,
//         student: {
//           name: "Rakib",
//           email: "rakib@gmail.com",
//           roll: 12,
//         },
//       },
//       {
//         isAttendance: false,
//         student: {
//           name: "Rakib",
//           email: "rakib@gmail.com",
//           roll: 11,
//         },
//       },
//       {
//         isAttendance: false,
//         student: {
//           name: "Rakib",
//           email: "rakib@gmail.com",
//           roll: 12,
//         },
//       },
//     ],
//   },
//   {
//     date: "28/01/2024",
//     students: [
//       {
//         isAttendance: true,
//         student: {
//           name: "Rakib",
//           email: "rakib@gmail.com",
//           roll: 12,
//         },
//       },
//       {
//         isAttendance: false,
//         student: {
//           name: "Rakib",
//           email: "rakib@gmail.com",
//           roll: 11,
//         },
//       },
//       {
//         isAttendance: false,
//         student: {
//           name: "Rakib",
//           email: "rakib@gmail.com",
//           roll: 12,
//         },
//       },
//     ],
//   },
// ];
