import { Range, Severity, editor } from '../vendor'

export function decorate(editorInstance, range, previousDecorations = []) {
  return editorInstance.deltaDecorations(previousDecorations, [
    {
      range: new Range(...range),
      options: { inlineClassName: 'squiggly-error' }
    }
  ])
}
export function setMarkers(editorInstance, owner, range, message) {
  const [line = -1, column] = range
  const markers =
    line === -1
      ? []
      : [
          {
            startLineNumber: line,
            startColumn: column,
            endLineNumber: line,
            endColumn: column + 1,
            message,
            severity: Severity.Error
          }
        ]
  console.log(markers)
  editor.setModelMarkers(editorInstance.getModel(), owner, markers)
}
