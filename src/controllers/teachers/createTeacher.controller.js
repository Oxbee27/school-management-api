const createTeacher = require("../../services/teachers/createTeacher.service");

const createTeacherController = async (req, res, next) => {
    try {
        const data = createTeacher(req.body);

        res.status(201).json({
            status: "success",
            message: "Teacher created successfully",
            data
        });
    } catch (error) {
        next(error);
    }
};

module.exports = createTeacherController;
