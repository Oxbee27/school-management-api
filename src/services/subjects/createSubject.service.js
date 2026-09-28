const subjects = require("../../database/subjects");
const classes = require("../../database/classes");
const ApiError = require("../../utils/apiError");

const createSubject = ({ name, code, description, classId }) => {
    const classItem = classes.find(
        item => item.id === Number(classId)
    );

    if (!classItem) {
        throw new ApiError(404, "Class not found");
    }

    const existingSubject = subjects.find(
        subject =>
            subject.code.toLowerCase() === code.toLowerCase()
    );

    if (existingSubject) {
        throw new ApiError(409, "Subject code already exists");
    }

    const subject = {
        id: String(subjects.length + 1),
        name,
        code,
        description: description || "",
        classId: Number(classId),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    subjects.push(subject);

    return subject;
};

module.exports = createSubject;
