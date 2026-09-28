const teachers = require("../../database/teachers");
const users = require("../../database/users");
const hashPassword = require("../../utils/hashPassword");
const ApiError = require("../../utils/apiError");
const ROLES = require("../../constants/roles");

const createTeacher = async (teacherData) => {
    const {
        firstName,
        lastName,
        email,
        password,
        staffNumber,
        qualification,
        department
    } = teacherData;

    const normalizedEmail = email.toLowerCase();

    const existingUser = users.find(
        user =>
            user.email &&
            user.email.toLowerCase() === normalizedEmail
    );

    if (existingUser) {
        throw new ApiError(409, "Email is already registered");
    }

    const existingStaffNumber = teachers.find(
        teacher => teacher.staffNumber === staffNumber
    );

    if (existingStaffNumber) {
        throw new ApiError(409, "Staff number already exists");
    }

    const hashedPassword = await hashPassword(password);

    const user = {
        id: String(users.length + 1),
        name: `${firstName} ${lastName}`,
        email: normalizedEmail,
        password: hashedPassword,
        role: ROLES.TEACHER,
        createdAt: new Date().toISOString()
    };

    users.push(user);

    const teacher = {
        id: String(teachers.length + 1),
        userId: user.id,
        staffNumber,
        firstName,
        lastName,
        qualification: qualification || "",
        department: department || "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    teachers.push(teacher);

    return {
        id: teacher.id,
        userId: teacher.userId,
        staffNumber: teacher.staffNumber,
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        qualification: teacher.qualification,
        department: teacher.department,
        createdAt: teacher.createdAt,
        updatedAt: teacher.updatedAt,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};

module.exports = createTeacher;