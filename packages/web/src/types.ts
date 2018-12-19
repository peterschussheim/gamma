// tslint:disable:max-line-length

// export interface IMonacoModel {}

// export interface IModelCache {
//   // [filename: string]:
// }

export type CreateModel = (
  value: string,
  language?: string,
  uri?: monaco.Uri
) => monaco.editor.ITextModel

export type FindFilePath = (fileId: string) => string | null

export interface Gist {
  gistId: string
  description: string
  files?: File[] | null
  isPublic: boolean
}

export interface File {
  filename: string
  type: string
  language: string
  raw_url: string
  size: number
  truncated: boolean
  content: string
}

export type MonacoEditorNS = typeof monaco

export interface IEditorInstance {
  editor: monaco.editor.IStandaloneCodeEditor
}

export type EditorDidMount = (
  editorInstance: IEditorInstance,
  monacoInstance: MonacoEditorNS
) => void

export type ChangeHandler = (
  value: string,
  event: monaco.editor.IModelContentChangedEvent
) => void
