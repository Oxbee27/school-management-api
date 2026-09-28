const { z } = require("zod");

const createResultSchema = z.object({
    studentId: z
        .string()
        .min(1, "Student ID is required"),

    subjectId: z
        .string()
        .min(1, "Subject ID is required"),

    score: z
        .number()
        .min(0, "Score cannot be below 0")
        .max(100, "Score cannot exceed 100"),

    term: z
        .string()
        .trim()
        .min(1, "Term is required")
        .max(50),

    session: z
        .string()
        .trim()
        .min(1, "Session is required")
        .max(50)
});

const updateResultSchema = z.object({
    score: z
        .number()
        .min(0)
        .max(100)
        .optional(),

    term: z
        .string()
        .trim()
        .min(1)
        .max(50)
        .optional(),

    session: z
        .string()
        .trim()
        .min(1)
        .max(50)
        .optional()
}).refine(
    data => Object.keys(data).length > 0,
    {
        message: "At least one field is required"
    }
);

module.exports = {
    createResultSchema,
    updateResultSchema
};
