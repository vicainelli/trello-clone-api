'use strict'

class MeController {

  async boards({ auth, response }) {
    const user = await auth.getUser()

    const boards = await user.boards().fetch()

    return response.ok(boards.toJSON())
  }
}

module.exports = MeController
