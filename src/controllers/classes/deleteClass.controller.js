const deleteClass = require("../../services/classes/deleteClass.service");

const deleteClassController = async (req, res, next) => {
    try {
        const data = deleteClass(req.params.id);

        res.status(200).json({
            status: "success",
            message: "Class deleted successfully",
            data
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deleteClassController;
