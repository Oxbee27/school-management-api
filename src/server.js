
const app = require("./app");
const env = require("./config/env");
const pool = require("./config/database");
const seedAdmin = require("./seeds/admin.seed");

const PORT = Number(process.env.PORT || env.PORT || 3000);

const startServer = async () => {
    try {
        // 1. Confirm that PostgreSQL is reachable.
        await pool.query("SELECT 1");
        console.log("PostgreSQL connection successful");

        // 2. Ensure the admin account exists.
        await seedAdmin();

        // 3. Start the Express server.
        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

        server.on("error", async (error) => {
            console.error("Server startup error:", error.message);
            await pool.end().catch(() => {});
            process.exit(1);
        });

        // 4. Shut down cleanly when the process stops.
        let shuttingDown = false;

        const shutdown = (signal) => {
            if (shuttingDown) return;
            shuttingDown = true;

            console.log(`${signal} received. Shutting down...`);

            server.close(async (error) => {
                try {
                    await pool.end();

                    if (error) {
                        console.error("Server shutdown error:", error.message);
                        process.exitCode = 1;
                    } else {
                        console.log("Server and database connections closed");
                    }
                } catch (dbError) {
                    console.error(
                        "Database shutdown error:",
                        dbError.message
                    );
                    process.exitCode = 1;
                }
            });
        };

        process.on("SIGTERM", () => shutdown("SIGTERM"));
        process.on("SIGINT", () => shutdown("SIGINT"));

    } catch (error) {
        console.error("Failed to start server:", error.message);

        await pool.end().catch(() => {});
        process.exitCode = 1;
    }
};

startServer();
