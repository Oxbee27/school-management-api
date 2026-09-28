const getSubjectById = require("../../services/subjects/getSubjectById.service");

const getSubjectByIdController = async (req, res, next) => {
    try {
        const data = getSubjectById(req.params.id);

        res.status(200).json({
            status: "success",
            data
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getSubjectByIdController;
