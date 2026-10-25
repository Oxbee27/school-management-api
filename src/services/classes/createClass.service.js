const pool = require("../../config/database");
const ApiError = require("../../utils/apiError");

const createClass = async ({ name, description }) => {
    const normalizedName = name.trim();

    const existingClass = await pool.query(
        `SELECT id
         FROM public.classes
         WHERE LOWER(class_name) = LOWER($1)
         LIMIT 1`,
        [normalizedName]
    );

    if (existingClass.rows.length > 0) {
        throw new ApiError(409, "Class already exists");
    }

    const result = await pool.query(
        `INSERT INTO public.classes (class_name, description)
         VALUES ($1, $2)
         RETURNING id, class_name AS name, description`,
        [normalizedName, description || ""]
    );

    return result.rows[0];
};

module.exports = createClass;