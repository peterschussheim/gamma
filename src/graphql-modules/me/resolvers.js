/* @flow */
import type { ResolverMap } from '../../flowTypes'
// $FlowFixMe
import * as graphql from 'graphql'

export const resolvers: ResolverMap = {
  Query: {
    me: () => 'me!'
  }
}
