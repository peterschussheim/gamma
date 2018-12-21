import * as React from 'react'
import MonacoEditorComponent from './MonacoEditorComponent'
import { EditorContext } from './EditorContext'
const modelCache = {}

export default class CodeEditor extends React.Component<CodeEditorProps, {}> {
  static contextType = EditorContext

  editorWillMount = (monaco: MonacoEditorNS) => {
    // console.log('editorWillMount', monaco.editor)
  }

  editorDidMount: EditorDidMount = (editor, monaco) => {
    console.log('editorInstance', editor)
    console.log('monacoInstance', monaco)
    editor.focus()
    const currentModel = monaco.editor.getModels()
    console.log(currentModel)
    // monaco.editor.setModelLanguage(currentModel, 'css')
  }

  render() {
    const { handleValueChange } = this.props
    const { currentFile, currentValue, onSelectFile, onOpenPath } = this.context

    return (
      <MonacoEditorComponent
        onValueChange={handleValueChange}
        editorWillMount={this.editorWillMount}
        editorDidMount={this.editorDidMount}
        onOpenPath={() => onOpenPath(currentFile)}
        // value={currentValue}
        language="css"
      />
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
