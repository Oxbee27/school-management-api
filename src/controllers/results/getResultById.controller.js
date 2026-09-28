const getResultById = require("../../services/results/getResultById.service");

const getResultByIdController = async (req, res, next) => {
    try {
        const data = getResultById(req.params.id);

        res.status(200).json({
            status: "success",
            data
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getResultByIdController;
