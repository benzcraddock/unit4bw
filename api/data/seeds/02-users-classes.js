const users =[
  { username:'username1', password:'pass123', email:'username1@email.com' },
  { username:'username2', password:'pass123', email:'username2@email.com' },
]
const classes = [
  { class_name:'Yoga', class_start:'10:00', class_duration:'1 hour', class_intensity: 'beginner', class_location: 'New York', class_registered: '15', class_size: '25' },
  { class_name:'Cycling', class_start:'11:00', class_duration:'1 hour', class_intensity: 'intermediate', class_location: 'Boston', class_registered: '30', class_size: '45' },
  { class_name:'Swimming', class_start:'12:00', class_duration:'30 minutes', class_intensity: 'beginner', class_location: 'Miami', class_registered: '15', class_size: '25' },  
]
const type = [
  { type_name: 'indoor' },
  { type_name: 'outdoor' },
  { type_name: 'recreational' },
  { type_name: 'gaming' },
]
const user_class = [
  { user_id: 1, class_id: 1 },
  { user_id: 1, class_id: 2 },
  { user_id: 1, class_id: 3 },
  { user_id: 1, class_id: 4 },
  { user_id: 2, class_id: 5 },
  { user_id: 2, class_id: 6 },
]

const class_type = [
  { class_id: 1, type_id: 1 },
  { class_id: 2, type_id: 2 },
  { class_id: 3, type_id: 1 },
]

exports.seed = async function(knex) {
  await knex('users').insert(users)
  await knex('classes').insert(classes)
  await knex('type').insert(type)
  await knex('user_class').insert(user_class)
  await knex('class_type').insert(class_type)
};