// Import necessary modules
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Initialize express app
const app = express();

// Enable CORS middleware
app.use(cors());


// Port Initialization
const PORT = process.env.PORT  || 3000;


// Example test route
app.get('/api/schoolData', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});