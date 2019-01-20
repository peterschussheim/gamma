export default function getEditorSettings(settings) {
  return {
    selectOnLineNumbers: true,
    fontSize: settings.fontSize,
    theme: 'vs-dark',
    fontLigatures: settings.enableLigatures,
    minimap: {
      enabled: false
    },
    formatOnPaste: true,
    lineHeight: (settings.lineHeight || 1.5) * settings.fontSize,
    folding: true,
    glyphMargin: false,
    fixedOverflowWidgets: true
  }
}
