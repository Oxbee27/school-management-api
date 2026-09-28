const students = require("../../database/students");

const getStudents = () => {
    return students;
};

module.exports = getStudents;