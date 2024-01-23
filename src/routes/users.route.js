const {
  registration,
  loginUser,
  userInfo,
  verifyJsonWebToken,
} = require("../controllers/user.controller");
const router = require("express").Router();
const {Attendance} = require('../models/attendance.model')

router.post("/registration", registration);
router.post("/login", loginUser);
router.get("/userInfo", verifyJsonWebToken, userInfo);
// student attendance info
router.get("/studentAttendance", Attendance)

module.exports = router;
