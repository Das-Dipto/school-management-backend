const User = require("../models/users.model");

const registration = async (req, res, next) => {
  try {
    // Extracting user input from request body
    const { userName, email, password } = req?.body;
    // Setting default role for a new user
    const role = "student";
    // Creating user object to be sent to the frontend
    const user = {
      userName,
      password,
      email,
      role,
    };
    // Checking if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Responding with an error if the user already exists
      return res
        .status(301)
        .json({ status: 301, message: "This email already exists" });
    }
    // Creating a new User instance for database storage
    const newUser = new User(user);
    // Saving the user information to the database and getting the response
    const registeredUser = await newUser.save();
    if (registeredUser?._id) {
      // Responding with the user information if registration is successful
      res.status(201).json({
        user: {
          userName: registeredUser.userName,
          email: registeredUser.email,
          role: registeredUser.role,
          _id: registeredUser._id,
        },
        message: "User created successfully",
      });
    } else {
      // Responding with an error message if user creation fails
      res.status(500).json({ message: "Failed to create user" });
    }
  } catch (error) {
    // Handling any errors that occur during the registration process
    next(error);
  }
};

module.exports = {
  registration,
};
