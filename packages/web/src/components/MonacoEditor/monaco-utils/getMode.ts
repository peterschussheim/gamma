// tslint:disable:curly
export default async (filename: string, monaco) => {
  if (filename == null) return 'javascript'

  const kind = filename.match(/\.([^.]*)$/)

  if (kind) {
    if (kind[1] === 'css') return 'css'
    if (kind[1] === 'scss') return 'scss'
    if (kind[1] === 'json') return 'json'
    if (kind[1] === 'html') return 'html'

    if (kind[1] === 'less') return 'less'
    if (kind[1] === 'md') return 'markdown'
    if (/jsx?$/.test(kind[1])) return 'javascript'
    if (/tsx?$/.test(kind[1])) return 'typescript'
  }

  return 'typescript'
}
