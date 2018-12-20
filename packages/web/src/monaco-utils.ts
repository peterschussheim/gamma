// tslint:disable:max-line-length
// original source:
// https://raw.githubusercontent.com/wasdk/WebAssemblyStudio/master/src/monaco-utils.ts
// Utils provided by monaco editor, but exposed only via AMD require().
// See index.tsx for initialization.

export class MonacoUtils {
  static Tree: any
  static ContextSubMenu: any
  static ContextMenuService: any
  static ContextViewService: any
  static TreeDefaults: any
  static Action: any

  static async initialize() {
    // Dynamic import of monaco-editor (will be globally accessible)
    await import(/* webpackChunkName: "monaco-editor" */ 'monaco-editor')
    // @ts-ignore
    const {
      Action
    } = await import(/* webpackChunkName: "monaco-editor" */ 'monaco-editor/esm/vs/base/common/actions')
    // @ts-ignore
    const {
      ContextSubMenu
    } = await import(/* webpackChunkName: "monaco-editor" */ 'monaco-editor/esm/vs/base/browser/contextmenu')
    // @ts-ignore
    const {
      ContextMenuService
    } = await import(/* webpackChunkName: "monaco-editor" */ 'monaco-editor/esm/vs/platform/contextview/browser/contextMenuService')
    // @ts-ignore
    const {
      ContextViewService
    } = await import(/* webpackChunkName: "monaco-editor" */ 'monaco-editor/esm/vs/platform/contextview/browser/contextViewService')
    // @ts-ignore
    const {
      Tree
    } = await import(/* webpackChunkName: "monaco-editor" */ 'monaco-editor/esm/vs/base/parts/tree/browser/treeImpl')
    // @ts-ignore
    const TreeDefaults = await import(/* webpackChunkName: "monaco-editor" */ 'monaco-editor/esm/vs/base/parts/tree/browser/treeDefaults')
    MonacoUtils.Action = Action
    MonacoUtils.ContextSubMenu = ContextSubMenu
    MonacoUtils.ContextMenuService = ContextMenuService
    MonacoUtils.ContextViewService = ContextViewService
    MonacoUtils.Tree = Tree
    MonacoUtils.TreeDefaults = TreeDefaults
  }

  static expandTree(tree: any) {
    const model = tree.model
    const elements = []

    let item
    const nav = model.getNavigator()

    while ((item = nav.next())) {
      elements.push(item)
    }

    for (let i = 0, len = elements.length; i < len; i++) {
      model.expand(elements[i])
    }
  }
}
