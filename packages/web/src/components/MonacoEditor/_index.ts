import * as React from 'react'
import MonacoEditorComponent from './MonacoEditorComponent'
import { EditorContext } from './EditorContext'
const modelCache = {}

export default class MonacoEditor extends React.Component {
  editor: any
  monaco: any
  constructor(props: any) {
    super(props)
  }
  static contextType = EditorContext

  configureEditor = async (editor: any, monaco: any) => {
    this.editor = editor
    this.monaco = monaco

    window.MonacoEditor = {
      editor: this.editor,
      monaco: this.monaco
    }

    requestAnimationFrame(() => {
      editor.onDidChangeModelContent(e => {
        this.handleChange()
      })
    })

    monaco.languages.typescript.typescriptDefaults.setMaximumWorkerIdleTime(-1)
    monaco.languages.typescript.javascriptDefaults.setMaximumWorkerIdleTime(-1)

    monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true)
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true)

    this.setCompilerOptions()

    const sandbox = this.sandbox
    const currentModule = this.currentModule

    this.initializeModules(sandbox.modules)
    await this.openNewModel(currentModule)

    window.addEventListener('resize', this.resizeEditor)
    this.sizeProbeInterval = setInterval(() => {
      this.resizeEditorInstantly()
    }, 3000)

    editor.addAction({
      id: 'fuzzy-search',
      label: 'Open Module',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_P],
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1.5,

      // Method that will be executed when the action is triggered.
      // @param editor The editor instance is passed in as a convinience
      run: () => {
        this.setState(
          {
            fuzzySearchEnabled: true
          },
          () => this.forceUpdate()
        )
      }
    })

    editor.onDidChangeCursorSelection(selectionChange => {
      // TODO: add another debounced action to send the current data. So we can
      // have the correct cursor pos no matter what
      const { onSelectionChanged, isLive } = this.props
      // Reason 3 is update by mouse or arrow keys
      if (isLive) {
        const lines = editor.getModel().getLinesContent() || []
        const data = {
          primary: getSelection(lines, selectionChange.selection),
          secondary: selectionChange.secondarySelections.map(s =>
            getSelection(lines, s)
          )
        }
        if (
          (selectionChange.reason === 3 ||
            /* alt + shift + arrow keys */ selectionChange.source ===
              'moveWordCommand' ||
            /* click inside a selection */ selectionChange.source === 'api') &&
          onSelectionChanged
        ) {
          this.onSelectionChangedDebounced.cancel()
          onSelectionChanged({
            selection: data,
            moduleShortid: this.currentModule.shortid
          })
        } else {
          // This is just on typing, we send a debounced selection update as a
          // safeguard to make sure we are in sync
          this.onSelectionChangedDebounced({
            selection: data,
            moduleShortid: this.currentModule.shortid
          })
        }
      }
    })

    // TODO remove this as soon as we solve the keybinding issues
    editor.addCommand(
      // eslint-disable-next-line
      this.monaco.KeyMod.CtrlCmd | this.monaco.KeyCode.KEY_S,
      () => {
        const { onSave } = this.props
        if (onSave) {
          onSave(this.getCode())
        }
      }
    )

    this.registerAutoCompletions()
  }

  editorWillMount = (monaco: any) => {
    // console.log('editorWillMount', monaco.editor)
  }

  editorDidMount = (editor: any, monaco: any) => {
    editor.focus()
    const currentModel = monaco.editor.getModels()
    // monaco.editor.setModelLanguage(currentModel, 'css')
  }

  setCompilerOptions = () => {
    const compilerDefaults = {
      jsxFactory: 'React.createElement',
      reactNamespace: 'React',
      jsx: this.monaco.languages.typescript.JsxEmit.React,
      target: this.monaco.languages.typescript.ScriptTarget.ES2016,
      allowNonTsExtensions: true,
      moduleResolution: this.monaco.languages.typescript.ModuleResolutionKind
        .NodeJs,
      module: this.monaco.languages.typescript.ModuleKind.ES2015,
      experimentalDecorators: true,
      noEmit: true,
      allowJs: true,
      typeRoots: ['node_modules/@types'],
      newLine: this.monaco.languages.typescript.NewLineKind.LineFeed
    }

    this.monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
      compilerDefaults
    )
    this.monaco.languages.typescript.javascriptDefaults.setCompilerOptions(
      compilerDefaults
    )

    this.monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false
    })
  }

  resizeEditor = () => {
    this.resizeEditorInstantly()
  }

  resizeEditorInstantly = () => {
    this.forceUpdate(() => {
      if (this.editor) {
        this.editor.layout()
      }
    })
  }

  render() {
    const { handleValueChange } = this.props
    const { currentFile, currentValue, onSelectFile, onOpenPath } = this.context

    return (
      <div>
        <MonacoEditorComponent editorDidMount={this.configureEditor} />
      </div>
    )
  }
}

// creatingModelMap = {}
// createModel = (file: File, files: Files[], directories) => {}

// disposeModel = (id: string) => {
//   if (modelCache[id]) {
//     try {
//       if (modelCache[id].model && !modelCache[id].model.isDisposed()) {
//         modelCache[id].model.dispose()
//       }
//       if (modelCache[id].lib && !modelCache[id].lib.isDisposed()) {
//         modelCache[id].lib.dispose()
//       }

//       delete modelCache[id]
//     } catch (e) {
//       console.error(e)
//     }
//   }
// }

// changeModel = (selectedTabNode, desiredModelId) => {
//   for (let i = 0; i < tabArea.childNodes.length; i++) {
//     let child = tabArea.childNodes[i]
//     if (/tab/.test(child.className)) {
//       child.className = 'tab'
//     }
//   }
//   selectedTabNode.className = 'tab active'

//   let currentState = editor.saveViewState()

//   let currentModel = editor.getModel()
//   if (currentModel === data.js.model) {
//     data.js.state = currentState
//   } else if (currentModel === data.css.model) {
//     data.css.state = currentState
//   } else if (currentModel === data.html.model) {
//     data.html.state = currentState
//   }

//   editor.setModel(data[desiredModelId].model)
//   editor.restoreViewState(data[desiredModelId].state)
//   editor.focus()
// }
