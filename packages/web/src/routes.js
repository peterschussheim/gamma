import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
import { Global } from '@emotion/core'

import globalStyles from './components/global'
import Navbar from './components/Navbar'
import Login from './components/Form/login'
import Signup from './components/Form/signup'

import Profile from './views/Profile'
import EditorView from './views/EditorView'
// import NewGist from './views/New'
import Gist from './views/Gist'
import NotFound from './views/NotFound'
import ConfirmEmail from './views/ConfirmEmail'

const Loading = () => <div>Loading...</div>

const Home = Loadable({
  loader: () => import('./views/Home'),
  loading: Loading
})
// const Gist = Loadable({
//   loader: () => import('./views/Gist'),
//   loading: Loading
// })

class Routes extends React.Component {
  render() {
    // const { currentUser } = this.props
    return (
      <React.Fragment>
        <Global styles={globalStyles} />
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/auth/login" component={Login} />
          <Route exact path="/auth/signup" component={Signup} />
          <Route exact path="/success" component={Home} />
          {/* <Route exact path="/new" component={NewGist} /> */}
          <Route exact path="/editor" component={EditorView} />
          <Route exact path="/g/:gistId" component={Gist} {...this.props} />
          <Route
            exact
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
