const deleteTeacher = require("../../services/teachers/deleteTeacher.service");

const deleteTeacherController = async (req, res, next) => {
    try {
        const data = deleteTeacher(req.params.id);

        res.status(200).json({
            status: "success",
            message: "Teacher deleted successfully",
            data
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deleteTeacherController;
