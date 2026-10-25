
const pool = require("../config/database");
const hashPassword = require("../utils/hashPassword");
const env = require("../config/env");

const seedAdmin = async () => {
    const normalizedEmail = env.ADMIN_EMAIL.toLowerCase().trim();

    const existingAdmin = await pool.query(
        `SELECT id
         FROM public.users
         WHERE role = 'admin'
         LIMIT 1`
    );

    if (existingAdmin.rows.length > 0) {
        console.log("Admin user already exists");
        return;
    }

    const passwordHash = await hashPassword(env.ADMIN_PASSWORD);

    try {
        await pool.query(
            `INSERT INTO public.users (name, email, password, role)
             VALUES ($1, $2, $3, 'admin')`,
            [env.ADMIN_NAME, normalizedEmail, passwordHash]
        );

        console.log("Admin user seeded successfully");
    } catch (error) {
        if (error.code === "23505") {
            const adminCheck = await pool.query(
                `SELECT id
                 FROM public.users
                 WHERE role = 'admin'
                 LIMIT 1`
            );

            if (adminCheck.rows.length > 0) {
                console.log("Admin user already exists");
                return;
            }
        }

        throw error;
    }
};

module.exports = seedAdmin;
