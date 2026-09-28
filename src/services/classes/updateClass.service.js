const classes = require("../../database/classes");

const updateClass = (classId, data) => {
    const classItem = classes.find(
        classItem => classItem.id === Number(classId)
    );

    if (!classItem) {
        throw new Error("Class not found");
    }

    if (data.name) {
        const existingClass = classes.find(
            item =>
                item.id !== Number(classId) &&
                item.name.toLowerCase() === data.name.toLowerCase()
        );

        if (existingClass) {
            throw new Error("Class already exists");
        }

        classItem.name = data.name;
    }

    if (data.description !== undefined) {
        classItem.description = data.description;
    }

    classItem.updatedAt = new Date().toISOString();

    return classItem;
};

module.exports = updateClass;