const deleteResult = require("../../services/results/deleteResult.service");

const deleteResultController = async (req, res, next) => {
  try {
    const data = await deleteResult(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Result deleted successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteResultController;
