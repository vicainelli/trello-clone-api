'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/sessions', 'SessionController.store')

Route.resource('users', 'UserController')
  .apiOnly()
  .validator(new Map([
    [['users.store'], ['UserStore']],
    // [['boards.update'], ['UpdateBoard']]
  ]))
  .middleware(new Map([
    [['update'], ['auth']]
  ]))

Route.resource('boards', 'BoardController')
  .apiOnly()
  .validator(new Map([
    [['boards.store'], ['CreateBoard']],
    [['boards.update'], ['UpdateBoard']]
  ]))
  .middleware(new Map([
    [['store', 'update'], ['auth']]
  ]))


Route.resource('cards', 'CardController')
  .apiOnly()
  // .validator(new Map([
  //   [['boards.store'], ['CreateBoard']],
  //   [['boards.update'], ['UpdateBoard']]
  // ]))
  .middleware(new Map([
    [['store', 'update'], ['auth']]
  ]))

  Route.get('/me/boards', 'MeController.boards').middleware(['auth'])