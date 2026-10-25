const pool = require("../../config/database");
const ApiError = require("../../utils/apiError");

const getResultById = async (resultId) => {
  const normalizedId = Number(resultId);

  if (!Number.isSafeInteger(normalizedId) || normalizedId <= 0) {
    throw new ApiError(400, "Invalid result ID");
  }

  const result = await pool.query(
    `SELECT
            id,
            student_id AS "studentId",
            subject_id AS "subjectId",
            score,
            grade,
            term,
            session
         FROM public.results
         WHERE id = $1
         LIMIT 1`,
    [normalizedId],
  );

  if (result.rows.length === 0) {
    throw new ApiError(404, "Result not found");
  }

  return result.rows[0];
};

module.exports = getResultById;
