const express = require("express");

const router = express.Router();

const register = require("../controllers/auth/register.controller");
const login = require("../controllers/auth/login.controller");

const validate = require("../middleware/validate");
const authLimiter = require("../middleware/rateLimiter");

const {
    registerSchema,
    loginSchema
} = require("../validators/auth.validator");


router.post(
    "/register",
    validate(registerSchema),
    register
);

router.post(
    "/login",
    authLimiter,
    validate(loginSchema),
    login
);

module.exports = router;