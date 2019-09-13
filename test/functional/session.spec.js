const { test, trait } = use('Test/Suite')('Session')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

trait('Test/ApiClient')

test('it should return JWT when session created', async ({ assert, client }) => {

  const sessionPayload = {
    email: 'vicainelli@gmail.com',
    password: '123456'
  }

  const user = await Factory
    .model('App/Models/User')
    .create(sessionPayload)

  const response = await client
    .post('/sessions')
    .send(sessionPayload)
    .end()

    response.assertStatus(200)
    assert.exists(response.body.token)
})
