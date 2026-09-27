const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const authRoutes = require("./routes/auth.route");
const classesRoutes = require("./routes/classes.route");
const resultsRoutes = require("./routes/results.route");
const studentsRoutes = require("./routes/students.route");
const subjectsRoutes = require("./routes/subjects.route");
const teachersRoutes = require("./routes/teachers.route");

const app = express();



app.use(helmet());

app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "http://localhost:5173",
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);


app.use(express.json());


app.use(logger);

app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "School Management API is running"
    });
});


app.use("/auth", authRoutes);
app.use("/classes", classesRoutes);
app.use("/results", resultsRoutes);
app.use("/students", studentsRoutes);
app.use("/subjects", subjectsRoutes);
app.use("/teachers", teachersRoutes);

app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: "Route not found"
    });
});

app.use(errorHandler);


module.exports = app;