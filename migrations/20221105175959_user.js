export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id')

    table.string('email').unique().notNullable()
    table.string('password').notNullable()
    table.string('status').defaultTo('active').notNullable()

    table.datetime('createdAt').defaultTo(new Date().toISOString())
    table.datetime('updatedAt').defaultTo(new Date().toISOString())
  })
}

export async function down(knex) {
  await knex.schema.dropTable('users')
}
