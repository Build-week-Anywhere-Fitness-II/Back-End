
exports.seed = function(knex) {
      return knex('users').insert([
        {name: 'test instructor', username: 'testinstructor', password: 'password', role: 'instructor'},
        {name: 'test client', username: 'testclient', password: 'password', role: 'client'}
      ]);
    };
