import React from 'react'
import {
  Switch,
  Route,
} from "react-router-dom";

// Pages
import SuperHome from '../containers/SuperHome'
import Login from '../containers/Login'

export const superRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: <Login />,
  },
  {
    path: '/',
    name: 'Home',
    component: <SuperHome />,
  },
]


const SuperRoutes = () => {
  return (
    <Switch>
      {superRoutes.map(rt => (
        <Route path={rt.path}>
          {rt.component}
        </Route>
      ))}
    </Switch>
  )
}

export default SuperRoutes
