'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Board = use('App/Models/Board')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with boards
 */
class BoardController {
  /**
   * Show a list of all boards.
   * GET boards
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response }) {
    const boards = await Board.all()
    return response.ok(boards)
  }

  /**
   * Render a form to be used for creating a new board.
   * GET boards/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new board.
   * POST boards
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {

    const user = await auth.getUser()

    const board = await Board.create({
      ...request.only(['title', 'description']),
      user_id: user.id
    })

    return response.created(board)
  }

  /**
   * Display a single board.
   * GET boards/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const board = await Board.findOrFail(params.id)

    return response.ok(board)
  }

  /**
   * Render a form to update an existing board.
   * GET boards/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update board details.
   * PUT or PATCH boards/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a board with id.
   * DELETE boards/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = BoardController
