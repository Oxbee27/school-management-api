const pool = require("../../config/database");
const ApiError = require("../../utils/apiError");

const updateTeacher = async (teacherId, data) => {
  const normalizedId = Number(teacherId);

  if (!Number.isSafeInteger(normalizedId) || normalizedId <= 0) {
    throw new ApiError(400, "Invalid teacher ID");
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await client.query(
      `UPDATE public.teachers
             SET first_name = CASE
                    WHEN $1::boolean THEN $2
                    ELSE first_name
                 END,
                 last_name = CASE
                    WHEN $3::boolean THEN $4
                    ELSE last_name
                 END,
                 qualification = CASE
                    WHEN $5::boolean THEN $6
                    ELSE qualification
                 END,
                 department = CASE
                    WHEN $7::boolean THEN $8
                    ELSE department
                 END,
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = $9
             RETURNING
                id,
                user_id AS "userId",
                staff_number AS "staffNumber",
                first_name AS "firstName",
                last_name AS "lastName",
                qualification,
                department,
                created_at AS "createdAt",
                updated_at AS "updatedAt"`,
      [
        data.firstName !== undefined,
        data.firstName !== undefined ? data.firstName : null,
        data.lastName !== undefined,
        data.lastName !== undefined ? data.lastName : null,
        data.qualification !== undefined,
        data.qualification !== undefined ? data.qualification : null,
        data.department !== undefined,
        data.department !== undefined ? data.department : null,
        normalizedId,
      ],
    );

    if (result.rows.length === 0) {
      throw new ApiError(404, "Teacher not found");
    }

    if (data.firstName !== undefined || data.lastName !== undefined) {
      await client.query(
        `UPDATE public.users
                 SET name = $1
                 WHERE id = $2`,
        [
          `${result.rows[0].firstName} ${result.rows[0].lastName}`,
          result.rows[0].userId,
        ],
      );
    }

    await client.query("COMMIT");
    return result.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

module.exports = updateTeacher;
