const app = require("./app");

const {
    PORT
} = require("./config/env");

const seedAdmin = require("./seeds/admin.seed");

const startServer = async () => {
    try {
        await seedAdmin();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();