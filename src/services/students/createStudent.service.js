const students = require("../../data/students");
const users = require("../../data/users");
const ApiError = require("../../utils/apiError");

const createStudent = (studentData) => {
    const {
        userId,
        admissionNumber,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        className
    } = studentData;

    const user = users.find(user => user.id === userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user.role !== "student") {
        throw new ApiError(
            400,
            "Only users with the student role can have a student profile"
        );
    }

    const existingStudent = students.find(
        student => student.userId === userId
    );

    if (existingStudent) {
        throw new ApiError(
            409,
            "Student profile already exists for this user"
        );
    }

    const existingAdmissionNumber = students.find(
        student => student.admissionNumber === admissionNumber
    );

    if (existingAdmissionNumber) {
        throw new ApiError(
            409,
            "Admission number already exists"
        );
    }

    const student = {
        id: String(students.length + 1),
        userId,
        admissionNumber,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        className,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    students.push(student);

    return student;
};

module.exports = createStudent;