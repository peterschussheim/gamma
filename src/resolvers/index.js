/* @flow */
const debug = require('debug')('resolvers:merge')

import { mergeResolvers } from 'merge-graphql-schemas'
import clientResolver from './clientResolver'
import productResolver from './productResolver'
import userResolver from './userResolver'

/**
 * 1) import each resolver file
 * 2) Update array `resolvers` with added/removed resolvers from step 1
 */
const resolvers = [clientResolver, productResolver, userResolver]

export default mergeResolvers(resolvers)
