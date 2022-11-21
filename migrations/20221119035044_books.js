export async function up(knex) {
  await knex.schema.createTable('books', (table) => {
    table.increments('id')

    table.integer('bookId')
    table.string('book')

    table.string('short')
    table.string('testament')

    table.datetime('createdAt').defaultTo(new Date().toISOString())
    table.datetime('updatedAt').defaultTo(new Date().toISOString())
  })
}

export async function down(knex) {
  await knex.schema.dropTable('books')
}
