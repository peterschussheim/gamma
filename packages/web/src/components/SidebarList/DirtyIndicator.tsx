import * as React from 'react'

type IndicatorProps = {
  isDirty: boolean
}

export const DirtyIndicator: React.FunctionComponent<
  IndicatorProps
> = props => {
  return (
    <span style={{ float: 'right', color: 'magenta', fontWeight: 'bold' }}>
      {props.isDirty ? 'M' : null}
    </span>
  )
}
