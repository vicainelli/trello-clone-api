const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Board Update')

trait('Test/ApiClient')
trait('Auth/Client')

test('a user can update a board owned', async ({ assert, client }) => {

  const user = await Factory.model('App/Models/User').create()
  const board = await Factory.model('App/Models/Board').make()

  await user.boards().save(board)

  const data = {
    title: 'this is my new title'
  }

  const response = await client
    .put(`/boards/${board.id}`)
    .loginVia(user, 'jwt')
    .send(data)
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    id: board.id,
    title: data.title
  })
})

test('cannot update board if not the author', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()
  const otherUser = await Factory.model('App/Models/User').create()
  const board = await Factory.model('App/Models/Board').make()

  await otherUser.boards().save(board)

  const data = {
    title: 'This is my new title'
  }

  const response = await client
    .put(`/boards/${board.id}`)
    .loginVia(user, 'jwt')
    .send(data)
    .end()

  response.assertStatus(401)

  const _board = await use('App/Models/Board').find(board.id)

  // check if the title really didn't change
  assert.notEqual(_board.title, data.title)
})