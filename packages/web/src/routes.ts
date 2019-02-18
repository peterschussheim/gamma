import * as React from 'react'
import { graphql } from 'react-apollo'

import { VIEWER_GISTS } from './queries'

import Profile from './views/Profile'
import Login from './components/Form/Login'
import Signup from './components/Form/Signup'
import Home from './views/Home'
import EditorView from './views/EditorView'
import GistByIdView from './views/GistByIdView'
import ConfirmEmail from './views/ConfirmEmail'
import NotFound from './views/NotFound'

const EditorViewWithData = graphql(VIEWER_GISTS, {
  options: () => ({
    // fetchPolicy: 'network-only',
    ssr: true
  })
})(EditorView)

const routes = [
  { path: '/', exact: true, component: Home },
  { path: '/profile', exact: true, component: Profile },
  { path: '/auth/login', exact: true, component: Login },
  { path: '/auth/signup', exact: true, component: Signup },
  { path: '/success', exact: true, component: Home },
  { path: '/editor', exact: true, component: EditorViewWithData },
  { path: '/g/:gistId', exact: true, component: GistByIdView },
  { path: '/confirm', exact: true, component: ConfirmEmail },
  { path: '*', component: NotFound }
]

export default routes
