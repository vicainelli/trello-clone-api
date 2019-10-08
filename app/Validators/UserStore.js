'use strict'

class UserStore {
  get rules () {
    return {
      name: 'required|string',
      username: 'required|string',
      email: 'required|string'
    }
  }

  get messages() {
    return {
      required: '{{ field }} is required',
    }
  }

  get validateAll() {
    return true
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).json(errorMessages)
  }
}

module.exports = UserStore
