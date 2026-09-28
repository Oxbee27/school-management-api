const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const validate = require("../middleware/validate");

const createSubject = require("../controllers/subjects/createSubject.controller");
const getSubjects = require("../controllers/subjects/getSubjects.controller");
const getSubjectById = require("../controllers/subjects/getSubjectById.controller");
const updateSubject = require("../controllers/subjects/updateSubject.controller");
const deleteSubject = require("../controllers/subjects/deleteSubject.controller");

const {
    createSubjectSchema,
    updateSubjectSchema
} = require("../validators/subject.validator");

router.post("/", auth, authorize("admin"), validate(createSubjectSchema), createSubject);

router.get("/", auth, authorize("admin", "teacher", "student"), getSubjects);

router.get("/:id", auth, authorize("admin", "teacher", "student"), getSubjectById);

router.patch("/:id", auth, authorize("admin"), validate(updateSubjectSchema), updateSubject);

router.delete("/:id", auth, authorize("admin"), deleteSubject);

module.exports = router;
