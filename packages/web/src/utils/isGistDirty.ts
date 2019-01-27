export const isGistDirty = (
  files: Array<{
    filename: string
    content: string | null
  }>,
  changes
) => {
  if (changes === null || changes === undefined) {
    return false
  } else {
    const dirty = files.some(
      file => changes[file.filename] && changes[file.filename] !== file.content
    )
    if (dirty) {
      return true
    }
    return false
  }
}

export const isFileDirty = (
  changes: { [filename: string]: string },
  file: { filename: string; content: string }
) => {
  return changes !== null &&
    changes[file.filename] &&
    changes[file.filename] !== file.content
    ? true
    : false
}
