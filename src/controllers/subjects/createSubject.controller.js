const createSubject = require("../../services/subjects/createSubject.service");

const createSubjectController = async (req, res, next) => {
    try {
        const data = createSubject(req.body);

        res.status(201).json({
            status: "success",
            message: "Subject created successfully",
            data
        });
    } catch (error) {
        next(error);
    }
};

module.exports = createSubjectController;
