const getTeacherById = require("../../services/teachers/getTeacherById.service");

const getTeacherByIdController = async (req, res, next) => {
    try {
        const data = getTeacherById(req.params.id);

        res.status(200).json({
            status: "success",
            data
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getTeacherByIdController;
