const pool = require("../../config/database");
const ApiError = require("../../utils/apiError");

const deleteStudent = async (studentId) => {
  const normalizedId = Number(studentId);

  if (!Number.isSafeInteger(normalizedId) || normalizedId <= 0) {
    throw new ApiError(404, "Student not found");
  }

  const result = await pool.query(
    `DELETE FROM public.students
         WHERE id = $1
         RETURNING
            id,
            user_id AS "userId",
            admission_number AS "admissionNumber",
            first_name AS "firstName",
            last_name AS "lastName",
            date_of_birth AS "dateOfBirth",
            gender,
            class_name AS "className",
            created_at AS "createdAt",
            updated_at AS "updatedAt"`,
    [normalizedId],
  );

  if (result.rows.length === 0) {
    throw new ApiError(404, "Student not found");
  }

  return result.rows[0];
};

module.exports = deleteStudent;
