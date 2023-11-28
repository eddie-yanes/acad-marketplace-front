import React from 'react'
import {
  Switch,
  Route,
} from "react-router-dom";

// Pages
import Home from '../containers/Home'
import Login from '../containers/Login'
import Product from '../containers/Product'
import CartStore from '../containers/CartStore'

export const clientRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: <Login />,
  },
  {
    path: '/product/:id',
    name: 'Product Detail',
    component: <Product />,
  },
  {
    path: '/cart-store',
    name: 'CartStore',
    component: <CartStore />,
  },
  {
    path: '/',
    name: 'Home',
    component: <Home />,
  },
]


const ClientRoutes = () => {
  return (
    <Switch>
      {clientRoutes.map(rt => (
        <Route path={rt.path}>
          {rt.component}
        </Route>
      ))}
    </Switch>
  )
}

export default ClientRoutes
