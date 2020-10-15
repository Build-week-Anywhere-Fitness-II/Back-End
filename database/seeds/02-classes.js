exports.seed = function(knex) {
  return knex('classes').insert([
    {class_name: 'fancy yoga class', type: 'Yoga', class_time: '10/20/2020:12:00:00', duration_minutes: 60, intensity_level: 1, location: 'New York, NY', attendees: '', max_class_size: ''},
    {class_name: 'fancy powerlifting class', type: 'strength', class_time: '10/25/2020:12:00:00', duration_minutes: 60, intensity_level: 5, location: 'New York, NY', attendees: '', max_class_size: ''}
  ]);
};