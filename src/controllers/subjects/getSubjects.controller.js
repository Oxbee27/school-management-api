const getSubjects = require("../../services/subjects/getSubjects.service");

const getSubjectsController = async (req, res, next) => {
    try {
        const data = getSubjects();

        res.status(200).json({
            status: "success",
            data
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getSubjectsController;
