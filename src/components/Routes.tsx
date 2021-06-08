import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import Register from '../pages/Register'
import UserCreate from '../pages/users/UserCreate'
import UserEdit from '../pages/users/UserEdit'
import Users from '../pages/users/Users'

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path={'/register'} component={Register} />
      <Route path={'/login'} component={Login} />
      <Route path={'/users/edit/:id'} component={UserEdit} />
      <Route path={'/users/create'} component={UserCreate} />
      <Route path={'/users'} component={Users} />

      <Route>
        <div>page not found</div>
      </Route>
    </Switch>
  )
}

export default Routes
