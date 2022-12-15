export async function up(knex) {
  await knex.schema.createTable('notes', (table) => {
    table.increments('id')
    table.integer('userId')
    table.integer('verseId')

    table.text('note')

    table.datetime('createdAt').defaultTo(new Date().toISOString())
    table.datetime('updatedAt').defaultTo(new Date().toISOString())
  })
}

export async function down(knex) {
  await knex.schema.dropTable('notes')
}
