// tslint:disable:no-shadowed-variable

import { FileSystemEntry } from './components/CodeEditor/types'
import {
  isInsideFolder,
  changeParentPath,
  getParentPath,
  getUniquePath
} from './utils/fileUtilities'

function renameEntry(
  entries: FileSystemEntry[],
  oldPath: string,
  newPath: string
) {
  const entry = entries.find(e => e.item.path === oldPath)

  if (!entry) {
    return entries
  }

  const renamed = updateEntry(entry, {
    item: {
      path: newPath
    }
  })

  // @ts-ignore
  delete renamed.state.isCreating

  const next: FileSystemEntry[] = entries.map(e => {
    if (e.item.path === entry.item.path) {
      return renamed
    }

    if (
      renamed.item.type === 'folder' &&
      isInsideFolder(e.item.path, entry.item.path)
    ) {
      return updateEntry(e, {
        item: {
          path: changeParentPath(
            e.item.path,
            entry.item.path,
            renamed.item.path
          )
        }
      })
    }

    return e
  })

  const parents = recursivelyCreateParents(next, renamed.item.path, true)

  return [...next, ...parents]
}
function updateEntry<T extends FileSystemEntry>(
  entry: T,
  updates: { item?: Partial<T['item']>; state?: Partial<T['state']> }
): T {
  return {
    ...(entry as any),
    item: updates.item
      ? { ...entry.item, ...(updates as any).item }
      : entry.item,
    state: updates.state
      ? { ...entry.state, ...(updates as any).state }
      : entry.state
  }
}

function selectEntry(
  entries: FileSystemEntry[],
  path: string
): FileSystemEntry[] {
  return entries.map(e =>
    e.item.path === path
      ? updateEntry(e, {
          state: {
            isSelected: !e.state.isSelected
          }
        })
      : e
  )
}

function recursivelyCreateParents(
  entries: FileSystemEntry[],
  path: string,
  expand?: boolean
): FileSystemEntry[] {
  const next: FileSystemEntry[] = []

  let parent = getParentPath(path)

  while (parent) {
    const parentEntry = entries.find(e => e.item.path === parent)

    if (parentEntry) {
      if (parentEntry.item.type !== 'folder') {
        throw new Error('File path must be inside a folder')
      }
      break
    } else {
      next.push({
        item: {
          type: 'folder',
          path: parent
        },
        state: {
          isExpanded: !!expand
        }
      })

      parent = getParentPath(parent)
    }
  }

  return next
}

function openEntry(
  entries: FileSystemEntry[],
  path: string,
  focus: boolean = false
): FileSystemEntry[] {
  const entry = entries.find(e => e.item.path === path)
  const isFolder = entry ? entry.item.type === 'folder' : false

  return entries.map(e => {
    if (e.item.path === path) {
      // Found the file/folder we're trying to select
      if (e.item.type === 'file') {
        if (e.state.isSelected && e.state.isFocused && e.state.isOpen) {
          // File is already selected, opened and focused
          // Nothing to do
          return e
        }

        // Select, open and focus the file
        return updateEntry(e, {
          state: {
            isSelected: true,
            isFocused: true,
            isOpen: true
          }
        })
      } else {
        // Select and toggle the expand for the directory
        return updateEntry(e, {
          state: {
            isSelected: true,

            isExpanded: focus ? e.state.isExpanded : !e.state.isExpanded
          }
        })
      }
    }

    // Not the file we're trying to select
    if (e.item.type === 'file') {
      if (e.state.isSelected || e.state.isFocused) {
        // Unselect and unfocus the file
        return updateEntry(e, {
          state: {
            isSelected: false,

            isFocused: isFolder ? e.state.isFocused : false
          }
        })
      }
    } else {
      if (e.state.isSelected) {
        // Unselect the folder

        return updateEntry(e, {
          state: {
            isSelected: false
          }
        })
      }
    }

    return e
  })
}

function closeEntry(entry: FileSystemEntry) {
  if (entry.item.type === 'file') {
    if (entry.state.isSelected || entry.state.isFocused || entry.state.isOpen) {
      // Unselect and unfocus the file
      return updateEntry(entry, {
        state: {
          isOpen: false,
          isSelected: false,
          isFocused: false
        }
      })
    }
  } else {
    if (entry.state.isSelected) {
      // Unselect the folder
      return updateEntry(entry, {
        state: {
          isSelected: false
        }
      })
    }
  }
  return entry
}

function createNewEntry(
  entries: FileSystemEntry[],
  type: 'file' | 'folder',
  at?: string | undefined
) {
  const e: FileSystemEntry =
    type === 'file'
      ? {
          item: {
            path: 'Untitled file.js',
            type: 'file',
            content: ''
          },
          state: {
            isCreating: true
          }
        }
      : {
          item: {
            path: 'Untitled folder',
            type: 'folder'
          },
          state: {
            isCreating: true
          }
        }

  let path = at

  if (typeof path !== 'string') {
    // Get the current folder if no path is specified
    // tslint:disable-next-line:no-shadowed-variable
    const entry = entries.find(e => e.state.isSelected === true)

    path = entry ? entry.item.path : undefined
  }

  const entry = createEntryAtPath(entries, path, e)

  const next = entries.map(e => {
    // Expand the parent folder
    if (
      e.item.type === 'folder' &&
      isInsideFolder(entry.item.path, e.item.path) &&
      !e.state.isExpanded
    ) {
      return updateEntry(e, {
        state: { isExpanded: true }
      })
    }

    return e
  })

  return [...next, entry]
}

function createEntryAtPath(
  entries: FileSystemEntry[],
  path: string | undefined,
  e: FileSystemEntry,
  suffix?: string
): FileSystemEntry {
  // Check if an entry exists for the path we want to create the entry at
  const entry = path ? entries.find(e => e.item.path === path) : null

  // If the entry is a folder, we create the new entry inside
  // Otherwise we create it inside the parent
  const parent = entry
    ? entry.item.type === 'folder'
      ? entry.item.path
      : getParentPath(entry.item.path)
    : null

  // @ts-ignore
  const name: string = e.item.path.split('/').pop()
  const item = updateEntry(e, {
    item: {
      path: getUniquePath(
        entries.map(e => e.item.path),
        parent ? `${parent}/${name}` : name,
        suffix
      )
    }
  })

  // @ts-ignore
  item.state = { isCreating: true }

  return item
}

function expandEntry(
  entries: FileSystemEntry[],
  path: string,
  expand: boolean = true
): FileSystemEntry[] {
  return entries.map(entry => {
    if (entry.item.path === path && entry.item.type === 'folder') {
      return updateEntry(entry, {
        state: {
          isExpanded: expand
        }
      })
    }

    return entry
  })
}

export {
  createEntryAtPath,
  createNewEntry,
  renameEntry,
  openEntry,
  updateEntry,
  selectEntry,
  closeEntry,
  expandEntry,
  recursivelyCreateParents
}
