const {
  attendance, getAttendance, getAttendanceByName
} = require("../controllers/attendance.controller");
const router = require("express").Router();

router.post("/attendance", attendance);
router.get("/all-attendance", getAttendance);
router.get("/attendance-by-name", getAttendanceByName);

module.exports = router;
