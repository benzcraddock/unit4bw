const db = require('../../data/db-config')

async function getClasses() { 
  const rows = await db('classes') 
  return rows
}

async function getClassById(class_id) { 
  const [rows] = await db('classes')
    .where('class_id', class_id) 
  return rows
}

async function addClass(class, class_id) {
  const [newClass] = await db('classes').insert(class, ['class_id', 'class_name', 'class_start', 'class_duration', 'class_intensity', 'class_location', 'class_registered', 'class_size'])
  const userClass = {
    'user_id': user_id, 
    'class_id': newClass.class_id
  }
  const rows = await db('user_class').insert(userClass)
  return newClass
}

async function updateClass(class_id, class) {
  const [updatedClass] = await db('classes')
    .update(class, ['class_id', 'class_name', 'class_start', 'class_duration', 'class_intensity', 'class_location', 'class_registered', 'class_size'])
    .where('class_id', class_id);
  return updatedClass
}

function deleteClass(class_id) {
  const numDeleted = db('classes').where({ class_id }).del();
  return numDeleted
}

async function getClassesByUser(user_id) { 
  const rows = await db('user_class')
    .leftJoin('classes', 'user_class.class_id', 'classes.class_id')
    .where('user_class.user_id', user_id)
  return rows
}

module.exports = {
  getClasses,
  getClassById,
  addClass,
  deleteClass,
  updateClass,
  getClassesByUser
}