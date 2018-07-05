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
import Profile from './pages/profile'
import { AuthButton } from './components/buttons'
import Navbar from './components/navbar'
import fakeAuth from './utils/auth'

const Signup = () => <div>Signup</div>

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
        {/* <AuthButton /> */}
        <Switch />
      </Router>
    )
  }
}

export default App
