import React from 'react'
import { Route, Switch, Redirect } from 'react-router'
import Loadable from 'react-loadable'

import signedOutFallback from './utils/signedOutFallback'
import ErrorBoundary from './components/error'
import Navbar from './components/navbar'
import { Loading } from './components/loading'
import Error from './components/error'
import Login from './components/login'
import Profile from './views/profile'
import Editor from './views/editor'
import NotFound from './views/notfound'
import ConfirmEmail from './views/confirmEmail'

// const Home = Loadable({
//   loader: () => import('./views/home' /* webpackChunkName: "Home" */),
//   loading: ({ isLoading }) => isLoading && <Loading />
// })
const Home = Loadable({
  loader: () => import('./views/home' /* webpackChunkName: "Home" */),
  loading() {
    return <div>Loading...</div>
  }
})

const ErrorFallback = Loadable({
  loader: () => import('./components/error' /* webpackChunkName: "Error" */),
  loading: ({ isLoading }) => isLoading && <Loading />
})

const HomeFallback = signedOutFallback(Home, () => <Redirect to="/" />)
const LoginFallback = signedOutFallback(() => <Redirect to="/" />, Login)

/**
 *  type Props = {
 *    currentUser: ?Object
 *  }
 */
class Routes extends React.Component {
  render() {
    // const { currentUser } = this.props
    return (
      <ErrorBoundary fallbackComponent={Error}>
        <Navbar />
        {/* 
          Switch renders the FISRT match only
        */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/auth/login" component={Login} />
          {/* <Route exact path="/auth/signup" component={Signup} /> */}
          <Route exact path="/success" component={Home} />
          <Route exact path="/editor" component={Editor} />
          <Route path="/confirm/:id" component={ConfirmEmail} />
          <Route path="*" component={NotFound} />
        </Switch>
      </ErrorBoundary>
    )
  }
}

export default Routes
