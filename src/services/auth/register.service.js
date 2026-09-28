const users = require("../../database/users");
const ROLES = require("../../constants/roles");
const hashPassword = require("../../utils/hashPassword");
const ApiError = require("../../utils/apiError");

const registerUser = async ({ name, email, password }) => {

    const normalizedEmail = email.toLowerCase();

    const existingUser = users.find(
        user => user.email && user.email.toLowerCase() === normalizedEmail
    );

    if (existingUser) {
        throw new ApiError(409, "Email is already registered");
    }

    const hashedPassword = await hashPassword(password);

    const user = {
        id: String(users.length + 1),
        name,
        email: normalizedEmail,
        password: hashedPassword,
        role: ROLES.STUDENT,
        createdAt: new Date().toISOString()
    };

    users.push(user);

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
    };
};

module.exports = registerUser;