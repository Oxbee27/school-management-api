const createClass = require("../../services/classes/createClass.service");

const createClassController = async (req, res, next) => {
    try {
        const data = createClass(req.body);

        res.status(201).json({
            status: "success",
            message: "Class created successfully",
            data
        });
    } catch (error) {
        next(error);
    }
};

module.exports = createClassController;
