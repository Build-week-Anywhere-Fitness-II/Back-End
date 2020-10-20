const db = require("../database/dbConfig.js");

module.exports = {
    add,
    find,
    findBy,
    findById,
    signUp
};

function find() {
    return db("classes").select("id", "class_name", "type", "class_time", "duration_minutes", "intensity_level", "location", "attendees", "max_class_size", "instructor_id");
}

function findBy(filter) {
    return db("classes").where(filter);
}

// original code
// async function add(fitnessClass) {
//     let instructorId = fitnessClass.instructor_id;
//     return await db('classes').insert(fitnessClass,[
//         'id', 'class_name', 'type', 'class_time', 'duration_minutes', 'intensity_level', 'location', 'attendees', 'max_class_size', 'instructor_id'
//     ]).then( async function relate(fitnessClass) {
//         let instructorDetails = {instructor_id: instructorId, class_id: fitnessClass.toString()}
//         return await db('instructor_classes').insert(instructorDetails)
//     })
// }

async function add(fitnessClass) {
    let instructorId = fitnessClass.instructor_id;
    return await db('classes').insert(fitnessClass,[
        'id', 'class_name', 'type', 'class_time', 'duration_minutes', 'intensity_level', 'location', 'attendees', 'max_class_size', 'instructor_id'
    ]).then(
        function (fitnessClass) {
            let instructorDetails = {instructor_id: instructorId, class_id: fitnessClass.toString()}
            console.log('instructorDetails from add model', instructorDetails)
            relateInstructor(instructorDetails)
        }
    )
    
}

function findById(id) {
    return db("classes").where({ id }).first();
}

async function signUp(client) {
    let id = client.class_id;
    
    await db("classes").where({ id }).increment("attendees")

    return await db("client_classes").insert(client)
}

// doesn't work to call from outside the add function
async function relateInstructor(fitnessClass) {
    console.log('fitness class from relateInstructor', fitnessClass)
        return await db('instructor_classes').insert(fitnessClass)
}
