'use strict'

const { test, trait } = use('Test/Suite')('Card Store')

trait('Test/ApiClient')
trait('Auth/Client')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

test('it should create a card if has a valid data', async ({ client }) => {

  const user = await Factory.model('App/Models/User').create()
  const board = await Factory.model('App/Models/Board').create()

  const { title, description } = await Factory.model('App/Models/Card').make()

  const response = await client
    .post('/cards')
    .loginVia(user, 'jwt')
    .send({ title, description, board_id: board.id})
    .end()

  response.assertStatus(201)
  response.assertJSONSubset({
    title: title,
    description: description,
  })
})

