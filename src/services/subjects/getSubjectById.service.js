const pool = require("../../config/database");
const ApiError = require("../../utils/apiError");

const getSubjectById = async (subjectId) => {
  const normalizedId = Number(subjectId);

  if (!Number.isSafeInteger(normalizedId) || normalizedId <= 0) {
    throw new ApiError(400, "Invalid subject ID");
  }

  const result = await pool.query(
    `SELECT
            id,
            subject_name AS name,
            subject_code AS code,
            description,
            class_id AS "classId"
         FROM public.subjects
         WHERE id = $1
         LIMIT 1`,
    [normalizedId],
  );

  if (result.rows.length === 0) {
    throw new ApiError(404, "Subject not found");
  }

  return result.rows[0];
};

module.exports = getSubjectById;
