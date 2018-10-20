import React from 'react'
import { Route, Switch } from 'react-router'
import Loadable from 'react-loadable'

import Navbar from './components/navbar'
import Login from './components/login'
import Signup from './components/signup'
import Profile from './views/profile'
import Editor from './views/editor'
import NotFound from './views/notfound'
import ConfirmEmail from './views/confirmEmail'

const Loading = () => <div>Loading...</div>

const Home = Loadable({
  loader: () => import('./views/home'),
  loading: Loading
})

// const HomeFallback = signedOutFallback(Home, () => <Redirect to="/" />)
// const LoginFallback = signedOutFallback(() => <Redirect to="/" />, Login)

/**
 *  type Props = {
 *    currentUser: ?Object
 *  }
 */
class Routes extends React.Component {
  render() {
    // const { currentUser } = this.props
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/auth/login" component={Login} />
          <Route exact path="/auth/signup" component={Signup} />
          <Route exact path="/success" component={Home} />
          <Route exact path="/editor" component={Editor} />
          <Route path="/confirm/:id" component={ConfirmEmail} />
          <Route path="*" component={NotFound} />
        </Switch>
      </React.Fragment>
    )
  }
}

export default Routes
