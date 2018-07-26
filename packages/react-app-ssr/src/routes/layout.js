import React from 'react'
import { Route, Switch } from 'react-router'
import routes from './index'
import Navbar from '../components/navbar'

export const Layout = ({ user }) => {
  return (
    <div>
      <Navbar />
      <Switch>
        {routes.map(route => <Route key={`route-${route.name}`} {...route} />)}
      </Switch>
    </div>
  )
}
