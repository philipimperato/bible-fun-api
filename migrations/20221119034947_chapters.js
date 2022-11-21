export async function up(knex) {
  await knex.schema.createTable('chapters', (table) => {
    table.increments('id')
    table.integer('bookId')

    table.integer('chapterId')
    table.integer('chapter')

    table.string('name')
    
    table.datetime('createdAt').defaultTo(new Date().toISOString())
    table.datetime('updatedAt').defaultTo(new Date().toISOString())
  })
}

export async function down(knex) {
  await knex.schema.dropTable('chapters')
}
