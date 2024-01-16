// Import necessary modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config();

// Initialize express app
const app = express();

// Enable CORS middleware
app.use(cors());


// Port Initialization
const PORT = process.env.SERVER_PORT  || 3000;

//Database initialization
mongoose.connect(`${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
.then(()=>console.log(`Well Done, DB is successfully connected`))
.catch((error)=>console.log(`Apology, Database connection error: ${error}`))


// Define the Student Data model
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Student = mongoose.model('students', studentSchema);

// Test Route to get all students data from database
app.get('/api/getStudentsData', async (req, res) => {
  try {
    const students = await Student.find({});
    // console.log(`GetstudentDataFromDB: ${students}`)
    console.log(`Getstudent: ${students}`)
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving students');
  }
});

// login(post), registation(post) , userData(get)


// Example test route
app.get('/api/schoolData', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});