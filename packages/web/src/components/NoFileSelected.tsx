/** @jsx jsx */
import { jsx } from '@emotion/core'
import { css } from 'emotion'
import * as React from 'react'

export default class NoFileSelected extends React.PureComponent {
  render() {
    return (
      <div
        className={css({
          backgroundColor: '#0E2840',
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        })}
      >
        <h4
          className={css({
            color: '#89A5DB',
            fontSize: '1.5em',
            fontWeight: 500,
            opacity: 1.0
          })}
        >
          Select a file to view and edit
        </h4>
      </div>
    )
  }
}
