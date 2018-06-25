import server from '../../server'
import { AddressInfo } from 'net'

// TODO NEXT: refactor this file to work with new `startServer` API
// and inject env variables, options
export const setup = async () => {
  const app = await server()
  const { port } = app.address() as AddressInfo
  process.env.TEST_HOST = `http://127.0.0.1:${port}`
}
