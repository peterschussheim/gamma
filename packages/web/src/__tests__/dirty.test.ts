// tslint:disable:max-line-length
import { isGistDirty } from '../utils/isGistDirty'

const unchangedFiles = {
  'README.md': '### updated Title \n #### Table of Contents \n'
}

const changedFiles = {
  'README.md': '### updated Title ↵ #### Table of Contents ↵h'
}

const initialData = [
  {
    filename: 'README.md',
    content: '### updated Title \n #### Table of Contents \n'
  },
  {
    filename: 'index.js',
    content: 'console.jeff(hi)'
  }
]

test('test', () => {
  expect(unchangedFiles['README.md'] === initialData[0].content).toBeTruthy()
})

test('it should return true (gist IS dirty) when given changed files', () => {
  expect(isGistDirty(initialData, changedFiles)).toBeTruthy()
})

test('it should return false when given null or undefined as changedFiles arg', () => {
  expect(isGistDirty(initialData, null)).toBeFalsy()
  expect(isGistDirty(initialData, undefined)).toBeFalsy()
})

test('it should return false (gist IS NOT dirty) when given unchanged files', () => {
  expect(isGistDirty(initialData, unchangedFiles)).toBeFalsy()
})
