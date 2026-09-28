const teachers = require("../../database/teachers");
const ApiError = require("../../utils/apiError");

const updateTeacher = (teacherId, data) => {
    const teacher = teachers.find(
        teacher => teacher.id === String(teacherId)
    );

    if (!teacher) {
        throw new ApiError(404, "Teacher not found");
    }

    if (data.staffNumber) {
        const existingTeacher = teachers.find(
            item =>
                item.id !== teacher.id &&
                item.staffNumber === data.staffNumber
        );

        if (existingTeacher) {
            throw new ApiError(409, "Staff number already exists");
        }
    }

    Object.assign(teacher, data);

    teacher.updatedAt = new Date().toISOString();

    return teacher;
};

module.exports = updateTeacher;
