// /* @flow */
// const debug = require('debug')('resolvers:counter')

// import { ResolverMap } from '../../flowTypes'
// import * as graphql from 'graphql'

// export const resolvers: ResolverMap = {
//   Query: {
//     hello: (_, { name }) => `Hello ${name || 'World'}`
//   },
//   Counter: {
//     countStr: counter => `Current count: ${counter.count}`
//   },
//   Subscription: {
//     counter: {
//       subscribe: (parent, args, { pubsub }) => {
//         const channel = Math.random()
//           .toString(36)
//           .substring(2, 15) // random channel name
//         let count = 0
//         setInterval(
//           () => pubsub.publish(channel, { counter: { count: count++ } }),
//           2000
//         )
//         return pubsub.asyncIterator(channel)
//       }
//     }
//   }
// }
