exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable()
      users.string('password', 200).notNullable()
      users.string('email', 200).notNullable()
    })
    .createTable('classes', (table) => {
      table.increments('class_id')
      table.string('class_name', 200).notNullable()
      table.string('class_start', 100).notNullable()
      table.string('class_duration', 100).notNullable()
      table.string('class_intensity', 100).notNullable()
      table.string('class_location', 200).notNullable()
      table.string('class_registered', 100).notNullable()
      table.string('class_size', 100).notNullable()
    })
    .createTable('type', (table) => {
      table.increments('type_id')
      table.string('type_name', 200).notNullable()
    })
    .createTable('user_class', table => {
      table.increments('user_class_id')
      table.integer('class_id')
        .unsigned()
        .notNullable()
        .references('class_id')
        .inTable('classes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
    .createTable('class_type', table => {
      table.increments('class_type_id')
      table.integer('class_id')
        .unsigned()
        .notNullable()
        .references('class_id')
        .inTable('classes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.integer('type_id')
        .unsigned()
        .notNullable()
        .references('type_id')
        .inTable('type')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
}

exports.down = async (knex) => {
  await knex.schema
  .dropTableIfExists('class_type')
  .dropTableIfExists('user_item')
  .dropTableIfExists('type')
  .dropTableIfExists('classes')
  .dropTableIfExists('users')
}
