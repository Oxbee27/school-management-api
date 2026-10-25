const pool = require("../../config/database");
const ApiError = require("../../utils/apiError");

const calculateGrade = (score) => {
  if (score >= 70) return "A";
  if (score >= 60) return "B";
  if (score >= 50) return "C";
  if (score >= 45) return "D";
  if (score >= 40) return "E";
  return "F";
};

const createResult = async ({ studentId, subjectId, score, term, session }) => {
  const normalizedStudentId = Number(studentId);
  const normalizedSubjectId = Number(subjectId);

  if (!Number.isSafeInteger(normalizedStudentId) || normalizedStudentId <= 0) {
    throw new ApiError(400, "Invalid student ID");
  }

  if (!Number.isSafeInteger(normalizedSubjectId) || normalizedSubjectId <= 0) {
    throw new ApiError(400, "Invalid subject ID");
  }

  const studentResult = await pool.query(
    `SELECT id
         FROM public.students
         WHERE id = $1`,
    [normalizedStudentId],
  );

  if (studentResult.rows.length === 0) {
    throw new ApiError(404, "Student not found");
  }

  const subjectResult = await pool.query(
    `SELECT id
         FROM public.subjects
         WHERE id = $1`,
    [normalizedSubjectId],
  );

  if (subjectResult.rows.length === 0) {
    throw new ApiError(404, "Subject not found");
  }

  const existingResult = await pool.query(
    `SELECT id
         FROM public.results
         WHERE student_id = $1
           AND subject_id = $2
           AND term = $3
           AND session = $4
         LIMIT 1`,
    [normalizedStudentId, normalizedSubjectId, term, session],
  );

  if (existingResult.rows.length > 0) {
    throw new ApiError(
      409,
      "Result already exists for this student, subject, term and session",
    );
  }

  const result = await pool.query(
    `INSERT INTO public.results
            (student_id, subject_id, score, grade, term, session)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING
            id,
            student_id AS "studentId",
            subject_id AS "subjectId",
            score,
            grade,
            term,
            session`,
    [
      normalizedStudentId,
      normalizedSubjectId,
      score,
      calculateGrade(score),
      term,
      session,
    ],
  );

  return result.rows[0];
};

module.exports = createResult;
