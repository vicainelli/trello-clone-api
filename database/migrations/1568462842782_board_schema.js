'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BoardSchema extends Schema {
  up () {
    this.create('boards', (table) => {
      table.text('title').notNullable()
      table.text('description')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('boards')
  }
}

module.exports = BoardSchema
