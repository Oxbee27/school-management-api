
const pool = require("../../config/database");
const ROLES = require("../../constants/roles");
const hashPassword = require("../../utils/hashPassword");
const ApiError = require("../../utils/apiError");

const registerUser = async ({ name, email, password }) => {
    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await pool.query(
        `SELECT id FROM public.users WHERE email = $1`,
        [normalizedEmail]
    );

    if (existingUser.rows.length > 0) {
        throw new ApiError(409, "Email is already registered");
    }

    const hashedPassword = await hashPassword(password);

    try {
        const result = await pool.query(
            `INSERT INTO public.users (name, email, password, role)
             VALUES ($1, $2, $3, $4)
             RETURNING
                id,
                name,
                email,
                role,
                created_at AS "createdAt"`,
            [name, normalizedEmail, hashedPassword, ROLES.STUDENT]
        );

        return result.rows[0];
    } catch (error) {
        // Handle duplicate emails, including concurrent registrations.
        if (error.code === "23505") {
            throw new ApiError(409, "Email is already registered");
        }

        throw error;
    }
};

module.exports = registerUser;
