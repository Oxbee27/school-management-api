const pool = require("../../config/database");

const getClasses = async () => {
  const result = await pool.query(
    `SELECT
            id,
            class_name AS name,
            description
         FROM public.classes
         ORDER BY id ASC`,
  );

  return result.rows;
};

module.exports = getClasses;
