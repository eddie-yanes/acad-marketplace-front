import React from 'react'
import {
  Switch,
  Route,
} from "react-router-dom";

// Pages
import AdminHome from '../containers/AdminHome'
import Login from '../containers/Login'

export const adminRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: <Login />,
  },
  {
    path: '/',
    name: 'Home',
    component: <AdminHome />,
  },
]


const AdminRoutes = () => {

  return (
    <Switch>
      {adminRoutes.map(rt => (
        <Route path={rt.path}>
          {rt.component}
        </Route>
      ))}
    </Switch>
  )
}

export default AdminRoutes
