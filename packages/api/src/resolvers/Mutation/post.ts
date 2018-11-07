const debug = require('debug')('mutation:post')
const util = require('util')
import { forwardTo } from 'prisma-binding'
import { getUserIdFromSession, AuthError } from '../../utils/getUserId'
import { Context } from '../../gamma'

export const post = {
  createPost: forwardTo('db')
}
