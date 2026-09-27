const jwt = require("jsonwebtoken");

const {
    JWT_SECRET
} = require("../config/env");

const ApiError = require("../utils/apiError");

const authenticate = (req, res, next) => {

    const authorization = req.headers.authorization;

    if (!authorization) {
        return next(
            new ApiError(401, "Authentication required")
        );
    }

    const [scheme, token] = authorization.split(" ");

    if (scheme !== "Bearer" || !token) {
        return next(
            new ApiError(401, "Invalid authorization header")
        );
    }

    try {
        const decoded = jwt.verify(
            token,
            JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {
        return next(
            new ApiError(401, "Invalid or expired token")
        );
    }
};

module.exports = authenticate;