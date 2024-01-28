const Assignment = require("../../models/assignment.model");

// Getting a single assignment through the assignment id
const getAssignment = async (req, res, next) => {
  try {
    const { assignmentId } = req?.body;
    if (assignmentId) {
      const isAssignment = await Assignment.findOne({ _id: assignmentId });
      if (isAssignment) {
        return res.status(200).json({ status: 200, assignment: isAssignment });
      } else {
        return res
          .status(404)
          .json({ status: 404, message: "Assignment not found!" });
      }
    }
    return next(new Error("getting undefined!"));
  } catch (error) {
    next(error);
  }
};

// Creating an assignment through the teacher and the subject and classes.
const createAssignment = async (req, res, next) => {
  const assignment = {
    title: "Build a react project.",
    startDate: "23-01-2024",
    dueDate: "29-01-2024",
    files: "",
    instruction: "Lorem ipsum dolor sit amet!",
    points: 100,
    topic: "react",
    isAccepting: true,
    edit: {
      isEdit: true,
      editTime: "12:01 AM",
    },
    handledIn: [],
    assigned: [],
    marked: {
      mark: 100,
      _id: "2323",
    },
  };

  try {
    // Creating an new Assignment instance for database storage
    const newAssignment = new Assignment(assignment);
    // Saving the assignment detail to the database and getting the response
    const createdAssignment = await newAssignment.save();
    if (createdAssignment?._id) {
      return res
        .status(200)
        .json({ status: 200, message: "Assignment created!" });
    } else {
      return res.status(400).json({
        status: 400,
        message: "Error occurd while creating an assignment!",
      });
    }
  } catch (error) {
    next(error);
  }
};

const editAssignment = async (req, res, next) => {
  const assignment = req?.body;
  const { _id } = assignment;
  try {
    if (_id) {
      const editedAssignment = await Assignment.updateOne({ _id }, assignment);
      if (editedAssignment?.acknowledged) {
        return res
          .status(200)
          .json({ status: 200, message: "Assignment edited!" });
      } else {
        return res.status(500).json({
          status: 500,
          message: "Error occured while editing the assignment!",
        });
      }
    }
    return next(new Error("getting undefined!"));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAssignment,
  createAssignment,
  editAssignment,
};
