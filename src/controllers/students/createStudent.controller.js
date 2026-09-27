const createStudentService = require("../../services/students/createStudent.service");

const createStudent = (req, res, next) => {
    try {
        const student = createStudentService(req.body);

        res.status(201).json({
            status: "success",
            message: "Student created successfully",
            data: student
        });
    } catch (error) {
        next(error);
    }
};

module.exports = createStudent;