const updateResult = require("../../services/results/updateResult.service");

const updateResultController = async (req, res, next) => {
    try {
        const data = updateResult(req.params.id, req.body);

        res.status(200).json({
            status: "success",
            message: "Result updated successfully",
            data
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updateResultController;
