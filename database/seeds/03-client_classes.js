exports.seed = function(knex) {
  return knex('client_classes').insert([
    {client_id: 1, class_id: 1},
    {client_id: 1, class_id: 2}
    
  ]);
};