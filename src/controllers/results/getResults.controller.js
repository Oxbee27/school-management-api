const getResults = require("../../services/results/getResults.service");

const getResultsController = async (req, res, next) => {
    try {
        const data = getResults();

        res.status(200).json({
            status: "success",
            data
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getResultsController;
