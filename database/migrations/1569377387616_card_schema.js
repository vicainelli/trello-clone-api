'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CardSchema extends Schema {
  up () {
    this.create('cards', (table) => {
      table.increments()
      table.text('title').notNullable()
      table.text('description')
      table.integer('board_id').unsigned().references('id').inTable('boards')
      table.timestamps()
    })
  }

  down () {
    this.drop('cards')
  }
}

module.exports = CardSchema
