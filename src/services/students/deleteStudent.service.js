const students = require("../../database/students");
const ApiError = require("../../utils/apiError");

const deleteStudent = (studentId) => {
    const studentIndex = students.findIndex(
        student => student.id === studentId
    );

    if (studentIndex === -1) {
        throw new ApiError(404, "Student not found");
    }

    const deletedStudent = students.splice(studentIndex, 1);

    return deletedStudent[0];
};

module.exports = deleteStudent;