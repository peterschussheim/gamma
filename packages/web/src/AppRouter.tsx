import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
import { Global } from '@emotion/core'

import globalStyles from './components/global'
import Navbar from './components/Navbar'
import Login from './components/Form/Login'
import Signup from './components/Form/Signup'

import Profile from './views/Profile'
import App from './App'

const Loading = () => <div>Loading...</div>

const Home = Loadable({
  loader: () => import('./views/Home'),
  loading: Loading
})

const EditorView = Loadable({
  loader: () => import('./views/EditorView'),
  loading: Loading
})

const GistByIdView = Loadable({
  loader: () => import('./views/GistByIdView'),
  loading: Loading
})

const NewGistView = Loadable({
  loader: () => import('./views/NewGistView'),
  loading: Loading
})

const ConfirmEmail = Loadable({
  loader: () => import('./views/ConfirmEmail'),
  loading: Loading
})

const NotFound = Loadable({
  loader: () => import('./views/NotFound'),
  loading: Loading
})

class AppRouter extends React.Component {
  renderRoute = (props: any) => {
    const { data, ...rest } = this.props

    if (data && data.type === 'success') {
      return <App {...props} {...rest} />
    } else {
      return <NotFound />
    }
  }

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
          <Route
            exact={true}
            path="/editor"
            component={EditorView}
            {...this.props}
          />
          <Route
            exact={true}
            path="/g/:gistId"
            component={GistByIdView}
            {...this.props}
          />
          <Route
            exact={true}
            path="/new"
            component={NewGistView}
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

export default AppRouter
