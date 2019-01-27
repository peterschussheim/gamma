import { isEntryPoint } from './fileUtilities'
import { FileSystemEntry, Gist } from '../components/CodeEditor/types'

const getFolders = (path: string): string[] => {
  const pathSegments = path.split('/')
  if (pathSegments.length === 0) {
    return []
  }
  const result = []
  for (
    let pathIdx = 0;
    pathIdx < pathSegments.length - 1; // do not process the last element
    pathIdx++
  ) {
    result.push(pathSegments.slice(0, pathIdx + 1).join('/'))
  }
  return result
}

/**
 *
 * Given a 'Gist' object, transform `gist.files` into an array of
 * `FileSystemEntries`.  Essentially all this does is take each file
 * in a gist, and create a new object for the file with additional metadata
 * such as `gistId` and a handful of `state` metadata properties.
 */
// export const gistToEntryArray = (gist: Gist): Array<FileSystemEntry> => {
//   const fileSystem: Array<FileSystemEntry> = []
//   const foldersInFileSystem = new Set()
//   for (const filename of Object.keys(gist).sort()) {
//     for (const folder of getFolders(filename)) {
//       if (!foldersInFileSystem.has(folder)) {
//         fileSystem.push({
//           item: {
//             path: folder,
//             type: 'folder'
//           },
//           state: {}
//         })
//         foldersInFileSystem.add(folder)
//       }
//     }

//     const isEntry = isEntryPoint(filename)

//     fileSystem.push(
//       gist[filename].type === 'ASSET'
//         ? {
//             item: {
//               path: filename,
//               type: 'file',
//               uri: gist[filename].contents,
//               asset: true
//             },
//             state: {}
//           }
//         : {
//             item: {
//               path: filename,
//               type: 'file',
//               content: gist[filename].contents
//             },
//             state: {
//               isOpen: isEntry,
//               isSelected: isEntry,
//               isFocused: isEntry
//             }
//           }
//     )
//   }
//   return fileSystem
// }

/**
 *
 * Used to transform `Array<FileSystemEntry>` back into an object that our
 * graphQL endpoint will accept.
 *
 * Use to send an update/create payload to our gql server.
 */
// export const entryArrayToGist = (entryArray: Array<FileSystemEntry>) => {
//   const gist = {}
//   for (const { item } of entryArray) {
//     if (item.type === 'file') {

//         gist[item.path] = {
//           contents: item.content,
//           type: 'CODE'
//         }

//     }
//   }
//   return gist
// }
