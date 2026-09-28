const students = require("../../database/students");
const ApiError = require("../../utils/apiError");

const updateStudent = (studentId, updateData) => {
    const student = students.find(
        student => student.id === studentId
    );

    if (!student) {
        throw new ApiError(404, "Student not found");
    }

    Object.assign(student, updateData);

    student.updatedAt = new Date().toISOString();

    return student;
};

module.exports = updateStudent;