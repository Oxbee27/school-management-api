const deleteSubject = require("../../services/subjects/deleteSubject.service");

const deleteSubjectController = async (req, res, next) => {
    try {
        const data = deleteSubject(req.params.id);

        res.status(200).json({
            status: "success",
            message: "Subject deleted successfully",
            data
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deleteSubjectController;
