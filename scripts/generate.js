const faker = require('faker')

async function main() {
  var users = []

  const testUser = await insertUser(userData(), users)
  console.log('Initiating loading sequence:users')

  for (var i = 20; i >= 0; i--) {
    users.push({ ...generateUser() })
  }
  console.log('Done loading users')
  return users
}

async function insertUser(user, arr) {
  const newUser = { ...user }
  arr.push(newUser)
  return newUser
}

function generateUser() {
  return userData()
}

function userData() {
  return Object.assign({
    id: faker.random.uuid(),
    email: faker.internet.email(),
    created_at: new Date().toString(),
    name: faker.name.findName(),
    username: faker.internet.userName(),
    modified_at: null
  })
}

export default main
