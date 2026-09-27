const updateStudentService = require("../../services/students/updateStudent.service");

const updateStudent = (req, res, next) => {
    try {
        const student = updateStudentService(
            req.params.id,
            req.body
        );

        res.status(200).json({
            status: "success",
            message: "Student updated successfully",
            data: student
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updateStudent;