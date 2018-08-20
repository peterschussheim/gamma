import React from 'react'
import { Route, Switch, Redirect } from 'react-router'
import Loadable from 'react-loadable'
import ErrorBoundary from './components/error'

// type Props = {
//   currentUser: ?Object
// }
const ErrorFallback = Loadable({
  loader: () => import('./components/error' /* webpackChunkName: "Error" */),
  loading: ({ isLoading }) => isLoading && <Loading />
})

class Routes extends React.Component {
  render() {
    const { currentUser } = this.props
    return (
      <ErrorBoundary>
        <Route component={Navbar} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Home} />
          <Route exact path="/auth/login" component={Login} />
          <Route exact path="/auth/signup" component={Signup} />
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
