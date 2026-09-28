const teachers = require("../../database/teachers");
const ApiError = require("../../utils/apiError");

const deleteTeacher = (teacherId) => {
    const index = teachers.findIndex(
        teacher => teacher.id === String(teacherId)
    );

    if (index === -1) {
        throw new ApiError(404, "Teacher not found");
    }

    return teachers.splice(index, 1)[0];
};

module.exports = deleteTeacher;
