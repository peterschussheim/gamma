// tslint:disable:max-line-length

export type Monaco = typeof monaco
export type MonacoCodeEditor = monaco.editor.ICodeEditor

export type EditorDidMount = (
  editorInstance: MonacoCodeEditor,
  monacoInstance: Monaco
) => void

export type ChangeHandler = (
  value: string,
  event: monaco.editor.IModelContentChangedEvent
) => void

export interface CodeEditorProps {
  gist: Gist
  gistId: string
  currentFile: string
  onValueChange: (code: string, moduleShortid?: string) => void
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
  onSelectionChanged: (d: { selection: any; moduleShortid: string }) => void
}

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
