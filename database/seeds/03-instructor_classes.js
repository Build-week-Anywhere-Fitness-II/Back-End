exports.seed = function(knex) {
  return knex('instructor_classes').insert([
    {instructor_id: 1, class_id: 1},
    {instructor_id: 1, class_id: 2}
    
  ]);
};