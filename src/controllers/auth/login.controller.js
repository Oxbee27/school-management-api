const loginUser = require("../../services/auth/login.service");

const login = async (req, res, next) => {
    try {
        const result = await loginUser(req.body);

        res.status(200).json({
            status: "success",
            message: "Login successful",
            data: result
        });
    } catch (error) {
        next(error);
    }
};

module.exports = login;