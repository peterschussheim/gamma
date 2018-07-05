import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

import User from './components/user'
import Login from './components/login'
import Editor from './pages/editor'
import Home from './pages/home'
import Viewer from './pages/viewer'
import { AuthButton } from './components/buttons'
import { NavbarLinkWithRouter as Navbar } from './components/navigation'
import fakeAuth from './utils/auth'

const Signup = () => <div>Signup</div>
const ConfirmEmail = () => <div>ConfirmEmail</div>

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

class App extends React.Component {
  render() {
    return (
      <Router>
        <AuthButton />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/confirm/:id" component={ConfirmEmail} />
          <PrivateRoute path="/profile" component={Viewer} />
        </Switch>
      </Router>
    )
  }
}

export default App
