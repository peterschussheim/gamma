// tslint:disable:max-line-length

// export interface IMonacoModel {}

// export interface IModelCache {
//   // [filename: string]:
// }
export interface Editor {}

export interface CodeEditorProps {
  gist: Gist
  gistId: string
  currentFile: string
  onChange: (code: string, moduleShortid?: string) => void
  onInitialized: (editor: Editor) => void
  onModuleChange: (moduleId: string) => void
  onNpmDependencyAdded?: (name: string) => void
  onSave?: (code: string) => void
  height?: string
  width?: string
  hideNavigation?: boolean
  dependencies?: {
    [name: string]: {
      version: string
    }
  }
  highlightedLines?: number[]
  readOnly?: boolean
  receivingCode?: boolean
  onCodeReceived?: () => void
  onSelectionChanged: (d: { selection: any; moduleShortid: string }) => void
}

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

export type EditorDidMount = (
  editorInstance: monaco.editor.ICodeEditor,
  monacoInstance: MonacoEditorNS
) => void

export type ChangeHandler = (
  value: string,
  event: monaco.editor.IModelContentChangedEvent
) => void
