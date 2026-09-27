const deleteStudentService = require("../../services/students/deleteStudent.service");

const deleteStudent = (req, res, next) => {
    try {
        const student = deleteStudentService(req.params.id);

        res.status(200).json({
            status: "success",
            message: "Student deleted successfully",
            data: student
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deleteStudent;