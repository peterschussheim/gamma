import { monaco } from './typings/monaco-editor'

export interface File {
  filename: string
  content: string
}

export interface Gist {
  id: string
  description: string
  files: Array<File>
}

export type SaveStatus =
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

export interface AppState {
  currentFilename: string | null
  currentBanner: BannerName | null
}

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
  [key: string]: { version: string }
}

export interface MonacoEditorProps {
  editorDidMount?: any
  onOpenPath: (path: string) => void
  onValueChange: (value: string) => void
  onSave?: (code: string) => void
  entries: Array<FileSystemEntry>
  gist: Gist
  path: string
  value: string
  dependencies: DependencyList
  annotations?: Array<Annotation>
  options?: monaco.editor.IEditorOptions
  modelOptions?: monaco.editor.ITextModelUpdateOptions
  height?: string | number
  width?: string | number
  absoluteHeight?: string | number
  absoluteWidth?: string | number
  highlightedLines?: Array<number>
  readOnly?: boolean
  autoFocus?: boolean
}

export type BannerName =
  | 'connected'
  | 'disconnected'
  | 'reconnect'
  | 'autosave-disabled'
