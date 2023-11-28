import React, { useEffect, useState } from 'react'
import { login, getCategories, getStores, getStoreProducts, deleteProduct } from './services'
import { ROLES } from './constants'
import { useLocalStorage } from './hooks/useLocalStorage'


const Roles = { 
  "1" : ROLES.SUPER, 
  "2" : ROLES.ADMIN, 
  "3" : ROLES.CLIENT 
}

const MarketContext = React.createContext()

const MarketProvider = (props) => {
  const [ role, setRole ] = useLocalStorage('sesion_role', ROLES.CLIENT)
  const [ user, setUser ] = useLocalStorage('sesion_user', {})
  const [ isLogin, setIsLogin ] = useLocalStorage('sesion_login', false)
  const [ itemsStore, setItemsStore ] = useLocalStorage('sesion_store_items', [])
  const [ requesting, setRequesting ] = useState(true)
  const [ itemsCart, setItemsCart ] = useLocalStorage('sesion_items_cart', [])
  const [ filters, setFilters ] = useState({ categories: [], stores: [], keyword:"" })
  const [ categories, setCategories ] = useState([])
  const [ stores, setStores ] = useState([])

  useEffect( async () => {
    const fetchData = async () => {
      const respCtg = await getCategories()
      if(respCtg.status){
        const catgs = respCtg.data
        setCategories(catgs)
      }
  
      const respStrs = await getStores()
      if(respStrs.status){
        const strs = respStrs.data
        setStores(strs)
      }
    }

    await fetchData()
    setRequesting(false)
  }, [])

  const handleLogin = (data) => {
    setRequesting(true)
    return new Promise((resolve, reject) => {
      login({ correo: data.email, clave: data.password })
        .then(async (resp) => {
          const tempRole = Roles[resp.data.objResponse.rol]
          setUser({
            email: resp.data.objResponse.correo,
            idStore: resp.data.objResponse.idTienda,
            nomStore: resp.data.objResponse.nomTienda,
            role: resp.data.objResponse.rol
          })
          if(resp.data.objResponse.idTienda > 0){
            const iStr = await getStoreProducts({id: resp.data.objResponse.idTienda })
            if(iStr.status){
              setItemsStore(iStr.data)
            }
          }
          setIsLogin(true)
          setRole(tempRole)
          setTimeout(() => {
            setRequesting(false)
            resolve(true)
          }, 2000)
        })
        .catch(() => {
          setRequesting(false)
          resolve(false)
        })
    })
  }

  const handleLogout = () => {
    setRequesting(true)
    return new Promise((resolve, reject) => {
      setUser({})
      setIsLogin(false)
      setRole(ROLES.CLIENT)
      setItemsStore([])
      setItemsCart([])
      setTimeout(() => {
        setRequesting(false)
        resolve(true)
      }, 2000)
    })
  }

  const addItemToCart = ({ product, amount }) => {
    return new Promise(resolve => {
      const tempItems = [...itemsCart]
      const _tempItems = tempItems.filter(i => i.product.idProducto != product.idProducto)
      _tempItems.push({product, amount})
      setItemsCart(_tempItems)
      resolve(true)
    })
  }

  const removeItemFromCart = ({ id }) => {
    return new Promise(resolve => {
      const tempItems = itemsCart.filter(i => i.product.idProducto != id)
      setItemsCart(tempItems)
      resolve(true)
    })
  }

  const handleDeleteProduct = ({ id }) => {
    setRequesting(true)
    return new Promise(async resolve => {
      console.log(id)
      const resp = await deleteProduct({id: id})
      console.log(resp)
      await reloadStoreProducts()
      resolve(true)
    })
  }

  const reloadStoreProducts = () => {
    setRequesting(true)
    return new Promise(async resolve => {
      const iStr = await getStoreProducts({id: user.idStore })
      if(iStr.status){
        setItemsStore(iStr.data)
      }
      setRequesting(false)
      resolve()
    })
  }

  const clearCart = () => {
    setItemsCart([])
  }

  const handleFilters = (ftrs) => {
    setFilters({...filters, ...ftrs})
  }

  return (
    <MarketContext.Provider value={{
      user,
      role,
      itemsCart,
      itemsStore,
      categories,
      stores,
      requesting,
      isLogin,
      filters,
      handleFilters,
      handleLogin,
      handleLogout,
      addItemToCart,
      removeItemFromCart,
      handleDeleteProduct,
      reloadStoreProducts,
      clearCart
    }}>
      {props.children}
    </MarketContext.Provider>
  )
}

export { MarketContext, MarketProvider }
