const updateClass = require("../../services/classes/updateClass.service");

const updateClassController = async (req, res, next) => {
    try {
        const data = updateClass(req.params.id, req.body);

        res.status(200).json({
            status: "success",
            message: "Class updated successfully",
            data
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updateClassController;
