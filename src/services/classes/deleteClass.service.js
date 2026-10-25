const pool = require("../../config/database");
const ApiError = require("../../utils/apiError");

const deleteClass = async (classId) => {
  const normalizedId = Number(classId);

  if (!Number.isSafeInteger(normalizedId) || normalizedId <= 0) {
    throw new ApiError(400, "Invalid class ID");
  }

  const result = await pool.query(
    `DELETE FROM public.classes
         WHERE id = $1
         RETURNING
             id,
             class_name AS name,
             description`,
    [normalizedId],
  );

  if (result.rows.length === 0) {
    throw new ApiError(404, "Class not found");
  }

  return result.rows[0];
};

module.exports = deleteClass;
