const getStudentByIdService = require("../../services/students/getStudentById.service");

const getStudentById = (req, res, next) => {
    try {
        const student = getStudentByIdService(req.params.id);

        res.status(200).json({
            status: "success",
            data: student
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getStudentById;