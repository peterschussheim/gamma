/**
 * used when creating elements by mapping over an array.
 *
 * @param initial Data either from apollo or new gist creation data
 * @param maybeChangedFile
 */
export const isFileDirty = (
  initial: Array<{
    filename: string
    content: string
  }>,
  maybeChangedFile: { filename: string; content: string }
) => {
  if (maybeChangedFile != null && initial.length > 0) {
    // we have changes
    // check changes array for originalFile.filename and if found,
    const original = initial.find(f => f.filename === maybeChangedFile.filename)
    if (original) {
      // found a possible match, return result of comparison on their content
      return maybeChangedFile.content !== original.content
    }
  }

  return false
}
