const { User, Student, Teacher } = require("../models/users.model");
const jwt = require("jsonwebtoken");

// sigining json web token
const signJsonWebToken = (user, tokenValidationTime) => {
  const siginInToken = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: tokenValidationTime ? tokenValidationTime : "1h",
  });

  return siginInToken;
};

// verifying json web token
const verifyJsonWebToken = (req, res, next) => {
  try {
    const userToken = req?.headers?.authorization?.split(" ")[1];
    if (userToken) {
      jwt.verify(userToken, process.env.JWT_SECRET, function (err, decode) {
        if (err) {
          return res.status(401).send({ message: "UnAuthorized access" });
        }
        req.decoded = decode;
        next();
      });
    } else {
      return res
        .status(401)
        .send({ message: "Something went wrong, please login again!" });
    }
  } catch (error) {
    next(error);
  }
};

const registration = async (req, res, next) => {
  try {
    // Extracting user input from request body
    const { firstName, lastName, email, password, role, dateOfBirth } =
      req?.body;

    // Collecting user info to the user variable
    let commonUserInfo = {
      firstName,
      lastName,
      email,
      password,
      role,
      dateOfBirth,
    };
    if (role === "student") {
      const { presentClass, studentId } = req?.body;
      const user = {
        presentClass,
        studentId,
        ...commonUserInfo,
      };

      // Checking if the user already exists in the database
      const existingUser = await Student.findOne({
        email,
        role,
      });
      if (existingUser) {
        // Responding with an error if the user already exists
        return res.status(301).json({
          status: 301,
          message: `This ${role} account already exists!`,
        });
      }
      // Creating a new User instance for database storage
      const newStudent = await new Student(user).save();
      // Removing the password field from the user object before sending the response
      const { password: _, __v, __t, ...userInfo } = newStudent._doc;
      const token = signJsonWebToken(user, "30d");
      if (newStudent?._id) {
        // Responding with the user information if registration is successful
        return res.status(201).json({
          token: token,
          user: userInfo,
          message: `${role} account created successfully!`,
        });
      }
    } else if (role === "teacher") {
      const { teacherId, gradeLevel, qualifications, yearsOfExperience } =
        req?.body;
      const user = {
        teacherId,
        gradeLevel,
        qualifications,
        yearsOfExperience,
      };

      // Checking if the user already exists in the database
      const existingUser = await Teacher.findOne({
        email,
        role,
      });
      if (existingUser) {
        // Responding with an error if the user already exists
        return res.status(301).json({
          status: 301,
          message: `This ${role} account already exists!`,
        });
      }
      // Creating a new User instance for database storage
      const newTeacher = await new Student(user).save();
      // Removing the password field from the user object before sending the response
      const { password: _, __v, __t, ...userInfo } = newTeacher._doc;
      const token = signJsonWebToken(user, "30d");
      if (newTeacher?._id) {
        // Responding with the user information if registration is successful
        return res.status(201).json({
          token: token,
          user: userInfo,
          message: `${role} account created successfully!`,
        });
      }
    } else if (role === "parents") {
      const { childrens, address } = req?.body;
      const user = {
        childrens,
        address,
        ...commonUserInfo,
      };
    } else if (role === "admin") {
      const { address } = req?.body;
      const user = {
        address,
        ...commonUserInfo,
      };
    } else {
      // Responding with an error message if user creation fails
      res.status(500).json({ message: "Failed to create user!" });
    }
  } catch (error) {
    next(error);
  }
};

// Login  User
const loginUser = async (req, res, next) => {
  try {
    const { email, password: userPassword, isRemember } = req.body;
    // Define your search criteria
    const query = { email: email };
    // Checkng if the user already exist
    const isUser = await User.findOne(query);

    if (isUser) {
      // Desctructuring the user information
      const { _id, userName, password, role } = isUser;
      // user information from Database
      const user = {
        _id,
        userName,
        email,
        role,
      };

      const token = signJsonWebToken(
        {
          _id,
          userName,
          email,
        },
        isRemember && "30d"
      );

      // sending the response to the fronted
      if (isUser?._id) {
        if (password !== userPassword) {
          res
            .status(403)
            .json({ status: 403, message: "Password dosen't match!" });
          return;
        } else {
          res.status(201).json({
            token: token,
            user,
            message: "User logged in successfully",
          });
        }
      }
    } else {
      res.status(404).json({ status: 404, message: "User not found!" });
    }
  } catch (error) {
    next(error);
  }
};

// Checking The user is valid or not
const userInfo = async (req, res, next) => {
  try {
    // user email
    const { email } = req.decoded;
    // Define your search criteria
    const query = { email: email };
    // Checkng if the user already exist
    const isUser = await User.findOne(query);
    if (isUser?._id) {
      const { _id, userName, email, role } = isUser;
      return res.status(200).send({
        user: {
          _id,
          userName,
          email,
          role,
        },
        message: "valid user",
      });
    } else {
      return res.status(401).send({ message: "user isn't valid!" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser,
  registration,
  userInfo,
  signJsonWebToken,
  verifyJsonWebToken,
};
