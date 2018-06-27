import startServer from '../../server'

const PORT = parseInt(process.env.PORT, 10) || 4000
const { PRISMA_ENDPOINT, PRISMA_SECRET } = process.env

const prismaOptions = {
  PRISMA_ENDPOINT,
  PRISMA_SECRET,
  PRISMA_DEBUG: false
}

export const setup = async () => {
  process.env.TEST_HOST = `http://127.0.0.1:${PORT}/graphql`
  return startServer(prismaOptions)
}
