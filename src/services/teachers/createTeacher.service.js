const teachers = require("../../database/teachers");
const users = require("../../database/users");
const ApiError = require("../../utils/apiError");

const createTeacher = (teacherData) => {
    const {
        userId,
        staffNumber,
        firstName,
        lastName,
        qualification,
        department
    } = teacherData;

    const user = users.find(
        user => user.id === userId
    );

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user.role !== "teacher") {
        throw new ApiError(
            400,
            "Only users with the teacher role can have a teacher profile"
        );
    }

    const existingProfile = teachers.find(
        teacher => teacher.userId === userId
    );

    if (existingProfile) {
        throw new ApiError(
            409,
            "Teacher profile already exists for this user"
        );
    }

    const existingStaffNumber = teachers.find(
        teacher => teacher.staffNumber === staffNumber
    );

    if (existingStaffNumber) {
        throw new ApiError(409, "Staff number already exists");
    }

    const teacher = {
        id: String(teachers.length + 1),
        userId,
        staffNumber,
        firstName,
        lastName,
        qualification: qualification || "",
        department: department || "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    teachers.push(teacher);

    return teacher;
};

module.exports = createTeacher;
