
const pool = require("../../config/database");

const getStudents = async () => {
    const result = await pool.query(`
        SELECT
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
        ORDER BY id ASC
    `);

    return result.rows;
};

module.exports = getStudents;
