const registerUser = require("../../services/auth/register.service");

const register = async (req, res, next) => {
    try {
        const user = await registerUser(req.body);

        res.status(201).json({
            status: "success",
            message: "Registration successful",
            data: user
        });
    } catch (error) {
        next(error);
    }
};

module.exports = register;