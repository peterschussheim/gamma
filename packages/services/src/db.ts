import { Prisma } from './generated/prisma'
import { fragmentReplacements } from './resolvers'
import { PrismaBindingOptions } from './gamma'

export default (options: PrismaBindingOptions) => {
  return new Prisma({
    fragmentReplacements,
    endpoint: options.PRISMA_ENDPOINT,
    secret: options.PRISMA_SECRET,
    debug: options.PRISMA_DEBUG ? true : false
  })
}
