const results = require("../../database/results");
const ApiError = require("../../utils/apiError");

const deleteResult = resultId => {
    const index = results.findIndex(
        result => result.id === String(resultId)
    );

    if (index === -1) {
        throw new ApiError(404, "Result not found");
    }

    return results.splice(index, 1)[0];
};

module.exports = deleteResult;
