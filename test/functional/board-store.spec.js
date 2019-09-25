'use strict'

const { test, trait } = use('Test/Suite')('Board Store')

trait('Test/ApiClient')
trait('Auth/Client')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

test('it should create a board if has a valid data', async ({ assert, client }) => {

  const user = await Factory.model('App/Models/User').create()
  const { title, description } = await Factory.model('App/Models/Board').make()

  const response = await client
  .post('/boards')
  .loginVia(user, 'jwt')
  .send({ title, description })
  .end()

  response.assertStatus(201)
  response.assertJSONSubset({
    title: title,
    description: description,
    user_id: user.id
  })
})


test('can\'t create a board if not authendicated', async ({ assert, client }) => {

  const { title, description } = await Factory.model('App/Models/Board').make()

  const response = await client
  .post('/boards')
  .send({ title, description })
  .end()

  response.assertStatus(401)
})

test('can\'t create a board if no title', async ({ assert, client }) => {

  const user = await Factory.model('App/Models/User').create()
  const { description } = await Factory.model('App/Models/Board').make()

  const response = await client
  .post('/boards')
  .loginVia(user, 'jwt')
  .send({ description })
  .end()

  response.assertStatus(400)
  response.assertJSONSubset([
    {
      message: 'title is required',
      field: 'title',
      validation: 'required'
    }
  ])
})

test('can\'t create a board if title and/or description are not a string', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const data = {
    title: 123,
    description: 123
  }

  const response = await client
  .post('/boards')
  .loginVia(user, 'jwt')
  .send(data)
  .end()

  response.assertStatus(400)
  response.assertJSONSubset([
    {
      message: 'title is not a valid string',
      field: 'title',
      validation: 'string'
    },
    {
      message: 'description is not a valid string',
      field: 'description',
      validation: 'string'
    }
  ])
})