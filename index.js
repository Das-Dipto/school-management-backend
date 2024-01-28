// Import necessary modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./src/routes/users.route");
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
  .connect(
    "mongodb+srv://school_management:quQ2SuKJvpuSQNWv@simple-node-app.ybb3hyi.mongodb.net/school_management"
  ) // process.env.DB_URL
  .then(() => console.log(`Well Done, DB is successfully connected`))
  .catch((error) =>
    console.log(`Apology, Database connection error: ${error}`)
  );

// user route
app.use("/api/", userRoute);
app.use("/api/", assignmentRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
