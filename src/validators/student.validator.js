const { z } = require("zod");

const createStudentSchema = z.object({
    userId: z.string().min(1),
    admissionNumber: z.string().min(1).max(50),
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    dateOfBirth: z.string().min(1),
    gender: z.enum(["male", "female"]),
    className: z.string().min(1).max(50)
}).strict();

const updateStudentSchema = z.object({
    firstName: z.string().min(2).max(50).optional(),
    lastName: z.string().min(2).max(50).optional(),
    dateOfBirth: z.string().min(1).optional(),
    gender: z.enum(["male", "female"]).optional(),
    className: z.string().min(1).max(50).optional()
}).strict();

module.exports = {
    createStudentSchema,
    updateStudentSchema
};