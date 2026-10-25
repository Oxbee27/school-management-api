const pool = require("../../config/database");
const ApiError = require("../../utils/apiError");

const updateStudent = async (studentId, updateData) => {
  const normalizedId = Number(studentId);

  if (!Number.isSafeInteger(normalizedId) || normalizedId <= 0) {
    throw new ApiError(404, "Student not found");
  }

  const columns = {
    firstName: "first_name",
    lastName: "last_name",
    dateOfBirth: "date_of_birth",
    gender: "gender",
    className: "class_name",
  };
  const values = [];
  const assignments = [];

  for (const [field, column] of Object.entries(columns)) {
    if (updateData[field] !== undefined) {
      values.push(updateData[field]);
      assignments.push(`${column} = $${values.length}`);
    }
  }

  assignments.push("updated_at = CURRENT_TIMESTAMP");
  values.push(normalizedId);

  const result = await pool.query(
    `UPDATE public.students
         SET ${assignments.join(", ")}
         WHERE id = $${values.length}
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
    values,
  );

  if (result.rows.length === 0) {
    throw new ApiError(404, "Student not found");
  }

  return result.rows[0];
};

module.exports = updateStudent;
