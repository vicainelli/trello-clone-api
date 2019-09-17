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

Route.post('/boards', 'BoardController.store')
  .validator('CreateBoard')
  .middleware(['auth'])

  Route.get('/boards', 'BoardController.index')
  Route.get('/boards/:id', 'BoardController.show')
  Route.put('/boards/:id', 'BoardController.update')
  .validator('UpdateBoard')
  .middleware(['auth'])

  Route.get('/me/boards', 'MeController.boards').middleware(['auth'])