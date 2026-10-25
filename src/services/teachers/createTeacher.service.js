const pool = require("../../config/database");
const hashPassword = require("../../utils/hashPassword");
const ApiError = require("../../utils/apiError");
const ROLES = require("../../constants/roles");

const createTeacher = async (teacherData) => {
  const {
    firstName,
    lastName,
    email,
    password,
    staffNumber,
    qualification,
    department,
  } = teacherData;

  const normalizedEmail = email.trim().toLowerCase();
  const hashedPassword = await hashPassword(password);
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const existingUser = await client.query(
      `SELECT id
             FROM public.users
             WHERE LOWER(email) = $1
             LIMIT 1`,
      [normalizedEmail],
    );

    if (existingUser.rows.length > 0) {
      throw new ApiError(409, "Email is already registered");
    }

    const existingTeacher = await client.query(
      `SELECT id
             FROM public.teachers
             WHERE staff_number = $1
             LIMIT 1`,
      [staffNumber],
    );

    if (existingTeacher.rows.length > 0) {
      throw new ApiError(409, "Staff number already exists");
    }

    const userResult = await client.query(
      `INSERT INTO public.users (name, email, password, role)
             VALUES ($1, $2, $3, $4)
             RETURNING id, name, email, role`,
      [
        `${firstName} ${lastName}`,
        normalizedEmail,
        hashedPassword,
        ROLES.TEACHER,
      ],
    );
    const user = userResult.rows[0];

    const teacherResult = await client.query(
      `INSERT INTO public.teachers
                (user_id, staff_number, first_name, last_name, qualification, department)
             VALUES ($1, $2, $3, $4, $5, $6)
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
        user.id,
        staffNumber,
        firstName,
        lastName,
        qualification || "",
        department || "",
      ],
    );

    await client.query("COMMIT");

    return {
      ...teacherResult.rows[0],
      user,
    };
  } catch (error) {
    await client.query("ROLLBACK");

    if (error.code === "23505") {
      throw new ApiError(409, "Email or staff number already exists");
    }

    throw error;
  } finally {
    client.release();
  }
};

module.exports = createTeacher;
