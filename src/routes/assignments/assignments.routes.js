const { verifyJsonWebToken } = require("../../controllers/user.controller");
const {
  createAssignment,
  getAssignment,
  editAssignment,
} = require("../../controllers/assignments/assignments.controller");
const router = require("express").Router();

router.get("/getAssignment", verifyJsonWebToken, getAssignment);
router.post("/createAssignment", verifyJsonWebToken, createAssignment);
router.put("/editAssignment", verifyJsonWebToken, editAssignment);

module.exports = router;
