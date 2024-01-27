const Attendance = require('../models/attendance.model')

const attendance = async (req, res) => {
    try {
      const attendanceData = req?.body;
      console.log(attendanceData)
      const data = {
        name: attendanceData.name,
        class: attendanceData.class,
        id: attendanceData.id,
        phone: attendanceData.phone,
        isAttend: attendanceData.isAttend
      }
      const newAttendance = new Attendance(data);
      
      await newAttendance.save();
  
      res.json({ message: "Data added" });
    } catch (error) {
      res.status(500).json({ error: "Error adding attendance data" });
    }
  };

module.exports = {
    attendance,
}