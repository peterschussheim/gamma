/** @jsx jsx */
import { jsx } from '@emotion/core'
import { css } from 'emotion'
import * as React from 'react'

function Home() {
  return (
    <div
      className={css({
        flex: 1,
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
      })}
    >
      <h1
        className={css({
          paddingTop: '1.5em',
          color: '#89A5DB',
          fontWeight: 500,
          opacity: 1.0
        })}
      >
        Welcome!
      </h1>
      <p
        className={css({
          paddingTop: '1.5em',
          color: '#89A5DB',
          fontWeight: 500,
          opacity: 1.0
        })}
      >
        Please sign in or create a new account to get started!
      </p>
    </div>
  )
}

export default Home
