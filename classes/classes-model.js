const db = require("../database/dbConfig.js");

module.exports = {
    add,
    find,
    findBy,
    findById,
    signUp,
    editClass
};

function find() {
    return db("classes").select("id", "class_name", "type", "class_time", "duration_minutes", "intensity_level", "location", "attendees", "max_class_size", "instructor_id");
}

function findBy(filter) {
    return db("classes").where(filter);
}

async function add(fitnessClass) {
    return await db('classes').insert(fitnessClass,[
        'id', 'class_name', 'type', 'class_time', 'duration_minutes', 'intensity_level', 'location', 'attendees', 'max_class_size', 'instructor_id'
    ]).then(
        function (savedFitnessClass) {
            let instructorDetails = {instructor_id: savedFitnessClass[0].instructor_id, class_id: savedFitnessClass[0].id}
            relateInstructor(instructorDetails)
        }
    ) 
}

async function relateInstructor(fitnessClass) {
    return await db('instructor_classes').insert(fitnessClass)
}

function editClass(id, changes) {
    return db('classes')
        .where({id})
        .update(changes)
        .then(() => {
            return findById(id);
        });

}

function findById(id) {
    return db("classes").where({ id }).first();
}

async function signUp(client) {
    let id = client.class_id;
    
    await db("classes").where({ id }).increment("attendees")

    return await db("client_classes").insert(client)
}


