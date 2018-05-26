/* @flow */
const debug = require('debug')('utils:generateSchema')

import * as path from 'path'
import { fileLoader, mergeTypes } from 'merge-graphql-schemas'

const typesArray = fileLoader(path.join(__dirname, '../'), {
  extensions: ['.graphql']
})
export const typeDefs = mergeTypes(typesArray)

/**
 * CURRENTLY NOT USED
 */
// import { importSchema } from 'graphql-import'
// import * as fs from 'fs'
// import { mergeSchemas, makeExecutableSchema } from 'graphql-tools'
// // $FlowFixMe
// import { GraphQLSchema } from 'graphql'

// export const generateSchema = () => {
//   const schemas = []
//   const folders = fs.readdirSync(path.join(__dirname, '../graphql-modules'))
//   folders.forEach(folder => {
//     const { resolvers } = require(`../graphql-modules/${folder}/resolvers`)
//     const typeDefs = importSchema(
//       path.join(__dirname, `../graphql-modules/${folder}/schema.graphql`)
//     )
//     schemas.push(makeExecutableSchema({ resolvers, typeDefs }))
//   })

//   return mergeSchemas({ schemas })
// }
