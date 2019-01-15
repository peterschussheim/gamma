import * as monaco from '@peterschussheim/monaco-editor'
// tslint:disable:max-line-length
/**
 * - create a single editor instance via `monaco.editor.create({ ... , model: null })`
 * - create N model instances via `monaco.editor.createModel(...)`.
 * - switch tabs by calling `editor.setModel(modelInstance)`
 * - for each model, you can save its view state (cursor, scroll position, etc)
 *   via `editor.saveViewState()` and restore it via `editor.restoreViewState()`.
 */

export interface CreateEditorParameters {
  domElement: HTMLElement
  options?: monaco.editor.IEditorConstructionOptions
  override?: monaco.editor.IEditorOverrideServices
}

/**
 * create a single editor instance
 *
 * usage:
 *
 * // create a single instance of `monaco.editor`
 * const editor = createEditor(domEl, { model: null })
 *
 * // access directly this editor instance
 * editor.getEditor() // returns IStandaloneCodeEditor
 *
 * // dispose this instance
 * editor.dispose()
 */
export const createEditor = (editorParams: CreateEditorParameters) => {
  const { domElement, options, override } = editorParams

  const editor = monaco.editor.create(domElement, { model: null })

  function getEditor() {
    return editor
  }

  function dispose() {
    return editor.dispose()
  }

  return Object.freeze({
    getEditor,
    dispose
  })
}

export interface CreateModelArgs {
  value: string
  language?: string | undefined
  uri?: monaco.Uri | undefined
}

export const createModel = (
  editor: typeof monaco.editor,
  args: CreateModelArgs
): monaco.editor.ITextModel => {
  const { value, path } = args
  const model = editor.createModel(
    value,
    undefined,
    monaco.Uri.from({ path, scheme: 'file' })
  )
  return model
}

export const changeDocument = (
  editor: monaco.editor.IStandaloneCodeEditor,
  path: string,
  desiredModelId: string
) => {
  const currentState = editor.saveViewState()
  const currentModel = editor.getModel()
}
