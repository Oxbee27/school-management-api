const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const validate = require("../middleware/validate");

const createTeacher = require("../controllers/teachers/createTeacher.controller");
const getTeachers = require("../controllers/teachers/getTeachers.controller");
const getTeacherById = require("../controllers/teachers/getTeacherById.controller");
const updateTeacher = require("../controllers/teachers/updateTeacher.controller");
const deleteTeacher = require("../controllers/teachers/deleteTeacher.controller");

const {
    createTeacherSchema,
    updateTeacherSchema
} = require("../validators/teacher.validator");

router.post(
    "/",
    auth,
    authorize("admin"),
    validate(createTeacherSchema),
    createTeacher
);

router.get(
    "/",
    auth,
    authorize("admin", "teacher"),
    getTeachers
);

router.get(
    "/:id",
    auth,
    authorize("admin", "teacher"),
    getTeacherById
);

router.patch(
    "/:id",
    auth,
    authorize("admin"),
    validate(updateTeacherSchema),
    updateTeacher
);

router.delete(
    "/:id",
    auth,
    authorize("admin"),
    deleteTeacher
);

module.exports = router;