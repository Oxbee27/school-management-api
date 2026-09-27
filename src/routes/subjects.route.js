const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const createStudent = require("../controllers/students/createStudent.controller");
const getStudents = require("../controllers/students/getStudents.controller");
const getStudentById = require("../controllers/students/getStudentById.controller");
const updateStudent = require("../controllers/students/updateStudent.controller");
const deleteStudent = require("../controllers/students/deleteStudent.controller");


// CREATE
router.post(
    "/",
    auth,
    authorize("admin"),
    createStudent
);


// GET ALL
router.get(
    "/",
    auth,
    authorize("admin", "teacher"),
    getStudents
);


// GET BY ID
router.get(
    "/:id",
    auth,
    authorize("admin", "teacher", "student"),
    getStudentById
);


// UPDATE
router.patch(
    "/:id",
    auth,
    authorize("admin", "student"),
    updateStudent
);


// DELETE
router.delete(
    "/:id",
    auth,
    authorize("admin"),
    deleteStudent
);

module.exports = router;