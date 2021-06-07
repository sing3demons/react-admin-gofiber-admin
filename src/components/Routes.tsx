import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Users from '../pages/Users'

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path={'/users'} component={Users} />
      <Route path={'/register'} component={Register} />
      <Route path={'/login'} component={Login} />
      <Route>
        <div>page not found</div>
      </Route>
    </Switch>
  )
}

export default Routes
