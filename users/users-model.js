const db = require("../database/dbConfig.js");

module.exports = {
    add,
    find,
    findBy,
    findById
};

function find() {
    return db("users").select("id", "name", "username", "role");
}

function findBy(filter) {
    return db("users").where(filter);
}

async function add(user) {
    // const [id] = await db("users").insert(user);
    // return findById(id);
    //updating this so it works with postgress

    return await db('users').insert(user,['name', 'username', 'role'])
}

function findById(id) {
    return db("users").where({ id }).first();
}
