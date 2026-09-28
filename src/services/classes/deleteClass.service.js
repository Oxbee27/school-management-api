const classes = require("../../database/classes");

const deleteClass = (classId) => {
    const index = classes.findIndex(
        classItem => classItem.id === Number(classId)
    );

    if (index === -1) {
        throw new Error("Class not found");
    }

    const deletedClass = classes.splice(index, 1)[0];

    return deletedClass;
};

module.exports = deleteClass;