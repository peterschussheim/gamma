import * as faker from 'faker'
import { Options } from 'graphql-yoga'

import * as Prisma from '../generated/prisma'
import * as API from '../generated/prisma'

import { setup } from '../utils/testing/createTestServer'
import { MockClient } from '../utils/testing/mockClient'

const PORT = parseInt(process.env.PORT, 10) || 4000
const options: Options = {
  port: PORT,
  cors: {
    credentials: true,
    origin:
      process.env.NODE_ENV === 'production' && !process.env.FORCE_DEV
        ? ['https://gamma.app', /gamma-(\w|-)+\.now\.sh/g, /gamma\.app/]
        : [/localhost/]
  },
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground'
}

faker.seed(Date.now() + 2)
const email = faker.internet.email()
const password = faker.internet.password()

let testUser, server

beforeAll(async () => {
  server = await setup()
  server.start(options)
})

afterAll(() => server.close())

beforeEach(async () => {
  const client = new MockClient(process.env.TEST_HOST as string)
  testUser = await client.signup(email, password)
})

test('new users can be created', async () => {
  expect(testUser.data.signup).toMatchObject({
    user: {
      id: expect.any(String)
    },
    token: expect.any(String)
  })
})

xtest('signup enforces unique email requirement', async () => {
  const client = new MockClient(process.env.TEST_HOST as string)
})

xtest('logout of all sessions for a given user', async () => {
  // Construct two unique clients (creates two sessions)
  const sess1 = new MockClient(process.env.TEST_HOST as string)
  const sess2 = new MockClient(process.env.TEST_HOST as string)

  //  Call login mutation in each session
  await sess1.login(email, password)
  await sess2.login(email, password)

  expect(await sess1.viewer()).toEqual(await sess2.viewer())

  // Logout of all sessions
  await sess1.logoutOfAllSessions()
  expect(await sess1.viewer()).toEqual(await sess2.viewer())
})

xtest('single session', async () => {
  const client = new MockClient(process.env.TEST_HOST as string)
  await client.login(email, password)
  const response = await client.viewer()
  expect(response.data).toEqual({
    viewer: {
      id: userId,
      email
    }
  })

  await client.logout()

  const response2 = await client.viewer()

  expect(response2.data.viewer).toBeNull()
})
