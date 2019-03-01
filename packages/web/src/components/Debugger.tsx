import * as React from 'react'

const styles = {
  container: {
    margin: '3rem 0',
    borderRadius: 0,
    background: '#45c7a080',
    boxShadow: '0 0 1px  #eee inset'
  },
  pre: {
    fontSize: '.65rem',
    padding: '.25rem .5rem',
    overflowX: 'scroll'
  },
  values: {
    textTransform: 'uppercase',
    fontSize: 11,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    fontWeight: 500,
    padding: '.5rem',
    background: '#555',
    color: '#fff',
    letterSpacing: '1px'
  }
}

interface Props {
  componentName?: string
  context?: any
  state?: any
  props?: any
}

export const Debugger: React.FunctionComponent<Props> = ({
  componentName,
  context,
  state,
  props
}) => (
  <div style={styles.container}>
    <h1>{componentName}</h1>
    {context == null ? null : (
      <React.Fragment>
        <div style={styles.values}>Context</div>
        <pre style={styles.pre}>{JSON.stringify(context, null, 2)}</pre>
      </React.Fragment>
    )}
    {state == null ? null : (
      <React.Fragment>
        <div style={styles.values}>State</div>
        <pre style={styles.pre}>{JSON.stringify(state, null, 2)}</pre>
      </React.Fragment>
    )}
    {props == null ? null : (
      <React.Fragment>
        <div style={styles.values}>Props</div>
        <pre style={styles.pre}>{JSON.stringify(props, null, 2)}</pre>
      </React.Fragment>
    )}
  </div>
)
