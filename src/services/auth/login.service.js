const users = require("../../data/users");
const comparePassword = require("../../utils/comparePassword");
const generateToken = require("../../utils/generateToken");
const ApiError = require("../../utils/apiError");

const loginUser = async ({ email, password }) => {

    const user = users.find(
        user => user.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    const passwordMatch = await comparePassword(
        password,
        user.password
    );

    if (!passwordMatch) {
        throw new ApiError(401, "Invalid email or password");
    }

    const token = generateToken({
        id: user.id,
        role: user.role
    });

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        token
    };
};

module.exports = loginUser;