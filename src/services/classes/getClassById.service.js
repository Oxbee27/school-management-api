const pool = require("../../config/database");
const ApiError = require("../../utils/apiError");

const getClassById = async (classId) => {
  const result = await pool.query(
    `SELECT
            id,
            class_name AS name,
            description
         FROM public.classes
         WHERE id = $1
         LIMIT 1`,
    [classId],
  );

  if (result.rows.length === 0) {
    throw new ApiError(404, "Class not found");
  }

  return result.rows[0];
};

module.exports = getClassById;
