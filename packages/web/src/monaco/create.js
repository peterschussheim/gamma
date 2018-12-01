import { editor } from '../vendor'

export function createEditor(target, options) {
  return editor.create(target, {
    ...options
  })
}
