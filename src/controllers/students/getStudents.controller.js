const getStudentsService = require("../../services/students/getStudents.service");

const getStudents = (req, res, next) => {
    try {
        const students = getStudentsService();

        res.status(200).json({
            status: "success",
            data: students
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getStudents;