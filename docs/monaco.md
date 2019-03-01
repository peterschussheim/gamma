## monaco notes

- [monaco notes](#monaco-notes)
- [Managing multiple models](#managing-multiple-models)
  - [emmitted events](#emmitted-events)
  - [example `modelCache`](#example-modelcache)
  - [global variables](#global-variables)

## Managing multiple models

- create a single editor instance via `monaco.editor.create({ ... , model: null })`
- create N model instances via `monaco.editor.createModel(...)`.
- switch tabs by calling `editorInstance.setModel(modelInstance)`
- for each model, you can save its view state (cursor, scroll position, etc) via `editorInstance.saveViewState()` and restore it via `editorInstance.restoreViewState()`.

### emmitted events

Events fired from `monaco.editor` when their corresponding method is called, ex:

### example `modelCache`

`modeCache` has a lifecycle for a given user session, residing in-memory
 (for now) and is structured as a flat hashtable, keyed by `:gistId/:filename`.

Below is an example `modelCache` for a user session where they opened 4 unique
gists, each consisting of varying quantities of files of varied filetype.

```javascript
{
  "ef6adb3791dcc4d3666ec9cda7b3d54e/index.js": {
    model: null,
    state: null
  },
  "ef6adb3791dcc4d3666ec9cda7b3d54e/App.js": {
    model: null,
    state: null
  },
  "ef6adb3791dcc4d3666ec9cda7b3d54e/api.js": {
    model: null,
    state: null
  },
  "c2e19e6a0ad3e4b07756a8b255726f44/arrays.js": {
    model: null,
    state: null
  },
  "d2ba0697982d2e17db9dfbf8aa7865c3/functions.js": {
    model: null,
    state: null
  },
  "7294aee0b9aed6a4a0bd2cfa46e5a8e7/readme.md": {
    model: null,
    state: null
  },
  "7294aee0b9aed6a4a0bd2cfa46e5a8e7/toggleAudioSource.applescript": {
    model: null,
    state: null
  }
}
```

### global variables

- `data = { {[model: string]: model{}, {[state: string]: state{}, } }`
- `editorInstance`
