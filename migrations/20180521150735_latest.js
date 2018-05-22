export function up(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', table => {
      table.increments()
      table.string('email')
      table.timestamps('created_at')
      table.string('name').notNullable()
      table.string('cover_photo')
      table.string('profile_photo')
      table.string('provider_id')
      table.string('github_provider_id')
      table.string('github_username')
      table.string('username')
      table.boolean('is_online')
      table.dateTime('last_seen')
      table.string('description')
      table.string('website')
      table.dateTime('modified_at')
    })

    // knex.schema.createTable('entries', table => {
    //   table.increments()
    //   table.timestamps()
    //   table.string('repository_name').unique()
    //   table.string('posted_by')
    //   table.float('hot_score')
    // }),

    // knex.schema.createTable('votes', table => {
    //   table.increments()
    //   table.timestamps()
    //   table.integer('entry_id')
    //   table.integer('vote_value')
    //   table.string('username')
    //   table.unique(['entry_id', 'username'])
    // })
  ])
}

export function down(knex, Promise) {
  return Promise.all([knex.schema.dropTable('users')])
}
