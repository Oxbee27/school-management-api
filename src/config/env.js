require("dotenv").config();

const PORT = Number(process.env.PORT) || 3000;

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

const ADMIN_NAME = process.env.ADMIN_NAME;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the .env file");
}

if (!ADMIN_NAME) {
    throw new Error("ADMIN_NAME is not defined in the .env file");
}

if (!ADMIN_EMAIL) {
    throw new Error("ADMIN_EMAIL is not defined in the .env file");
}

if (!ADMIN_PASSWORD) {
    throw new Error("ADMIN_PASSWORD is not defined in the .env file");
}

module.exports = {
    PORT,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ADMIN_NAME,
    ADMIN_EMAIL,
    ADMIN_PASSWORD,
    CORS_ORIGIN
};