import {
  TextFileEntry,
  Gist,
  FileSystemEntry
} from '../components/CodeEditor/types'
import {
  GetGistById_getGistById,
  UpdateGist_updateGist
} from '../__generated__/types'

export const INITIAL_DESCRIPTION: string = 'Change me!'
export const INITIAL_DEPENDENCIES = { react: { version: '16.3.1' } }
/**
 * accepts an object of objects containing dummy files for use when creating
 * a new gist and returns a new array matching `TextFileEntry` type.
 */
export const buildEntriesFromDefaultCode = (
  defaultCode: Partial<Gist>
): TextFileEntry[] => {
  const fileSystemArray = []
  for (const filename of Object.keys(defaultCode).sort()) {
    fileSystemArray.push({
      item: {
        gistId: '',
        path: filename,
        content: defaultCode[filename].contents,
        gistDescription: INITIAL_DESCRIPTION,
        type: 'file'
      },
      state: {}
    })
  }
  return fileSystemArray
}

export const buildEntriesFromGist = (
  gist: GetGistById_getGistById | UpdateGist_updateGist
): TextFileEntry[] => {
  const fileSystemArray = []
  // tslint:disable-next-line:max-line-length
  // if param `GetGistById` has a length of 0, we need to create data for a new gist
  if (gist && gist.files && gist.files.length > 0) {
    gist.files.forEach(file => {
      fileSystemArray.push({
        item: {
          path: file.filename,
          content: file.content,
          type: 'file'
        },
        state: {
          isOpen: false,
          isSelected: false,
          isFocused: false
        }
      })
    })
    return fileSystemArray
  } else {
    fileSystemArray.push({
      item: {
        gistId: '',
        path: 'README.md',
        content:
          // tslint:disable-next-line:max-line-length
          "# README\n\n## Getting Started\n\n- [ ] start entering text in this file\n- [ ] to proceed to create a new gist, click the 'New Gist' button above!\n",
        gistDescription: 'New gist, change me!',
        type: 'file'
      },
      state: {}
    })
    return fileSystemArray
  }
}
