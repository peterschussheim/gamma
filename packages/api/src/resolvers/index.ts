const debug = require('debug')('resolvers:merge')
debug('Merging resolvers')

import { extractFragmentReplacements } from 'prisma-binding'

import { Query } from './Query'
import { auth } from './Mutation/auth'
import { gist } from './Mutation/gist'
import { post } from './Mutation/post'
import { user } from './Mutation/user'
import { Subscription } from './Subscription'
import { Viewer } from './Viewer'
import { AuthPayload } from './AuthPayload'

export const resolvers = {
  Query,
  Mutation: {
    ...auth,
    ...gist,
    ...post,
    ...user
  },
  Subscription,
  Viewer,
  AuthPayload
}

export const fragmentReplacements = extractFragmentReplacements(resolvers)
