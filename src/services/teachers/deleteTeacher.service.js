const pool = require("../../config/database");
const ApiError = require("../../utils/apiError");

const deleteTeacher = async (teacherId) => {
  const normalizedId = Number(teacherId);

  if (!Number.isSafeInteger(normalizedId) || normalizedId <= 0) {
    throw new ApiError(400, "Invalid teacher ID");
  }

  const result = await pool.query(
    `DELETE FROM public.teachers
         WHERE id = $1
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
    [normalizedId],
  );

  if (result.rows.length === 0) {
    throw new ApiError(404, "Teacher not found");
  }

  return result.rows[0];
};

module.exports = deleteTeacher;
