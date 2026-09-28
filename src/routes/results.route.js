const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const validate = require("../middleware/validate");

const createResult = require("../controllers/results/createResult.controller");
const getResults = require("../controllers/results/getResults.controller");
const getResultById = require("../controllers/results/getResultById.controller");
const updateResult = require("../controllers/results/updateResult.controller");
const deleteResult = require("../controllers/results/deleteResult.controller");

const {
    createResultSchema,
    updateResultSchema
} = require("../validators/result.validator");

router.post(
    "/",
    auth,
    authorize("admin", "teacher"),
    validate(createResultSchema),
    createResult
);

router.get(
    "/",
    auth,
    authorize("admin", "teacher", "student"),
    getResults
);

router.get(
    "/:id",
    auth,
    authorize("admin", "teacher", "student"),
    getResultById
);

router.patch(
    "/:id",
    auth,
    authorize("admin", "teacher"),
    validate(updateResultSchema),
    updateResult
);

router.delete(
    "/:id",
    auth,
    authorize("admin"),
    deleteResult
);

module.exports = router;
