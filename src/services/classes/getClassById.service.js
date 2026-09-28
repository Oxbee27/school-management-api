const classes = require("../../database/classes");

const getClassById = (classId) => {
    const classItem = classes.find(
        classItem => classItem.id === Number(classId)
    );

    if (!classItem) {
        throw new Error("Class not found");
    }

    return classItem;
};

module.exports = getClassById;