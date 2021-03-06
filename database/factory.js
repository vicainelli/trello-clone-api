'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker, i, data = {}) => {
  return {
    username: faker.username(),
    name: faker.name(),
    email: faker.email(),
    password: faker.password(),
    ...data
  }
})

Factory.blueprint('App/Models/Board', faker => {
  return {
    title: faker.sentence(),
    description: faker.sentence()
  }
})

Factory.blueprint('App/Models/Card', faker => {
  return {
    title: faker.sentence(),
    description: faker.sentence()
  }
})
