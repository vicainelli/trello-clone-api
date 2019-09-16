
const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Get User boards')

trait('Test/ApiClient')
trait('Auth/Client')

test('can get all the user boards', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()
  const otherUser = await Factory.model('App/Models/User').create();
  const boards = await Factory.model('App/Models/Board').makeMany(2)
  const otherBoards = await Factory.model('App/Models/Board').makeMany(2)

  await user.boards().saveMany(boards)
  await otherUser.boards().saveMany(otherBoards)

  const response = await client
    .get('/me/boards')
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200)

  assert.equal(response.body.length, 2);

  response.assertJSONSubset([
    { title: boards[0].title },
    { title: boards[1].title }
  ])
})