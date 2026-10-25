const getStudentByIdService = require("../../services/students/getStudentById.service");

const getStudentById = async (req, res, next) => {
  try {
    const student = await getStudentByIdService(req.params.id);

    res.status(200).json({
      status: "success",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getStudentById;
