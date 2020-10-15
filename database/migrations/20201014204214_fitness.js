
exports.up = function(knex) {
  return knex.schema
  
  .createTable('users', tbl => {
      tbl.increments();
      tbl.string('name', 128)
      tbl.string('username', 128)
        .notNullable()
        .unique()
      tbl.string('password', 256)
        .notNullable()
      tbl.string('role')
        .notNullable();      
  })

  .createTable('classes', tbl => {
    tbl.increments();
    tbl.string('class_name', 128)
        .notNullable()
    tbl.string('type', 128)
        .notNullable()
    tbl.datetime('class_time')
        .notNullable()
    tbl.integer('duration_minutes')
        .notNullable()
    tbl.integer('intensity_level')
        .notNullable();
    tbl.string('location', 256)
        .notNullable();
    tbl.integer('attendees')
    tbl.integer('max_class_size')
  })

  .createTable('instructor_classes', tbl => {
      tbl.integer('instructor_id')
        .unsigned()
        .notNullable()
        .references('users.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

    tbl.integer('class_id')
        .unsigned()
        .notNullable()
        .references('classes.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
  })

  .createTable('client_classes', tbl => {
    tbl.integer('client_id')
      .unsigned()
      .notNullable()
      .references('users.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

  tbl.integer('class_id')
      .unsigned()
      .notNullable()
      .references('classes.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
})

};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('client_classes')
        .dropTableIfExists('instructor_classes')
        .dropTableIfExists('users');
};
