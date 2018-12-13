// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'
// import 'monaco-editor/esm/vs/editor/editor.main'
// // import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands.js'
// // import 'monaco-editor/esm/vs/editor/contrib/hover/hover.js'
// // import 'monaco-editor/esm/vs/editor/contrib/folding/folding.js'
// // import 'monaco-editor/esm/vs/editor/standalone/browser/quickOpen/gotoLine.js'
// // eslint-disable-next-line max-len
// // import { ModelDecorationOptions } from 'monaco-editor/esm/vs/editor/common/model/textModel'

// // import 'monaco-editor/esm/vs/basic-languages/monaco.contribution'
// import { StaticServices } from 'monaco-editor/esm/vs/editor/standalone/browser/standaloneServices'
// import * as React from 'react'
// import debounce from 'lodash/debounce'

// import light from './themes/light'
// import dark from './themes/dark'
// // import './Editor.css'
// // StaticServices.prototype.findModel = function(editor, resource) {
// //   var model = null;
// //   if (resource !== null) model = monaco.editor.getModel(resource);
// //   if (model == null) {
// //     model = editor.getModel();
// //   }
// //   return model;
// // };

// // StaticServices.prototype.doOpenEditor = function(editor, input) {
// //   var model = this.findModel(editor, input.resource);
// //   //set editor to new model
// //   if (model) editor.setModel(model);

// //   if (!model) {
// //     if (input.resource) {
// //       var schema = input.resource.scheme;
// //       if (schema === Schemas.http || schema === Schemas.https) {
// //         // This is a fully qualified http or https URL
// //         windowOpenNoOpener(input.resource.toString());
// //         return editor;
// //       }
// //     }
// //     return null;
// //   }
// //   var selection = input.options.selection;
// //   if (selection) {
// //     if (
// //       typeof selection.endLineNumber === 'number' &&
// //       typeof selection.endColumn === 'number'
// //     ) {
// //       editor.setSelection(selection);
// //       editor.revealRangeInCenter(selection, 1 /* Immediate */);
// //     } else {
// //       var pos = {
// //         lineNumber: selection.startLineNumber,
// //         column: selection.startColumn,
// //       };
// //       editor.setPosition(pos);
// //       editor.revealPositionInCenter(pos, 1 /* Immediate */);
// //     }
// //   }
// //   return editor;
// // };

// // global.MonacoEnvironment = {
// //   getWorker(moduleId, label) {
// //     switch (label) {
// //       case 'json':
// //         return new Worker('monaco-editor/esm/vs/language/json/json.worker', {
// //           type: 'module'
// //         })
// //       case 'typescript':
// //       case 'javascript':
// //         return new Worker(
// //           'monaco-editor/esm/vs/language/typescript/ts.worker',
// //           {
// //             type: 'module'
// //           }
// //         )
// //       default:
// //         return new Worker('monaco-editor/esm/vs/editor/editor.worker', {
// //           type: 'module'
// //         })
// //     }
// //   }
// // }

// // monaco.editor.defineTheme('ayu-light', light)
// // monaco.editor.defineTheme('ayu-dark', dark)

// /**
//  * Disable typescript's diagnostics for JavaScript files.
//  * This suppresses errors when using Flow syntax.
//  * It's also unnecessary since we use ESLint for error checking.
//  */
// // console.log(monaco.languages.typescript)
// // monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
// //   noSemanticValidation: true,
// //   noSyntaxValidation: true
// // })

// /**
//  * Use prettier to format JavaScript code.
//  * This will replace the default formatter.
//  */
// monaco.languages.registerDocumentFormattingEditProvider('javascript', {
//   async provideDocumentFormattingEdits(model) {
//     const prettier = await import('prettier/standalone')
//     const babylon = await import('prettier/parser-babylon')
//     const text = prettier.format(model.getValue(), {
//       parser: 'babylon',
//       plugins: [babylon],
//       singleQuote: true
//     })

//     return [
//       {
//         range: model.getFullModelRange(),
//         text
//       }
//     ]
//   }
// })

// /**
//  * Sync all the models to the worker eagerly.
//  * This enables intelliSense for all files without needing an `addExtraLib` call.
// //  */
// // monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true)
// // monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true)

// /**
//  * Configure the typescript compiler to detect JSX and load type definitions
//  */
// const compilerOptions = {
//   allowJs: true,
//   allowSyntheticDefaultImports: true,
//   alwaysStrict: true,
//   jsx: 'React',
//   jsxFactory: 'React.createElement'
// }

// // monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
// //   compilerOptions
// // )
// // monaco.languages.typescript.javascriptDefaults.setCompilerOptions(
// //   compilerOptions
// // )

// // type Props = {
// //   files: { [path: string]: string },
// //   path: string,
// //   value: string,
// //   onOpenPath: (path: string) => mixed,
// //   onValueChange: (value: string) => mixed,
// //   lineNumbers?: 'on' | 'off',
// //   wordWrap: 'off' | 'on' | 'wordWrapColumn' | 'bounded',
// //   scrollBeyondLastLine?: boolean,
// //   minimap?: {
// //     enabled?: boolean,
// //     maxColumn?: number,
// //     renderCharacters?: boolean,
// //     showSlider?: 'always' | 'mouseover',
// //     side?: 'right' | 'left',
// //   },
// //   theme: 'ayu-light' | 'ayu-dark',
// // };

// // Store editor states such as cursor position, selection and scroll position for each model
// const editorStates = new Map()

// // Store details about typings we have loaded
// const extraLibs = new Map()
// console.log(StaticServices)
// const codeEditorService = StaticServices.codeEditorService.get()

// class MonacoEditor extends React.Component {
//   static defaultProps = {
//     lineNumbers: 'on',
//     wordWrap: 'on',
//     scrollBeyondLastLine: false,
//     minimap: {
//       enabled: false
//     },
//     theme: 'ayu-light'
//   }

//   static removePath(path) {
//     // Remove editor states
//     editorStates.delete(path)

//     // Remove associated models
//     const model = monaco.editor
//       .getModels()
//       .find(model => model.uri.path === path)

//     model && model.dispose()
//   }

//   static renamePath(oldPath, newPath) {
//     const selection = editorStates.get(oldPath)

//     editorStates.delete(oldPath)
//     editorStates.set(newPath, selection)

//     this.removePath(oldPath)
//   }
//   constructor(props) {
//     super(props)
//     this.containerElement = undefined
//     this.iframe = undefined
//     this.__current_value = props.value
//   }

//   componentDidMount() {
//     // Intialize the linter
//     this.linterWorker = new Worker('./workers/eslint.worker', {
//       type: 'module'
//     })
//     this.linterWorker.addEventListener('message', ({ data }) =>
//       this.updateMarkers(data)
//     )

//     // Intialize the type definitions worker
//     this.typingsWorker = new Worker('./workers/typings.worker', {
//       type: 'module'
//     })
//     this.typingsWorker.addEventListener('message', ({ data }) =>
//       this.addTypings(data)
//     )

//     // Fetch some definitions
//     const dependencies = {
//       expo: '29.0.0',
//       react: '16.3.1',
//       'react-native': '0.55.4'
//     }

//     Object.keys(dependencies).forEach(name =>
//       this.typingsWorker.postMessage({
//         name,
//         version: dependencies[name]
//       })
//     )

//     const { path, value, ...rest } = this.props

//     codeEditorService.openCodeEditor = async (
//       { resource, options },
//       editor
//     ) => {
//       await this.props.onOpenPath(resource.path)

//       editor.setSelection(options.selection)
//       editor.revealLine(options.selection.startLineNumber)

//       return {
//         getControl: () => editor
//       }
//     }

//     this.editor = monaco.editor.create(
//       this.containerElement,
//       rest,
//       codeEditorService
//     )
//     this.subscription = this.editor.onDidChangeModelContent(() => {
//       const value = this.editor.getModel().getValue()
//       if (value !== this.props.value) {
//         this.props.onValueChange(value)
//       }
//     })

//     this.openFile(path, value)
//     Object.keys(this.props.files).forEach(file => {
//       console.log(file)
//       if (
//         file.type === 'file' &&
//         file.path !== path &&
//         typeof file.content === 'string'
//       ) {
//         this.initializeFile(file.path, file.content)
//       }
//     })

//     this.iframe.contentWindow.addEventListener('resize', this.handleResize)
//   }

//   componentDidUpdate(prevProps) {
//     const { path, value, ...rest } = this.props

//     this.editor.updateOptions(rest)

//     if (path !== prevProps.path) {
//       editorStates.set(prevProps.path, this.editor.saveViewState())

//       this.openFile(path, value)
//     } else if (value !== this.editor.getModel().getValue()) {
//       const model = this.editor.getModel()

//       if (value !== model.getValue()) {
//         model.pushEditOperations(
//           [],
//           [
//             {
//               range: model.getFullModelRange(),
//               text: value
//             }
//           ]
//         )
//       }
//     }
//   }

//   componentWillUnmount() {
//     this.linterWorker && this.linterWorker.terminate()
//     this.typingsWorker && this.typingsWorker.terminate()
//     this.subscription && this.subscription.dispose()
//     this.editor && this.editor.dispose()
//     this.iframe &&
//       this.iframe.contentWindow.removeEventListener('resize', this.handleResize)
//   }

//   clearSelection() {
//     const selection = this.editor.getSelection()

//     this.editor.setSelection(
//       new monaco.Selection(
//         selection.startLineNumber,
//         selection.startColumn,
//         selection.startLineNumber,
//         selection.startColumn
//       )
//     )
//   }

//   initializeFile = (path, value) => {
//     let model = monaco.editor.getModels().find(model => model.uri.path === path)

//     if (model && !model.isDisposed()) {
//       console.log(`model ${model} exists`)

//       model.pushEditOperations(
//         [],
//         [
//           {
//             range: model.getFullModelRange(),
//             text: value
//           }
//         ]
//       )
//     } else {
//       console.log(`model ${model} DOES NOT exist`)
//       // var modelUri = monaco.Uri.parse(path);
//       // console.log(modelUri);
//       model = monaco.editor.createModel(
//         value,
//         'javascript',
//         new monaco.Uri({ scheme: 'local', path })
//       )
//       model.updateOptions({
//         tabSize: 2,
//         insertSpaces: true
//       })
//     }
//   }

//   openFile = (path, value) => {
//     console.log(`opening file: ${path} value: ${value}`)
//     this.initializeFile(path, value)

//     const model = monaco.editor
//       .getModels()
//       .find(model => model.uri.path === path)

//     console.log(`openFile, model found: ${model}`)
//     this.editor.setModel(model)

//     // Restore the editor state for the file
//     const editorState = editorStates.get(path)

//     if (editorState) {
//       this.editor.restoreViewState(editorState)
//     }

//     this.editor.focus()
//   }

//   lintCode = code => {
//     const model = this.editor.getModel()

//     monaco.editor.setModelMarkers(model, 'eslint', [])

//     this.linterWorker.postMessage({
//       code,
//       version: model.getVersionId()
//     })
//   }

//   addTypings = ({ typings }) => {
//     Object.keys(typings).forEach(path => {
//       let extraLib = extraLibs.get(path)

//       extraLib && extraLib.dispose()
//       extraLib = monaco.languages.typescript.javascriptDefaults.addExtraLib(
//         typings[path],
//         path
//       )

//       extraLibs.set(path, extraLib)
//     })
//   }

//   updateMarkers = ({ markers, version }) => {
//     requestAnimationFrame(() => {
//       const model = this.editor.getModel()

//       if (model && model.getVersionId() === version) {
//         monaco.editor.setModelMarkers(model, 'eslint', markers)
//       }
//     })
//   }

//   handleResize = debounce(() => this.editor.layout(), 100, {
//     leading: true,
//     trailing: true
//   })

//   assignContainerRef = component => {
//     this.containerElement = component
//   }

//   assignIframeRef = component => {
//     this.iframe = component
//   }

//   render() {
//     return (
//       <div
//         style={{
//           display: 'flex',
//           flex: 1,
//           position: 'relative',
//           overflow: 'hidden'
//         }}
//       >
//         <iframe
//           title="iframe"
//           ref={this.assignIframeRef}
//           type="text/html"
//           style={{
//             display: 'block',
//             position: 'absolute',
//             left: 0,
//             top: 0,
//             height: '100%',
//             width: '100%',
//             pointerEvents: 'none',
//             opacity: 0
//           }}
//         />
//         <div
//           ref={this.assignContainerRef}
//           style={{ display: 'flex', flex: 1, overflow: 'hidden' }}
//           className={this.props.theme}
//         />
//       </div>
//     )
//   }
// }
