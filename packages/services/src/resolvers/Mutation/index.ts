import { auth } from './auth'
import { user } from './user'
import { file } from './file'

export default {
  ...auth,
  ...user,
  ...file
}
