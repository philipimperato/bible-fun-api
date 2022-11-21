export async function up(knex) {
  await knex.schema.createTable('verses', (table) => {
    table.increments('id')
    table.integer('chapterId')
    
    table.integer('verseId')
    table.integer('verse')

    table.string('verseText')
    table.string('rawText')
    table.string('name')

    table.datetime('createdAt').defaultTo(new Date().toISOString())
    table.datetime('updatedAt').defaultTo(new Date().toISOString())
  })
}

export async function down(knex) {
  await knex.schema.dropTable('verses')
}
