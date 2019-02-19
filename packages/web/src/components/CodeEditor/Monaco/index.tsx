// tslint:disable:max-line-length
import * as React from 'react'
import debounce from 'lodash/debounce'

import MonacoEditorComponent, { findModel } from './MonacoEditor'

import getSettings from '../../../utils/getEditorSettings'
// import prettierCode from '../../../utils/prettier'
import getRelativePath from '../../../utils/getRelativePath'
import getFileLanguage from '../../../utils/getFileLanguage'

import {
  FileSystemEntry,
  MonacoEditorProps,
  DependencyList,
  Annotation,
  Gist
} from '../types'
import { monaco } from '../../../typings/monaco-editor'

// Store editor states such as cursor position,
// selection and scroll position for each model
const editorStates = new Map<
  string,
  monaco.editor.ICodeEditorViewState | undefined | null
>()

// Store details about typings we have requested and loaded
const requestedTypings = new Map<string, string>()
const extraLibs = new Map<
  string,
  { js: monaco.IDisposable; ts: monaco.IDisposable }
>()

class MonacoEditor extends React.Component<MonacoEditorProps> {
  static defaultProps: Partial<MonacoEditorProps> = {
    width: '100%',
    height: '50%'
  }

  static removePath(path: string) {
    editorStates.delete(path)
    const model = findModel(path)

    // tslint:disable-next-line:no-unused-expression
    model && model.dispose()
  }

  static renamePath(oldPath: string, newPath: string) {
    const selection = editorStates.get(oldPath)

    editorStates.delete(oldPath)
    editorStates.set(newPath, selection)

    this.removePath(oldPath)
  }

  editor!: monaco.editor.IStandaloneCodeEditor
  monaco!: typeof monaco
  sizeProbeInterval?: NodeJS.Timeout
  entries: FileSystemEntry[]
  path: string
  options?: monaco.editor.IEditorOptions
  modelOptions?: monaco.editor.ITextModelUpdateOptions
  subscription: monaco.IDisposable | undefined
  typingsWorker: Worker | undefined
  linterWorker: any
  hoverProviderJS: monaco.IDisposable | undefined
  hoverProviderTS: monaco.IDisposable | undefined
  completionProviderJS: monaco.IDisposable | undefined
  completionProviderTS: monaco.IDisposable | undefined

  constructor(props: MonacoEditorProps) {
    super(props)
    this.entries = props.entries
    this.path = props.path
    this.options = props.options
    this.modelOptions = props.modelOptions
  }

  componentDidMount() {
    // this.linterWorker = new Worker('../../../workers/linter.worker')
    // this.linterWorker &&
    //   this.linterWorker.addEventListener('message', ({ data }: any) =>
    //     // this.addTypings(data)
    //     console.log('linterWorker: ', data)
    //   )

    // this.typingsWorker = new Worker('../../../workers/typings.worker', {
    //   type: 'module'
    // })
    // this.typingsWorker &&
    //   this.typingsWorker.addEventListener('message', ({ data }: any) =>
    //     this.addTypings(data)
    //   )

    const {
      path,
      value,
      autoFocus,
      annotations,
      dependencies,
      ...rest
    } = this.props
    const editor = this.editor

    this.subscription = editor.onDidChangeModelContent(() => {
      const model = editor.getModel()

      if (model) {
        // tslint:disable-next-line:no-shadowed-variable
        const value = model.getValue()

        if (value !== this.props.value) {
          // Notify parent component the value changed
          this.props.onValueChange(value)
        }
      }
    })
    // editor.setSelection(options.selection);
    // editor.revealLine(options.selection.startLineNumber);

    this.openFile(path, value, autoFocus)

    this.updateMarkers(annotations)
    this.fetchTypings(dependencies)

    // tslint:disable-next-line:no-unused-expression
    this.props.entries &&
      this.props.entries.forEach(({ item }) => {
        if (
          item.type === 'file' &&
          item.path !== path &&
          typeof item.content === 'string'
        ) {
          this.initializeFile(item.path, item.content)
        }
      })

    // TODO: integrate these two methods to fix `openReference` functionality
    // setCurrentModule = (moduleId: string) => {
    //   this.closeFuzzySearch();

    //   const module = this.sandbox.modules.find(m => m.id === moduleId);
    //   if (module) {
    //     if (this.props.onModuleChange) {
    //       this.props.onModuleChange(moduleId);
    //     }
    //   }
    // }

    // openReference = model => {
    //   const foundModuleId = Object.keys(modelCache).find(
    //     mId => modelCache[mId].model === model
    //   );

    //   if (foundModuleId) {
    //     this.setCurrentModule(foundModuleId);
    //   }

    //   return Promise.resolve({
    //     getControl: () => this.editor,
    //   });
    // };

    const hoverProvider: monaco.languages.HoverProvider = {
      provideHover: (
        model: monaco.editor.ITextModel,
        position: monaco.Position
      ): any => {
        // Get the current line
        const line = model.getLineContent(position.lineNumber)
        const language = getFileLanguage(this.props.path)

        if (!language) {
          return
        }

        // Tokenize the line
        const tokens = this.monaco.editor.tokenize(line, language)[0]

        for (let i = 0, l = tokens.length; i < l; i++) {
          const current = tokens[i]
          const next = tokens[i + 1]
          const end = next ? next.offset : line.length

          if (
            (current.type === 'string.js' || current.type === 'string.ts') &&
            position.column > current.offset &&
            position.column < end
          ) {
            // Get the string for the token and strip quotes
            const s = line.slice(current.offset + 1, end - 1)

            const deps = this.getAllDependencies(this.props.dependencies)

            if (deps[s]) {
              // If the string refers to a dependency show the version
              return {
                range: new this.monaco.Range(
                  position.lineNumber,
                  current.offset + 1,
                  position.lineNumber,
                  end
                ),
                contents: [{ value: `version "${deps[s].version}"` }]
              }
            }
          }
        }
      }
    }

    // Completion provider to provide autocomplete for files and dependencies
    const completionProvider: monaco.languages.CompletionItemProvider = {
      triggerCharacters: ["'", '"', '.', '/'],
      provideCompletionItems: (
        model: monaco.editor.ITextModel,
        position: monaco.Position
      ): any => {
        // Get editor content before the pointer
        const textUntilPosition = model.getValueInRange({
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column
        })

        if (
          /(([\s|\n]+from\s+)|(\brequire\b\s*\())["|'][^'^"]*$/.test(
            textUntilPosition
          )
        ) {
          // It's probably a `import` statement or `require` call
          if (
            textUntilPosition.endsWith('.') ||
            textUntilPosition.endsWith('/')
          ) {
            // User is trying to import a file

            // Get the text after the quotes
            const match = textUntilPosition.match(/[^'"]+$/)

            const typed = match ? match[0] : ''
            // Map '.' to './' and '..' to '../' for better autocomplete
            const prefix = typed === '.' ? './' : typed === '..' ? '../' : typed

            const suggestions = this.props.entries
              .filter(
                ({ item }) => item.path !== this.props.path && !item.virtual
              )
              .map(({ item }) => {
                let file = getRelativePath(this.props.path, item.path)

                if (
                  // Only show files that match the prefix typed by user
                  file.startsWith(prefix) &&
                  // Only show files in the same directory as the prefix
                  file.split('/').length <= prefix.split('/').length
                ) {
                  // Remove typed text from the path so that don't insert it twice
                  file = file.slice(typed.length)

                  return {
                    // Show only the file name for label
                    label: file.split('/').pop(),
                    // Don't keep extension for JS files
                    insertText:
                      item.type === 'file'
                        ? file.replace(/\.(js|tsx?)$/, '')
                        : file,
                    kind:
                      item.type === 'folder'
                        ? this.monaco.languages.CompletionItemKind.Folder
                        : this.monaco.languages.CompletionItemKind.File
                  }
                }

                return null
              })
              .filter(Boolean)

            return { suggestions }
          } else {
            const deps = this.getAllDependencies(this.props.dependencies)

            return {
              // User is trying to import a dependency
              suggestions: Object.keys(deps).map(name => ({
                label: name,
                detail: deps[name].version,
                kind: this.monaco.languages.CompletionItemKind.Module
              }))
            }
          }
        }
      }
    }

    this.hoverProviderJS = this.monaco.languages.registerHoverProvider(
      'javascript',
      hoverProvider
    )
    this.hoverProviderTS = this.monaco.languages.registerHoverProvider(
      'typescript',
      hoverProvider
    )

    this.completionProviderJS = this.monaco.languages.registerCompletionItemProvider(
      'javascript',
      completionProvider
    )
    this.completionProviderTS = this.monaco.languages.registerCompletionItemProvider(
      'typescript',
      completionProvider
    )
  }

  // tslint:disable-next-line:no-shadowed-variable
  configureEditor = async (editor, monaco) => {
    this.editor = editor
    this.monaco = monaco

    const compilerOptions = {
      allowJs: true,
      allowSyntheticDefaultImports: true,
      alwaysStrict: true,
      esModuleInterop: true,
      forceConsistentCasingInFileNames: true,
      isolatedModules: true,
      jsx: this.monaco.languages.typescript.JsxEmit.React,
      module: this.monaco.languages.typescript.ModuleKind.ESNext,
      moduleResolution: this.monaco.languages.typescript.ModuleResolutionKind
        .NodeJs,
      noEmit: true,
      resolveJsonModule: true,
      strict: true,
      target: this.monaco.languages.typescript.ScriptTarget.ESNext,
      paths: {
        '*': ['*', '*.native', '*.ios']
      }
    }
    const documentFormattingProvider: monaco.languages.DocumentFormattingEditProvider = {
      // async provideDocumentFormattingEdits(model) {
      //   const text = await prettierCode(model.uri.path, model.getValue())
      //   return [
      //     {
      //       range: model.getFullModelRange(),
      //       text
      //     }
      //   ]
      // }
    }

    monaco.languages.registerDocumentFormattingEditProvider(
      'javascript',
      documentFormattingProvider
    )
    monaco.languages.registerDocumentFormattingEditProvider(
      'typescript',
      documentFormattingProvider
    )
    monaco.languages.registerDocumentFormattingEditProvider(
      'markdown',
      documentFormattingProvider
    )

    this.monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true)
    this.monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true)
    this.monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
      compilerOptions
    )
    this.monaco.languages.typescript.javascriptDefaults.setCompilerOptions(
      compilerOptions
    )

    window.addEventListener('resize', this.handleResize)
  }

  initializeFile = (path: string, value: string) => {
    // tslint:disable-next-line:no-shadowed-variable
    const monaco = this.monaco
    let model = findModel(path)
    // let modelNoLeadingSlash = findModel(path.replace(/^\//, ''))

    if (model !== undefined) {
      if (!model.isDisposed()) {
        // If a model exists, we need to update it's value
        // This is needed because the content for the file might have been modified externally
        // Use `pushEditOperations` instead of `setValue` or `applyEdits` to preserve undo stack
        // @ts-ignore
        model.pushEditOperations(
          [],
          [
            {
              range: model.getFullModelRange(),
              text: value
            }
          ]
        )
      }
    } else {
      model = monaco.editor.createModel(
        value,
        undefined,
        monaco.Uri.from({ scheme: 'file', path })
      )

      model.updateOptions({
        tabSize: 2,
        insertSpaces: true
      })
    }
  }

  openFile = async (path: string, value: string, focus?: boolean) => {
    this.initializeFile(path, value)

    const model = findModel(path)

    if (this.editor && model !== undefined) {
      this.editor.setModel(model)

      // Restore the editor state for the file
      const editorState = editorStates.get(path)
      if (editorState) {
        this.editor.restoreViewState(editorState)
      }

      if (focus) {
        this.editor.focus()
      }
    }
  }

  getAllDependencies = (dependencies: DependencyList): DependencyList => ({
    ...dependencies
  })

  fetchTypings = (dependencies: DependencyList) => {
    const deps = this.getAllDependencies(dependencies)

    Object.keys(deps).forEach(qualifier => {
      const { version } = deps[qualifier]

      // Parse the qualifier to get the package name
      // This will handle qualifiers with deep imports
      const match = /^(?:@([^/?]+)\/)?([^@/?]+)(?:\/([^@]+))?/.exec(qualifier)

      if (!match) {
        return
      }

      const name = (match[1] ? `@${match[1]}/` : '') + match[2]

      if (requestedTypings.get(name) === version) {
        // Typing already loaded
        return
      }

      requestedTypings.set(name, version)

      // tslint:disable-next-line:no-unused-expression
      this.typingsWorker &&
        this.typingsWorker.postMessage({
          name,
          version
        })
    })
  }

  addTypings = ({ typings }: { typings: { [key: string]: string } }) => {
    Object.keys(typings).forEach(path => {
      const extraLib = extraLibs.get(path)

      if (extraLib) {
        extraLib.js.dispose()
        extraLib.ts.dispose()
      }

      const uri = this.monaco.Uri.from({ scheme: 'file', path }).toString()

      const js = this.monaco.languages.typescript.javascriptDefaults.addExtraLib(
        typings[path],
        uri
      )
      const ts = this.monaco.languages.typescript.typescriptDefaults.addExtraLib(
        typings[path],
        uri
      )

      extraLibs.set(path, { js, ts })
    })
  }

  updateMarkers = (annotations: Annotation[]) =>
    this.monaco.editor.setModelMarkers(
      this.editor.getModel(),
      null,
      annotations
    )

  componentDidUpdate(prevProps: MonacoEditorProps) {
    const {
      path,
      entries,
      value,
      autoFocus,
      annotations,
      dependencies,
      ...rest
    } = this.props

    if (this.editor) {
      this.editor.updateOptions(rest)

      const model = this.editor.getModel()

      if (path !== prevProps.path) {
        // Save the editor state for the previous file so we can restore it when it's re-opened
        editorStates.set(prevProps.path, this.editor.saveViewState())

        this.openFile(path, value, autoFocus)
      } else if (model && value !== model.getValue()) {
        // @ts-ignore
        this.editor.executeEdits(null, [
          {
            range: model.getFullModelRange(),
            text: value
          }
        ])
      }
    }

    if (annotations !== prevProps.annotations) {
      this.updateMarkers(annotations)
    }

    if (dependencies !== prevProps.dependencies) {
      this.fetchTypings(dependencies)
    }

    // if (mode !== prevProps.mode) {
    //   this.toggleMode(mode);
    // }

    // if (theme !== prevProps.theme) {
    //   // Update the global editor theme
    //   // Monaco doesn't have a way to change theme locally
    //   monaco.editor.setTheme(theme);
    // }

    if (this.props.entries !== prevProps.entries) {
      // Update all changed entries for updated intellisense
      this.props.entries.forEach(({ item }) => {
        if (item.type === 'file' && item.path !== path) {
          const previous = prevProps.entries.find(
            e => e.item.path === item.path
          )

          // @ts-ignore
          if (previous && previous.item.content === item.content) {
            return
          }

          this.initializeFile(item.path, item.content)
        }
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)

    if (this.subscription) {
      this.subscription.dispose()
    }

    if (this.editor) {
      this.editor.dispose()
    }
    // this.linterWorker && this.linterWorker.terminate()
    // this.typingsWorker && this.typingsWorker.terminate()
  }

  changeOptions = (options: monaco.editor.IEditorOptions) => {
    this.options = options

    this.editor.updateOptions(this.getEditorOptions())
    this.forceUpdate()
  }

  getCode = () =>
    this.editor.getValue({
      lineEnding: '\n',
      preserveBOM: true
    })

  getEditorOptions = () => {
    const options = this.options
    const path = this.path

    return {
      ...getSettings(options),
      ariaLabel: path,
      readOnly: !!this.props.readOnly
    }
  }

  handleResize = debounce(() => this.editor.layout(), 100, {
    leading: true,
    trailing: true
  })

  render() {
    const options = this.getEditorOptions()

    return (
      <MonacoEditorComponent
        path={this.props.path}
        editorDidMount={this.configureEditor}
        onValueChange={this.props.onValueChange}
        options={options}
        getEditorOptions={this.getEditorOptions}
      />
    )
  }
}

export default MonacoEditor
