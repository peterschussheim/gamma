import { Context } from '../gamma'

export const Subscription = {
  counter: {
    subscribe: async (parent, args, ctx: Context, info) => {
      const channel = Math.random()
        .toString(36)
        .substring(2, 15)
      let count = 0
      setInterval(
        () => ctx.pubsub.publish(channel, { counter: { count: count++ } }),
        2000
      )
      return ctx.pubsub.asyncIterator(channel)
    }
  }
}
