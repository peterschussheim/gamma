## Managing multiple models

- create a single editor instance via `monaco.editor.create({ ... , model: null })`
- create N model instances via `monaco.editor.createModel(...)`.
- switch tabs by calling `editorInstance.setModel(modelInstance)`
- for each model, you can save its view state (cursor, scroll position, etc) via `editorInstance.saveViewState()` and restore it via `editorInstance.restoreViewState()`.



### global variables

- `data = { {[model: string]: model{}, {[state: string]: state{}, } }`
- `editorInstance`
