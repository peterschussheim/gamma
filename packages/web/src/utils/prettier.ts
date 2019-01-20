import getFileLanguage from './getFileLanguage'

export default async function prettierCode(
  path: string,
  code: string
): Promise<string> {
  const language = getFileLanguage(path)

  let parser
  let plugins

  switch (language) {
    case 'javascript':
      parser = 'babylon'
      plugins = [await import('prettier/parser-babylon')]
      break
    case 'typescript':
      parser = 'typescript'
      plugins = [await import('prettier/parser-typescript')]
      break
    case 'markdown':
      parser = 'markdown'
      plugins = await Promise.all([
        import('prettier/parser-babylon'),
        import('prettier/parser-typescript'),
        import('prettier/parser-markdown')
      ])
      break
  }

  if (parser && plugins) {
    const prettier = await import('prettier/standalone')
    const {
      default: config
    } = (await import('../components/CodeEditor/configs/prettier.json')) as any

    // @ts-ignore
    return prettier.format(code, {
      parser,
      plugins,
      ...config
    })
  }

  return code
}
