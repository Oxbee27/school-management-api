
const pool = require("../../config/database");
const ApiError = require("../../utils/apiError");

const getStudentById = async (studentId) => {
    const id = Number(studentId);

    if (!Number.isInteger(id) || id < 1) {
        throw new ApiError(404, "Student not found");
    }

    const result = await pool.query(
        `SELECT
            id,
            user_id AS "userId",
            first_name AS "firstName",
            last_name AS "lastName",
            admission_number AS "admissionNumber",
            date_of_birth AS "dateOfBirth",
            gender,
            class_name AS "className",
            created_at AS "createdAt",
            updated_at AS "updatedAt"
         FROM public.students
         WHERE id = $1`,
        [id]
    );

    if (result.rows.length === 0) {
        throw new ApiError(404, "Student not found");
    }

    return result.rows[0];
};

module.exports = getStudentById;
