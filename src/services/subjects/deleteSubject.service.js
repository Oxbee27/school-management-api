const subjects = require("../../database/subjects");
const ApiError = require("../../utils/apiError");

const deleteSubject = (subjectId) => {
    const index = subjects.findIndex(
        subject => subject.id === String(subjectId)
    );

    if (index === -1) {
        throw new ApiError(404, "Subject not found");
    }

    return subjects.splice(index, 1)[0];
};

module.exports = deleteSubject;
