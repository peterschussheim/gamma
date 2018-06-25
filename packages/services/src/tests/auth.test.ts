import * as Prisma from '../generated/prisma'
import * as API from '../generated/prisma'
import { setup } from '../utils/testing/createTestServer'
import * as jest from 'jest'
// const { PRISMA_DEBUG, PRISMA_ENDPOINT, PRISMA_SECRET } = process.env
import * as faker from 'faker'

import { MockClient } from '../utils/testing/mockClient'

let conn
faker.seed(Date.now() + 2)
const email = faker.internet.email()
const password = faker.internet.password()

let userId: string

beforeAll(async () => {
  conn = await createTestServer()
  const user = await User.create({
    email,
    password,
    confirviewerd: true
  }).save()
  userId = user.id
})

afterAll(async () => {
  conn.close()
})

describe('logout', () => {
  test('multiple sessions', async () => {
    // computer 1
    const sess1 = new MockClient(process.env.TEST_HOST as string)
    // computer 2
    const sess2 = new MockClient(process.env.TEST_HOST as string)

    await sess1.login(email, password)
    await sess2.login(email, password)
    expect(await sess1.viewer()).toEqual(await sess2.viewer())
    await sess1.logout()
    expect(await sess1.viewer()).toEqual(await sess2.viewer())
  })

  test('single session', async () => {
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
})
