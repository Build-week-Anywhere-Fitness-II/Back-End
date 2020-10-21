const db = require("../database/dbConfig.js");

module.exports = {
    add,
    find,
    findBy,
    findById,
    signUp,
    editClass,
    deleteClass,
    findInstructorClasses,
    findClientClasses
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

function deleteClass(id) {
    return db('classes')
        .where({ id })
        .del();
}

function findById(id) {
    return db("classes").where({ id }).first();
}

async function signUp(client) {
    let id = client.class_id;
    
    await db("classes").where({ id }).increment("attendees")

    return await db("client_classes").insert(client)
}

function findClientClasses(id) {
    return db("classes as c")
      .join("client_classes as cc", "cc.class_id" ,"c.id")
      .where("cc.client_id", "=", `${id}`)
      .orderBy("c.id");
}

function findInstructorClasses(id) {
    return db("classes as c")
      .join("instructor_classes as ic", "ic.class_id" ,"c.id")
      .where("ic.instructor_id", "=", `${id}`)
      .orderBy("c.id");
}
