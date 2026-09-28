const results = require("../../database/results");
const ApiError = require("../../utils/apiError");

const calculateGrade = score => {
    if (score >= 70) return "A";
    if (score >= 60) return "B";
    if (score >= 50) return "C";
    if (score >= 45) return "D";
    if (score >= 40) return "E";
    return "F";
};

const updateResult = (resultId, data) => {
    const result = results.find(
        result => result.id === String(resultId)
    );

    if (!result) {
        throw new ApiError(404, "Result not found");
    }

    if (data.score !== undefined) {
        result.score = data.score;
        result.grade = calculateGrade(data.score);
    }

    if (data.term !== undefined) result.term = data.term;
    if (data.session !== undefined) result.session = data.session;

    result.updatedAt = new Date().toISOString();

    return result;
};

module.exports = updateResult;
