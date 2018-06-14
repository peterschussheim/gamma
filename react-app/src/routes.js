import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Viewer from './pages/viewer'

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/viewer" component={Viewer} />
    </Switch>
  </BrowserRouter>
)
