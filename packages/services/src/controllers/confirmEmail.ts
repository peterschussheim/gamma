const debug = require('debug')('api:controllers:confirmEmail')

export default ({ prisma, redis }) => async (req, res) => {
  const { id } = req.params
  const userId = await redis.get(id)
  if (userId) {
    await prisma.mutation.updateUser({
      where: { id: userId },
      data: { emailConfirmed: true }
    })
    await redis.del(id)
    res.send('ok')
  } else {
    res.send('invalid')
  }
}
