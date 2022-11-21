export async function up(knex) {
  await knex.schema.createTable('lines', (table) => {
    table.increments('id')
    table.integer('verseId')
    
    table.integer('line')

    table.string('lineText')
    table.string('rawText')

    table.datetime('createdAt').defaultTo(new Date().toISOString())
    table.datetime('updatedAt').defaultTo(new Date().toISOString())
  })
}

export async function down(knex) {
  await knex.schema.dropTable('lines')
}
