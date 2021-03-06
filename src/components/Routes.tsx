import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import Orders from '../pages/orders/Orders'
import ProductCreate from '../pages/products/ProductCreate'
import ProductEdit from '../pages/products/ProductEdit'
import Products from '../pages/products/Products'
import Profile from '../pages/Profile'
import Register from '../pages/Register'
import RoleCreate from '../pages/roles/RoleCreate'
import RoleEdit from '../pages/roles/RoleEdit'
import Roles from '../pages/roles/Roles'
import UserCreate from '../pages/users/UserCreate'
import UserEdit from '../pages/users/UserEdit'
import Users from '../pages/users/Users'

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path={'/register'} component={Register} />
      <Route path={'/login'} component={Login} />
      <Route path={'/orders'} component={Orders} />
      <Route path={'/roles/:id/edit'} component={RoleEdit} />
      <Route path={'/roles/create'} component={RoleCreate} />
      <Route path={'/roles'} component={Roles} />
      <Route path={'/profile'} component={Profile} />
      <Route path={'/products/edit/:id'} component={ProductEdit} />
      <Route path={'/products/create'} component={ProductCreate} />
      <Route path={'/products'} component={Products} />
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
