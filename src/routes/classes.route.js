const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const validate = require("../middleware/validate");

const createClass = require("../controllers/classes/createClass.controller");
const getClasses = require("../controllers/classes/getClasses.controller");
const getClassById = require("../controllers/classes/getClassById.controller");
const updateClass = require("../controllers/classes/updateClass.controller");
const deleteClass = require("../controllers/classes/deleteClass.controller");

const {
    createClassSchema,
    updateClassSchema
} = require("../validators/class.validator");

router.post("/", auth, authorize("admin"), validate(createClassSchema), createClass);

router.get("/", auth, authorize("admin", "teacher", "student"), getClasses);

router.get("/:id", auth, authorize("admin", "teacher", "student"), getClassById);

router.patch("/:id", auth, authorize("admin"), validate(updateClassSchema), updateClass);

router.delete("/:id", auth, authorize("admin"), deleteClass);

module.exports = router;
