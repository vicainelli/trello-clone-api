'use strict'

class UpdateBoard {
  get rules() {
    return {
      title: 'string',
      description: 'string'
    }
  }

  get messages() {
    return {
      string: '{{ field }} is not a valid string'
    }
  }

  get validateAll() {
    return true
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).json(errorMessages)
  }
}

module.exports = UpdateBoard
