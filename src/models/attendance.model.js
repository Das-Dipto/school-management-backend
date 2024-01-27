const mongoose = require("mongoose");

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
          required: false,
        },
        onLeave: {
          type: Boolean,
          required: false,
        },
        // TODO
        // student: {
        // type: Schema.Types.ObjectId,
        // ref: "student",
        // select: ["name", "email", "class", "roll"],
        // required: true,
        // },
        student: {
          type: {
            name: {
              type: String,
              required: true,
            },
            class: {
              type: String,
              required: true,
            },
            roll: {
              type: String,
              required: true,
            },
          },
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
