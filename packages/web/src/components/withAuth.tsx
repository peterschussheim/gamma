import React from 'react'
import { Query } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { VIEWER_ME } from './../queries'
import * as Cookies from 'es-cookie'

import Signin from './../pages/auth/signIn'

// TODO: reference this code to refactor below: https://github.com/expo/snack-web/blob/master/src/client/auth/withAuth.tsx
const withAuth = conditionFunc => Component => props => {
  return (
    <Query query={VIEWER_ME}>
      {({ data, loading, error, refetch }) => {
        if (loading) {
          return null
        }

        if (typeof document !== 'undefined') {
          const tokenExpired = Cookies.get('token')

          if (tokenExpired == undefined) {
            return <Signin {...props} refetch={refetch} />
          }
        }

        if (props.session.getCurrentUser == null) {
          return <Signin {...props} refetch={refetch} />
        }

        return conditionFunc(data) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }}
    </Query>
  )
}

export default withAuth
