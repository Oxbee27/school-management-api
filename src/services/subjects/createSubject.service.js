const pool = require("../../config/database");
const ApiError = require("../../utils/apiError");

const createSubject = async ({ name, code, description, classId }) => {
  const normalizedClassId = Number(classId);

  if (!Number.isSafeInteger(normalizedClassId) || normalizedClassId <= 0) {
    throw new ApiError(400, "Invalid class ID");
  }

  const classResult = await pool.query(
    `SELECT id
         FROM public.classes
         WHERE id = $1`,
    [normalizedClassId],
  );

  if (classResult.rows.length === 0) {
    throw new ApiError(404, "Class not found");
  }

  const existingSubject = await pool.query(
    `SELECT id
         FROM public.subjects
         WHERE LOWER(subject_code) = LOWER($1)
         LIMIT 1`,
    [code],
  );

  if (existingSubject.rows.length > 0) {
    throw new ApiError(409, "Subject code already exists");
  }

  const result = await pool.query(
    `INSERT INTO public.subjects
            (subject_name, subject_code, description, class_id)
         VALUES ($1, $2, $3, $4)
         RETURNING
            id,
            subject_name AS name,
            subject_code AS code,
            description,
            class_id AS "classId"`,
    [name.trim(), code.trim(), description || "", normalizedClassId],
  );

  return result.rows[0];
};

module.exports = createSubject;
