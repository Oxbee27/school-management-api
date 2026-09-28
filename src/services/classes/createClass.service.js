const classes = require("../../database/classes");

const createClass = ({ name, description }) => {
    const existingClass = classes.find(
        classItem => classItem.name.toLowerCase() === name.toLowerCase()
    );

    if (existingClass) {
        throw new Error("Class already exists");
    }

    const newClass = {
        id: classes.length + 1,
        name,
        description: description || "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    classes.push(newClass);

    return newClass;
};

module.exports = createClass;