const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    const response = {
        status: "error",
        message: err.message || "Internal server error"
    };

    if (err.errors) {
        response.errors = err.errors;
    }

    res.status(statusCode).json(response);
};

module.exports = errorHandler;