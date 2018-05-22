var faker = require('faker')

let createRecord = (knex, id) => {
  return knex('users').insert({
    id,
    email: faker.internet.email(),
    created_at: new Date().toString(),
    name: faker.name.findName(),
    username: faker.internet.userName(),
    modified_at: null
  })
}

exports.seed = (knex, Promise) => {
  return knex('users')
    .del()
    .then(() => {
      let records = []

      for (let i = 1; i < 10; i++) {
        records.push(createRecord(knex, i))
      }

      return Promise.all(records)
    })
}
