const subjects = require("../../database/subjects");
const classes = require("../../database/classes");
const ApiError = require("../../utils/apiError");

const updateSubject = (subjectId, data) => {
    const subject = subjects.find(
        subject => subject.id === String(subjectId)
    );

    if (!subject) {
        throw new ApiError(404, "Subject not found");
    }

    if (data.code) {
        const existingSubject = subjects.find(
            item =>
                item.id !== subject.id &&
                item.code.toLowerCase() === data.code.toLowerCase()
        );

        if (existingSubject) {
            throw new ApiError(409, "Subject code already exists");
        }
    }

    if (data.classId !== undefined) {
        const classItem = classes.find(
            item => item.id === Number(data.classId)
        );

        if (!classItem) {
            throw new ApiError(404, "Class not found");
        }

        subject.classId = Number(data.classId);
    }

    if (data.name !== undefined) subject.name = data.name;
    if (data.code !== undefined) subject.code = data.code;
    if (data.description !== undefined) {
        subject.description = data.description;
    }

    subject.updatedAt = new Date().toISOString();

    return subject;
};

module.exports = updateSubject;
