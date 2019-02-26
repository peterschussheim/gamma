import { monaco } from '../../typings/monaco-editor'

export interface File {
  filename: string
  content: string
}

export interface Gist {
  /** gistId of null indicates user is creating a new gist and hasn't saved */
  gistId: string | null
  description: string
  files: File[]
}

export type SaveStatus =
  | 'no-changes'
  | 'changed'
  | 'saving-draft'
  | 'saved-draft'
  | 'publishing'
  | 'published'

export type SaveHistory = Array<{
  id: string
  savedAt: string
  isDraft?: boolean
}>

type RequiredGistFileAttributes = {
  contents: string
  type: 'ASSET' | 'CODE'
}

export type GistFiles = {
  [x: string]: RequiredGistFileAttributes
}

export type GistWorkspace = {
  code?: GistFiles
  created?: string
  dependencies?: {
    [key: string]: string
  }
  history?: SaveHistory
  isDraft?: boolean
}

export type TextFileEntry = Readonly<{
  item: {
    path: string
    type: 'file'
    content: string
    gistId?: string
    gistDescription?: string
    virtual?: true
  }
  state: {
    isOpen?: boolean
    isFocused?: boolean
    isSelected?: boolean
    isCreating?: boolean
    isExpanded?: false
  }
}>

export type FolderEntry = Readonly<{
  item: {
    path: string
    type: 'folder'
    virtual?: false
  }
  state: {
    isOpen?: boolean
    isFocused?: boolean
    isExpanded?: boolean
    isSelected?: boolean
    isCreating?: boolean
  }
}>

export type FileSystemEntry = TextFileEntry | FolderEntry

export type Error = {
  loc?: [number, number]
  line?: number
  column?: number
  message: string
}

export type Annotation = {
  startLineNumber: number
  endLineNumber: number
  startColumn: number
  endColumn: number
  message: string
  severity: number
  source: string
}

export interface DependencyList {
  [name: string]: { version: string }
}

export interface MonacoEditorProps {
  editorDidMount?: any
  onOpenPath: (path: string) => void
  onValueChange: (value: string) => void
  onSave?: (code: string) => void
  entries: FileSystemEntry[]
  path: string
  value: string
  dependencies?: DependencyList
  annotations?: Annotation[]
  options?: monaco.editor.IEditorOptions
  modelOptions?: monaco.editor.ITextModelUpdateOptions
  height?: string | number
  width?: string | number
  absoluteHeight?: string | number
  absoluteWidth?: string | number
  highlightedLines?: number[]
  readOnly?: boolean
  autoFocus?: boolean
}

export type BannerName =
  | 'connected'
  | 'disconnected'
  | 'reconnect'
  | 'autosave-disabled'
