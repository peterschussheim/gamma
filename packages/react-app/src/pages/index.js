import React from 'react'
import Home from './home'
import Editor from './editor'
import NotFound from './notfound'
import ConfirmEmail from './confirmEmail'
import Login from '../components/login'
// import ConfirmEmail from './confirmEmail'

const Signup = () => <div>SIGNUP</div>
const routes = [
  {
    path: '/',
    name: 'home',
    exact: true,
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    exact: true,
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    exact: true,
    component: Signup
  },
  {
    path: '/editor',
    name: 'editor',
    exact: true,
    component: Editor
  },
  {
    path: '/confirm/:id',
    name: 'confirmEmail',
    component: ConfirmEmail
  },
  {
    path: '*',
    name: 'notfound',
    component: NotFound
  }
]

{
  /* <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/confirm/:id" component={ConfirmEmail} />
          <PrivateRoute path="/profile" component={Profile} /> */
}

export default routes
