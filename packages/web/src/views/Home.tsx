/** @jsx jsx */
import { jsx } from '@emotion/core'
import { css } from 'emotion'
import * as React from 'react'
import { Query } from 'react-apollo'
import { VIEWER_ME } from '../queries'

function Home() {
  return (
    <Query query={VIEWER_ME} ssr={false}>
      {({ client, loading, error, data }) => {
        if (loading) {
          return null
        }
        if (error) {
          return <div>{error}</div>
        }
        if (data.viewer.me == null) {
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
                Please sign in or create a new account.
              </p>
            </div>
          )
        } else {
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
              <h3
                className={css({
                  paddingTop: '1.5em',
                  color: '#89A5DB',
                  fontWeight: 500,
                  opacity: 1.0
                })}
              >
                Select Editor from the top right menu to get started!
              </h3>
            </div>
          )
        }
      }}
    </Query>
  )
}

export default Home
