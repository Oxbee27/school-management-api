const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
    const saltRounds = 12;

    return bcrypt.hash(password, saltRounds);
};

module.exports = hashPassword;