const updateTeacher = require("../../services/teachers/updateTeacher.service");

const updateTeacherController = async (req, res, next) => {
    try {
        const data = updateTeacher(req.params.id, req.body);

        res.status(200).json({
            status: "success",
            message: "Teacher updated successfully",
            data
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updateTeacherController;
