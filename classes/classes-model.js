const db = require("../database/dbConfig.js");

module.exports = {
    add,
    find,
    findBy,
    findById
};

function find() {
    return db("classes").select("id", "class_name", "type", "class_time", "duration_minutes", "intensity_level", "location", "attendees", "max_class_size");
}

function findBy(filter) {
    return db("classes").where(filter);
}

async function add(fitnessClass) {
    const [id] = await db("classes").insert(fitnessClass);

    return findById(id);
}

function findById(id) {
    return db("classes").where({ id }).first();
}