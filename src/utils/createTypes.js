// /* @flow */
// const { generateNamespace } = require('@gql2ts/from-schema')
// const { DEFAULT_OPTIONS: flowDefaults } = require('gql2ts')
// const fs = require('fs')
// const { generateSchema } = require('./generateSchema')
// const myNamespace = generateNamespace(
//   'Gamma',
//   generateSchema(),
//   { ingnoreTypeNameDeclaration: true },
//   {
//     ...flowDefaults,
//     interfaceBuilder: (name, body) => `export type ${name} = ${body}`,
//     typeBuilder: (name, body) => `export type ${name} = ${body}`,
//     generateNamespace: (namespaceName, interfaces) => interfaces,
//     generateInterfaceName: name => `${name}`
//   }
// )

// fs.writeFileSync('./src/generated/flowTypes.js', myNamespace)
