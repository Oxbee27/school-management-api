const results = require("../../database/results");
const students = require("../../database/students");
const subjects = require("../../database/subjects");
const ApiError = require("../../utils/apiError");

const calculateGrade = score => {
    if (score >= 70) return "A";
    if (score >= 60) return "B";
    if (score >= 50) return "C";
    if (score >= 45) return "D";
    if (score >= 40) return "E";
    return "F";
};

const createResult = ({
    studentId,
    subjectId,
    score,
    term,
    session
}) => {
    const student = students.find(
        student => student.id === String(studentId)
    );

    if (!student) {
        throw new ApiError(404, "Student not found");
    }

    const subject = subjects.find(
        subject => subject.id === String(subjectId)
    );

    if (!subject) {
        throw new ApiError(404, "Subject not found");
    }

    const existingResult = results.find(
        result =>
            result.studentId === String(studentId) &&
            result.subjectId === String(subjectId) &&
            result.term === term &&
            result.session === session
    );

    if (existingResult) {
        throw new ApiError(
            409,
            "Result already exists for this student, subject, term and session"
        );
    }

    const result = {
        id: String(results.length + 1),
        studentId: String(studentId),
        subjectId: String(subjectId),
        score,
        grade: calculateGrade(score),
        term,
        session,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    results.push(result);

    return result;
};

module.exports = createResult;
