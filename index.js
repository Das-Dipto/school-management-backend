// Import necessary modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./src/routes/users.route");
const newAttendance = require("./src/routes/attendance.route.js");
const attendanceSchema = require('./src/models/attendance.model.js');
const { attendance } = require("./src/controllers/attendance.controller.js");
const assignmentRoutes = require("./src/routes/assignments/assignments.routes");

// Initialize express app
const app = express();

// Enable CORS middleware
app.use(cors());
app.use(express.json());

// Port Initialization
const PORT = process.env.SERVER_PORT || 3000;

//Database initialization
mongoose
  .connect(process.env.DB_URL) // process.env.DB_URL
  .then(() => console.log(`Well Done, DB is successfully connected`))
  .catch((error) =>
    console.log(`Apology, Database connection error: ${error}`)
  );

// Define the Student model
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Student = mongoose.model("students", studentSchema);

// Test Route to get all students data from database
app.get("/api/getStudentsData", async (req, res) => {
  try {
    const students = await Student.find({});
    console.log(`GetstudentData: ${students}`);
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving students");
  }
});

// Example test route
app.get("/api/schoolData", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

// user route
app.use("/api/", userRoute);
app.use("/api/", assignmentRoutes);
app.use("/api/", newAttendance);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
