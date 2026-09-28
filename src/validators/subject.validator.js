const { z } = require("zod");

const createSubjectSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Subject name must be at least 2 characters")
        .max(100, "Subject name must not exceed 100 characters"),

    code: z
        .string()
        .trim()
        .min(2, "Subject code must be at least 2 characters")
        .max(20, "Subject code must not exceed 20 characters"),

    description: z
        .string()
        .trim()
        .max(500, "Description must not exceed 500 characters")
        .optional(),

    classId: z
        .number()
        .int()
        .positive("Class ID must be a positive number")
});

const updateSubjectSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2)
        .max(100)
        .optional(),

    code: z
        .string()
        .trim()
        .min(2)
        .max(20)
        .optional(),

    description: z
        .string()
        .trim()
        .max(500)
        .optional(),

    classId: z
        .number()
        .int()
        .positive()
        .optional()
}).refine(
    data => Object.keys(data).length > 0,
    {
        message: "At least one field is required"
    }
);

module.exports = {
    createSubjectSchema,
    updateSubjectSchema
};
