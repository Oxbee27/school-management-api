require("dotenv").config();

const PORT = Number(process.env.PORT) || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the .env file");
}

if (!ADMIN_PASSWORD) {
    throw new Error("ADMIN_PASSWORD is not defined in the .env file");
}

module.exports = {
    PORT,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ADMIN_PASSWORD
};