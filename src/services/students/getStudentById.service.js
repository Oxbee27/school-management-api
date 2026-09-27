const students = require("../../data/students");
const ApiError = require("../../utils/apiError");

const getStudentById = (studentId) => {
    const student = students.find(
        student => student.id === studentId
    );

    if (!student) {
        throw new ApiError(404, "Student not found");
    }

    return student;
};

module.exports = getStudentById;