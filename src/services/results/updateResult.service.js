const pool = require("../../config/database");
const ApiError = require("../../utils/apiError");

const calculateGrade = (score) => {
  if (score >= 70) return "A";
  if (score >= 60) return "B";
  if (score >= 50) return "C";
  if (score >= 45) return "D";
  if (score >= 40) return "E";
  return "F";
};

const updateResult = async (resultId, data) => {
  const normalizedId = Number(resultId);

  if (!Number.isSafeInteger(normalizedId) || normalizedId <= 0) {
    throw new ApiError(400, "Invalid result ID");
  }

  const existingResult = await pool.query(
    `SELECT id
         FROM public.results
         WHERE id = $1`,
    [normalizedId],
  );

  if (existingResult.rows.length === 0) {
    throw new ApiError(404, "Result not found");
  }

  const result = await pool.query(
    `UPDATE public.results
         SET score = CASE
                WHEN $1::boolean THEN $2
                ELSE score
             END,
             grade = CASE
                WHEN $1::boolean THEN $3
                ELSE grade
             END,
             term = CASE
                WHEN $4::boolean THEN $5
                ELSE term
             END,
             session = CASE
                WHEN $6::boolean THEN $7
                ELSE session
             END
         WHERE id = $8
         RETURNING
            id,
            student_id AS "studentId",
            subject_id AS "subjectId",
            score,
            grade,
            term,
            session`,
    [
      data.score !== undefined,
      data.score !== undefined ? data.score : null,
      data.score !== undefined ? calculateGrade(data.score) : null,
      data.term !== undefined,
      data.term !== undefined ? data.term : null,
      data.session !== undefined,
      data.session !== undefined ? data.session : null,
      normalizedId,
    ],
  );

  return result.rows[0];
};

module.exports = updateResult;
