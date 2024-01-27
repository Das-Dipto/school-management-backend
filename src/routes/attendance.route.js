const {
attendance
  } = require("../controllers/attendance.controller");
  const router = require("express").Router();
  
  router.post("/newAttendance", attendance);
  
  module.exports = router;
  