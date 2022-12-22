import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('language', function (table) {
      table.increments('id')
      table.string('code', 2).notNullable()
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
      table.timestamp('deleted_at').defaultTo(null)
      table.index(['code'], 'language_index')
    })
    .createTable('book', function (table) {
      table.increments('id')
      table
        .integer('language_id', 10)
        .unsigned()
        .references('id')
        .inTable('language')
        .notNullable()
        .onDelete('CASCADE')
      table.string('word', 5).notNullable()
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
      table.timestamp('deleted_at').defaultTo(null)
      table.index(['language_id'], 'book_index')
    })
    .createTable('game', function (table) {
      table.increments('id')
      table
        .integer('language_id', 10)
        .unsigned()
        .references('id')
        .inTable('language')
        .notNullable()
        .onDelete('CASCADE')
      table.string('word', 5).notNullable()
      table.string('salt', 5).notNullable()
      table.enu('result', ['SUCCESS', 'FAIL', 'IN_PROGRESS']).notNullable()
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
      table.timestamp('deleted_at').defaultTo(null)
    })
    .createTable('guess', function (table) {
      table.increments('id')
      table
        .integer('game_id', 10)
        .unsigned()
        .references('id')
        .inTable('game')
        .notNullable()
        .onDelete('CASCADE')
      table.string('guess', 5).notNullable()
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
      table.timestamp('deleted_at').defaultTo(null)
      table.index(['game_id', 'guess'], 'guess_index')
    })
    .createTable('user', function (table) {
      table.increments('id')
      table.string('fingerprint').notNullable()
      table.index(['fingerprint'], 'user_index')
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
      table.timestamp('deleted_at').defaultTo(null)
    })
    .createTable('user_to_game', function (table) {
      table.increments('id')
      table
        .integer('user_id', 10)
        .unsigned()
        .references('id')
        .inTable('user')
        .notNullable()
        .onDelete('CASCADE')
      table
        .integer('game_id', 10)
        .unsigned()
        .references('id')
        .inTable('game')
        .notNullable()
        .onDelete('CASCADE')
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
      table.timestamp('deleted_at').defaultTo(null)
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('language')
    .dropTable('book')
    .dropTable('game')
    .dropTable('guess')
    .dropTable('user')
    .dropTable('user_to_game')
}
