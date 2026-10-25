const pool = require("../../config/database");

const getResults = async () => {
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
         ORDER BY id ASC`,
  );

  return result.rows;
};

module.exports = getResults;
