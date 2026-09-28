const teachers = require("../../database/teachers");
const ApiError = require("../../utils/apiError");

const getTeacherById = (teacherId) => {
    const teacher = teachers.find(
        teacher => teacher.id === String(teacherId)
    );

    if (!teacher) {
        throw new ApiError(404, "Teacher not found");
    }

    return teacher;
};

module.exports = getTeacherById;
