const pool = require("../../config/database");
const ApiError = require("../../utils/apiError");

const createStudent = async (studentData) => {
  const {
    userId,
    admissionNumber,
    firstName,
    lastName,
    dateOfBirth,
    gender,
    className,
  } = studentData;

  const normalizedUserId = Number(userId);

  if (!Number.isSafeInteger(normalizedUserId) || normalizedUserId <= 0) {
    throw new ApiError(404, "User not found");
  }

  const userResult = await pool.query(
    `SELECT id, role FROM public.users WHERE id = $1`,
    [normalizedUserId],
  );
  const user = userResult.rows[0];

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.role !== "student") {
    throw new ApiError(
      400,
      "Only users with the student role can have a student profile",
    );
  }

  const existingStudent = await pool.query(
    `SELECT id FROM public.students WHERE user_id = $1 LIMIT 1`,
    [normalizedUserId],
  );

  if (existingStudent.rows.length > 0) {
    throw new ApiError(409, "Student profile already exists for this user");
  }

  const existingAdmissionNumber = await pool.query(
    `SELECT id
         FROM public.students
         WHERE admission_number = $1
         LIMIT 1`,
    [admissionNumber],
  );

  if (existingAdmissionNumber.rows.length > 0) {
    throw new ApiError(409, "Admission number already exists");
  }

  try {
    const result = await pool.query(
      `INSERT INTO public.students (
                user_id,
                admission_number,
                first_name,
                last_name,
                date_of_birth,
                gender,
                class_name
             )
             VALUES ($1, $2, $3, $4, $5, $6, $7)
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
      [
        normalizedUserId,
        admissionNumber,
        firstName,
        lastName,
        dateOfBirth || null,
        gender || null,
        className || null,
      ],
    );

    return result.rows[0];
  } catch (error) {
    if (error.code === "23505") {
      if (error.constraint === "students_user_id_unique") {
        throw new ApiError(409, "Student profile already exists for this user");
      }

      if (error.constraint === "students_admission_number_key") {
        throw new ApiError(409, "Admission number already exists");
      }
    }

    throw error;
  }
};

module.exports = createStudent;
