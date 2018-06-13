import { Context } from '../gamma'
import { WrapQuery } from 'graphql-tools'
import { SelectionSetNode, Kind } from 'graphql'
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
  },
  city: {
    subscribe: async (parent, args, ctx: Context, info) => {
      return ctx.db.subscription.city({}, info, {
        // TODO reenable when https://github.com/apollographql/graphql-tools/issues/780 is solved
        transforms: [
          new WrapQuery(
            ['city'],
            (subtree: SelectionSetNode) => ({
              kind: Kind.FIELD,
              name: {
                kind: Kind.NAME,
                value: 'node'
              },
              selectionSet: subtree
            }),
            // result => result && result.node,
            result => {
              // TODO clean me up
              console.log({ result })
              return result && result.node
            }
          )
        ]
      })
    }
  }
}
