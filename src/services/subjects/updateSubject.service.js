const pool = require("../../config/database");
const ApiError = require("../../utils/apiError");

const updateSubject = async (subjectId, data) => {
  const normalizedId = Number(subjectId);

  if (!Number.isSafeInteger(normalizedId) || normalizedId <= 0) {
    throw new ApiError(400, "Invalid subject ID");
  }

  const existingResult = await pool.query(
    `SELECT id
         FROM public.subjects
         WHERE id = $1`,
    [normalizedId],
  );

  if (existingResult.rows.length === 0) {
    throw new ApiError(404, "Subject not found");
  }

  if (data.code) {
    const duplicateResult = await pool.query(
      `SELECT id
             FROM public.subjects
             WHERE LOWER(subject_code) = LOWER($1)
               AND id <> $2
             LIMIT 1`,
      [data.code.trim(), normalizedId],
    );

    if (duplicateResult.rows.length > 0) {
      throw new ApiError(409, "Subject code already exists");
    }
  }

  if (data.classId !== undefined) {
    const normalizedClassId = Number(data.classId);

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
  }

  const result = await pool.query(
    `UPDATE public.subjects
         SET subject_name = CASE
                WHEN $1::boolean THEN $2
                ELSE subject_name
             END,
             subject_code = CASE
                WHEN $3::boolean THEN $4
                ELSE subject_code
             END,
             description = CASE
                WHEN $5::boolean THEN $6
                ELSE description
             END,
             class_id = CASE
                WHEN $7::boolean THEN $8
                ELSE class_id
             END
         WHERE id = $9
         RETURNING
            id,
            subject_name AS name,
            subject_code AS code,
            description,
            class_id AS "classId"`,
    [
      data.name !== undefined,
      data.name !== undefined ? data.name.trim() : null,
      data.code !== undefined,
      data.code !== undefined ? data.code.trim() : null,
      data.description !== undefined,
      data.description !== undefined ? data.description : null,
      data.classId !== undefined,
      data.classId !== undefined ? Number(data.classId) : null,
      normalizedId,
    ],
  );

  return result.rows[0];
};

module.exports = updateSubject;
