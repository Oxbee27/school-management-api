const pool = require("../../config/database");
const comparePassword = require("../../utils/comparePassword");
const generateToken = require("../../utils/generateToken");
const ApiError = require("../../utils/apiError");

const loginUser = async ({ email, password }) => {
  const result = await pool.query(
    `SELECT id, name, email, password, role
         FROM public.users
         WHERE LOWER(email) = LOWER($1)
         LIMIT 1`,
    [email.trim()],
  );
  const user = result.rows[0];

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const passwordMatch = await comparePassword(password, user.password);

  if (!passwordMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateToken({
    id: user.id,
    role: user.role,
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

module.exports = loginUser;
