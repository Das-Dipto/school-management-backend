const Attendance = require('../models/attendance.model')
// Create Attendance
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
// Get Attendance
const getAttendance = async(req, res)=>{
  const result = await Attendance.find({});
  res.status(200).json({result});
}
// Get Attendance By Name
const getAttendanceByName = async (req, res) => {
  const { name } = req.query;

  try {
    const result = await Attendance.find({
      'students.student.name': name
    });
    const studentAttendance = result.map(record => {
      return {
        date: record.date,
        students: record.students.filter(student => student.student.name == name)
      };
    });
    res.status(200).json(studentAttendance);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports = {
    attendance,
    getAttendance,
    getAttendanceByName,
}