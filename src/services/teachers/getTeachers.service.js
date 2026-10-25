const pool = require("../../config/database");

const getTeachers = async () => {
  const result = await pool.query(
    `SELECT
            id,
            user_id AS "userId",
            staff_number AS "staffNumber",
            first_name AS "firstName",
            last_name AS "lastName",
            qualification,
            department,
            created_at AS "createdAt",
            updated_at AS "updatedAt"
         FROM public.teachers
         ORDER BY id ASC`,
  );

  return result.rows;
};

module.exports = getTeachers;
