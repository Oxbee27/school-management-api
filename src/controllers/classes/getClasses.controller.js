const getClasses = require("../../services/classes/getClasses.service");

const getClassesController = async (req, res, next) => {
    try {
        const data = getClasses();

        res.status(200).json({
            status: "success",
            data
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getClassesController;
