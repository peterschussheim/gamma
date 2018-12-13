import * as React from 'react'

export const Debugger = ({ state, props }) => (
  <div
    style={{
      margin: '3rem 0',
      borderRadius: 4,
      background: '#f6f8fa',

      boxShadow: '0 0 1px  #eee inset'
    }}
  >
    <div
      style={{
        textTransform: 'uppercase',
        fontSize: 11,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        fontWeight: 500,
        padding: '.5rem',
        background: '#555',
        color: '#fff',
        letterSpacing: '1px'
      }}
    >
      State
    </div>
    <pre
      style={{
        fontSize: '.65rem',
        padding: '.25rem .5rem',
        overflowX: 'scroll'
      }}
    >
      {JSON.stringify(state, null, 2)}
    </pre>
    <div
      style={{
        textTransform: 'uppercase',
        fontSize: 11,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        fontWeight: 500,
        padding: '.5rem',
        background: '#555',
        color: '#fff',
        letterSpacing: '1px'
      }}
    >
      Props
    </div>
    <pre
      style={{
        fontSize: '.65rem',
        padding: '.25rem .5rem',
        overflowX: 'scroll'
      }}
    >
      {JSON.stringify(props, null, 2)}
    </pre>
  </div>
)
