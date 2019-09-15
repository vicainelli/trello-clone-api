'use strict'

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Get Boards')

trait('Test/ApiClient')
trait('Auth/Client')

test('can get all boards', async ({ assert, client }) => {

  const boards = await Factory.model('App/Models/Board').createMany(3)
  const response = await client.get('/boards').end()

  response.assertStatus(200)
  response.assertJSONSubset([
    { title: boards[0].title },
    { title: boards[1].title },
    { title: boards[2].title }
  ])

})