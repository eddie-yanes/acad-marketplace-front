import React, { useState, useEffect, useContext } from 'react'
import { MarketContext } from '../context'
import SuperRoutes from '../routes/SuperRoutes'
import AdminRoutes from '../routes/AdminRoutes'
import ClientRoutes from '../routes/ClientRoutes'

const routesComponents = {
  'SUPER': <SuperRoutes />,
  'ADMIN': <AdminRoutes />,
  'CLIENT': <ClientRoutes />,
}

const AppNavigator = () => {
  const { role, requesting } = useContext(MarketContext)
  const [ routes, setRoutes ] = useState(routesComponents[role])

  useEffect(() => {
    setRoutes(routesComponents[role])
  })

  if(requesting){
    return <><h1>Cargando...</h1></>
  }

  return (
    <>
      {routes}
    </>
  )
}

export default AppNavigator
