const pool = require("../../config/database");

const getSubjects = async () => {
  const result = await pool.query(
    `SELECT
            id,
            subject_name AS name,
            subject_code AS code,
            description,
            class_id AS "classId"
         FROM public.subjects
         ORDER BY id ASC`,
  );

  return result.rows;
};

module.exports = getSubjects;
