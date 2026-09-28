const updateSubject = require("../../services/subjects/updateSubject.service");

const updateSubjectController = async (req, res, next) => {
    try {
        const data = updateSubject(req.params.id, req.body);

        res.status(200).json({
            status: "success",
            message: "Subject updated successfully",
            data
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updateSubjectController;
