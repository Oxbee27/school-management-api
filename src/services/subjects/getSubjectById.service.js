const subjects = require("../../database/subjects");
const ApiError = require("../../utils/apiError");

const getSubjectById = (subjectId) => {
    const subject = subjects.find(
        subject => subject.id === String(subjectId)
    );

    if (!subject) {
        throw new ApiError(404, "Subject not found");
    }

    return subject;
};

module.exports = getSubjectById;
