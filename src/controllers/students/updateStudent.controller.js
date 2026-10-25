const updateStudentService = require("../../services/students/updateStudent.service");

const updateStudent = async (req, res, next) => {
  try {
    const student = await updateStudentService(req.params.id, req.body);

    res.status(200).json({
      status: "success",
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateStudent;
