const createResult = require("../../services/results/createResult.service");

const createResultController = async (req, res, next) => {
    try {
        const data = createResult(req.body);

        res.status(201).json({
            status: "success",
            message: "Result created successfully",
            data
        });
    } catch (error) {
        next(error);
    }
};

module.exports = createResultController;
