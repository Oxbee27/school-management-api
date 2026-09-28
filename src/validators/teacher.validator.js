const { z } = require("zod");

const createTeacherSchema = z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    staffNumber: z.string().min(1).max(50),
    qualification: z.string().max(100).optional(),
    department: z.string().max(100).optional()
}).strict();

const updateTeacherSchema = z.object({
    firstName: z.string().min(2).max(50).optional(),
    lastName: z.string().min(2).max(50).optional(),
    qualification: z.string().max(100).optional(),
    department: z.string().max(100).optional()
}).strict();

module.exports = {
    createTeacherSchema,
    updateTeacherSchema
};