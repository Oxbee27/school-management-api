const getTeachers = require("../../services/teachers/getTeachers.service");

const getTeachersController = async (req, res, next) => {
    try {
        const data = getTeachers();

        res.status(200).json({
            status: "success",
            data
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getTeachersController;
