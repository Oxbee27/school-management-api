const results = require("../../database/results");
const ApiError = require("../../utils/apiError");

const getResultById = resultId => {
    const result = results.find(
        result => result.id === String(resultId)
    );

    if (!result) {
        throw new ApiError(404, "Result not found");
    }

    return result;
};

module.exports = getResultById;
