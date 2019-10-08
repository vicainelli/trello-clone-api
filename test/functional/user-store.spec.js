'use strict'

const { trait, test } = use('Test/Suite')('User Store')

trait('Test/ApiClient')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

test('it should create an user with valida data', async ({ client, assert }) => {
  const user = await Factory.model('App/Models/User').make()

  const response =  await client
    .post('/users')
    .send({ ...user.toJSON() })
    .end()

  response.assertStatus(201)
  assert.equal(response.body.email, user.email )
})

test('it should not create an user without username', async ({ client, assert }) => {
  const user = await Factory.model('App/Models/User').make()

  const response =  await client
    .post('/users')
    .send({ name: user.name, email: user.email, password: user.password })
    .end()

  response.assertStatus(400)
  // TODO Assert respomse message
})