exports.seed = function(knex) {
  return knex('classes').insert([
    {class_name: 'fancy yoga class', type: 'Yoga', class_time: '10/20/2020:12:00:00', duration_minutes: 60, intensity_level: 1, location: 'New York, NY', attendees: '', max_class_size: '', instructor_id: 1},
    {class_name: 'fancy powerlifting class', type: 'strength', class_time: '10/25/2020:12:00:00', duration_minutes: 60, intensity_level: 5, location: 'New York, NY', attendees: '', max_class_size: '', instructor_id: 1},
    {class_name: "cycling",type: "endurance",class_time: "10/25/2020:16:30:00",duration_minutes: 60,intensity_level: 5,location: "1234 S Postman Ave Los Angeles, California",attendees: 7,max_class_size: 25,instructor_id: 1}
  ]);
};