
const pool = require("../../config/database");
const ApiError = require("../../utils/apiError");

const updateClass = async (classId, data) => {
    const normalizedId = Number(classId);

    if (!Number.isSafeInteger(normalizedId) || normalizedId <= 0) {
        throw new ApiError(400, "Invalid class ID");
    }

    const existingResult = await pool.query(
        `SELECT id
         FROM public.classes
         WHERE id = $1`,
        [normalizedId]
    );

    if (existingResult.rows.length === 0) {
        throw new ApiError(404, "Class not found");
    }

    if (data.name) {
        const duplicateResult = await pool.query(
            `SELECT id
             FROM public.classes
             WHERE LOWER(class_name) = LOWER($1)
               AND id <> $2
             LIMIT 1`,
            [data.name.trim(), normalizedId]
        );

        if (duplicateResult.rows.length > 0) {
            throw new ApiError(409, "Class already exists");
        }
    }

    const updatedResult = await pool.query(
        `UPDATE public.classes
         SET class_name = CASE
                WHEN $1::boolean THEN $2
                ELSE class_name
             END,
             description = CASE
                WHEN $3::boolean THEN $4
                ELSE description
             END
         WHERE id = $5
         RETURNING
             id,
             class_name AS name,
             description`,
        [
            Boolean(data.name),
            data.name ? data.name.trim() : null,
            data.description !== undefined,
            data.description !== undefined ? data.description : null,
            normalizedId
        ]
    );

    return updatedResult.rows[0];
};

module.exports = updateClass;
