'use strict'

const { test, trait } = use('Test/Suite')('Create Board')

trait('Test/ApiClient')
trait('Auth/Client')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const data = {
  title: 'Stop Call Squad',
  description: 'This is an example of board description'
}

test('it should create a board if has a valid data', async ({ assert, client }) => {

  const user = await Factory.model('App/Models/User').create()

  const response = await client
  .post('/boards')
  .loginVia(user, 'jwt')
  .send(data)
  .end()

  response.assertStatus(201)
  response.assertJSONSubset({
    title: data.title,
    description: data.description,
    user_id: user.id
  })
})


test('can\'t create a board if not authendicated', async ({ assert, client }) => {

  const response = await client
  .post('/boards')
  .send(data)
  .end()

  console.log('error', response.error)

  response.assertStatus(401)
})