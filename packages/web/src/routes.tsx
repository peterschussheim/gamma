import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
import { Global } from '@emotion/core'

import globalStyles from './components/global'
import Navbar from './components/Navbar'
import Login from './components/Form/Login'
import Signup from './components/Form/Signup'

// import Gist from './views/Gist'
// import EditorView from './views/EditorView'
import Profile from './views/Profile'
import NewGist from './views/New'
import NotFound from './views/NotFound'
import ConfirmEmail from './views/ConfirmEmail'

const Loading = () => <div>Loading...</div>

const Home = Loadable({
  loader: () => import('./views/Home'),
  loading: Loading
})
const Gist = Loadable({
  loader: () => import('./views/Gist'),
  loading: Loading
})
const EditorView = Loadable({
  loader: () => import('./views/EditorView'),
  loading: Loading
})
const CssEditorView = Loadable({
  loader: () => import('./views/CssEditorView'),
  loading: Loading
})

class Routes extends React.Component {
  render() {
    // const { currentUser } = this.props
    return (
      <React.Fragment>
        <Global styles={globalStyles} />
        <Navbar />
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/profile" component={Profile} />
          <Route exact={true} path="/auth/login" component={Login} />
          <Route exact={true} path="/auth/signup" component={Signup} />
          <Route exact={true} path="/success" component={Home} />
          <Route exact={true} path="/new" component={NewGist} />
          <Route exact={true} path="/css" component={CssEditorView} />
          <Route
            exact={true}
            path="/editor"
            component={EditorView}
            {...this.props}
          />
          <Route
            exact={true}
            path="/g/:gistId"
            component={Gist}
            {...this.props}
          />
          <Route
            exact={true}
            path="/confirm"
            component={ConfirmEmail}
            props={this.props}
          />
          <Route path="/confirm/:id" component={ConfirmEmail} />
          <Route path="*" component={NotFound} />
        </Switch>
      </React.Fragment>
    )
  }
}

export default Routes