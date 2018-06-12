export const imports = {
  'src/docz/form.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-docz-form" */ 'src/docz/form.mdx'),
}
