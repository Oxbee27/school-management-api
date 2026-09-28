const users = require("../database/users");
const hashPassword = require("../utils/hashPassword");
const env = require("../config/env");

const seedAdmin = async () => {
    const existingAdmin = users.find(
        user => user.role === "admin"
    );

    if (existingAdmin) {
        return;
    }

    const passwordHash = await hashPassword(env.ADMIN_PASSWORD);

    const admin = {
        id: String(users.length + 1),
        name: env.ADMIN_NAME,
        email: env.ADMIN_EMAIL.toLowerCase(),
        password: passwordHash,
        role: "admin",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    users.push(admin);

    console.log("Admin user seeded successfully");
};

module.exports = seedAdmin;