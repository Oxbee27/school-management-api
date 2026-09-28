const { z } = require("zod");

const createClassSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Class name must be at least 2 characters")
        .max(100, "Class name must not exceed 100 characters"),

    description: z
        .string()
        .trim()
        .max(500, "Description must not exceed 500 characters")
        .optional()
});

const updateClassSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Class name must be at least 2 characters")
        .max(100, "Class name must not exceed 100 characters")
        .optional(),

    description: z
        .string()
        .trim()
        .max(500, "Description must not exceed 500 characters")
        .optional()
}).refine(
    data => Object.keys(data).length > 0,
    {
        message: "At least one field is required"
    }
);

module.exports = {
    createClassSchema,
    updateClassSchema
};