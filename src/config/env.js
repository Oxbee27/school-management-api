
require("dotenv").config();

const PORT = Number(process.env.PORT) || 3000;

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

const ADMIN_NAME = process.env.ADMIN_NAME;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = Number(process.env.DB_PORT) || 5432;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const DB_SSL = process.env.DB_SSL === "true";
const DB_SSL_REJECT_UNAUTHORIZED =
    process.env.DB_SSL_REJECT_UNAUTHORIZED !== "false";

const CORS_ORIGIN =
    process.env.CORS_ORIGIN || "http://localhost:5173";

if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
    throw new Error("PORT must be a valid port number");
}

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error(
        "ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD must be defined"
    );
}

if (!DB_NAME || !DB_USER || !DB_PASSWORD) {
    throw new Error(
        "DB_NAME, DB_USER and DB_PASSWORD must be defined"
    );
}

module.exports = {
    PORT,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ADMIN_NAME,
    ADMIN_EMAIL,
    ADMIN_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_SSL,
    DB_SSL_REJECT_UNAUTHORIZED,
    CORS_ORIGIN
};
