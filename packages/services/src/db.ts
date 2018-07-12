import { Prisma } from './generated/prisma'
import { fragmentReplacements } from './resolvers'
import { PrismaBindingOptions } from './gamma'

const { PRISMA_ENDPOINT, PRISMA_SECRET, PRISMA_DEBUG } = process.env

const prismaOptions = {
  PRISMA_ENDPOINT,
  PRISMA_SECRET,
  PRISMA_DEBUG
}

export const defaultPrismaOptions = {
  ...prismaOptions
}

/**
 * Returns a newly constructed `Prisma` instance which can access
 * the underlying database as needed.
 * @param options A config object which allows for easy environment config.
 * @returns `Prisma` Class
 */
export const initDatabase = (options: PrismaBindingOptions) => {
  const DEBUG = options.PRISMA_DEBUG ? true : false
  return new Prisma({
    fragmentReplacements,
    endpoint: options.PRISMA_ENDPOINT,
    secret: options.PRISMA_SECRET,
    debug: Boolean(DEBUG)
  })
}
