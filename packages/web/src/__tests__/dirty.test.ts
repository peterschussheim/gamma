// tslint:disable:max-line-length
import { isFileDirty } from '../utils/isFileDirty'

const changedData = [
  {
    filename: 'README.md',
    content: '0### updated Title ↵ #### Table of Contents ↵h'
  },
  {
    filename: 'index.js',
    content: 'console.jeff(hi)'
  }
]
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
const unchangedFiles = [
  {
    filename: 'README.md',
    content: '### updated Title \n #### Table of Contents \n'
  }
]

test('return true when given a changed file and a list of initialData', () => {
  expect(isFileDirty(initialData, changedData[0])).toBeTruthy()
})

test('return false when given null | undefined as changed file', () => {
  expect(isFileDirty(initialData, null)).toBeFalsy()
  expect(isFileDirty(initialData, undefined)).toBeFalsy()
})

test('return false when given undefined as changed file', () => {
  expect(isFileDirty(initialData, undefined)).toBeFalsy()
})

test('it should return false when given unchanged files', () => {
  expect(isFileDirty(initialData, unchangedFiles[0])).toBeFalsy()
})
