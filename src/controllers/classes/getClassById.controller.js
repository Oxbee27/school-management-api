const getClassById = require("../../services/classes/getClassById.service");

const getClassByIdController = async (req, res, next) => {
    try {
        const data = getClassById(req.params.id);

        res.status(200).json({
            status: "success",
            data
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getClassByIdController;
