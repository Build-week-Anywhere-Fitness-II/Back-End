const db = require("../database/dbConfig.js");

module.exports = {
    add,
    find,
    findBy,
    findById
};

function find() {
    return db("classes").select("id", "class_name", "type", "class_time", "duration_minutes", "intensity_level", "location", "attendees", "max_class_size", "instructor_id");
}

function findBy(filter) {
    return db("classes").where(filter);
}

async function add(fitnessClass) {
    // const [id] = await db("classes").insert(fitnessClass);
    // uncomment for testing locally

    return await db('classes').insert(fitnessClass,[
        'id', 'class_name', 'type', 'class_time', 'duration_minutes', 'intensity_level', 'location', 'attendees', 'max_class_size', 'instructor_id'
    ])
    // make sure the return statement above is uncommented before pushing to prod

    let instructorDetails = {instructor_id: fitnessClass.instructor_id, class_id: id}

    // await db('instructor_classes').insert(instructorDetails)
    // uncomment for testing locally
    
    return await db('instructor_classes').insert(instructorDetails)
    // make sure the return statement above is uncommented before pushing to prod

    return findById(id);
}

function findById(id) {
    return db("classes").where({ id }).first();
}