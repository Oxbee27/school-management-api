
const getStudentsService = require("../../services/students/getStudents.service");

const getStudents = async (req, res, next) => {
    try {
        const students = await getStudentsService();

        res.status(200).json({
            status: "success",
            data: students
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getStudents;
