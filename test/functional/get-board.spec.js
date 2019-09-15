'use strict'

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Get Board')

trait('Test/ApiClient')
trait('Auth/Client')

test('can get a board by id', async ({ assert, client }) => {

  const boards = await Factory.model('App/Models/Board').createMany(3)
  const board = boards[0]
  const response = await client.get(`/boards/${board.id}`).end()

  response.assertStatus(200)
  response.assertJSONSubset({ title: board.title, description: board.description })

})

test('status 404 if id do not exist', async ({ assert, client }) => {
  const response = await client.get('/boards/999').end()

  response.assertStatus(404)
})