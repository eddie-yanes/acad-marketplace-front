import React, { useState, useEffect, useContext } from 'react'
import { Card, List } from 'antd'
import styles from '../styles/components/ProductList.module.css'
import { useHistory } from 'react-router-dom'
import { loadProducts, getCategories, getStores } from '../services/index'
import imgDefault from '../assets/no-image.png'
import { MarketContext } from '../context'

const ProductList = () => {
    let history = useHistory() 
    const { filters, categories, stores } = useContext(MarketContext)
    const [ products, setProducts ] = useState([])
    const [ requesting, setRequesting ] = useState(true)

    useEffect(async () => {
      const {status, data} =  await loadProducts()
      if(status){
        setProducts(data)
      }
      setRequesting(false)
    }, [])

    if(requesting){
      return(
        <h3>Cargando...</h3>
      )
    }

    const handleViewProduct = (prod) => {
      history.push(`/product/${prod.idProducto}`)
    }

    return (
      <>
      {products.length > 0 ? (
        <List
          grid={{
            gutter: 24,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 5,
            xxl: 5,
          }}
          dataSource={products.filter(p => {
            return filters ? 
              (filters.categories.length > 0 ? filters.categories.includes(p.idCategoria) : true) &&
              (filters.stores.length > 0 ? filters.stores.includes(p.idTienda) : true) && 
              (filters.keyword != "" ? p.nombre.toLowerCase().includes(filters.keyword.toLowerCase()) : true  )
            : true   
          })}
          renderItem={item => (
            <List.Item>
              <Card
                onClick={() => handleViewProduct(item)}
                className={styles.item}
                bodyStyle={{padding: '10px', display: 'flex', flexDirection: 'column'}}
                cover={
                  <img width="320" src={`${process.env.PUBLIC_URL}/images/${item.foto.urlFoto != "" ? item.foto.urlFoto : "no-image.png" }`} />
                } 
              >
                <span className={styles.itemName}>{item.nombre.toLowerCase()}</span>
                <span className={styles.itemPrice}>${Intl.NumberFormat("en-US").format(item.precio)}</span>
                <span className={styles.itemCategory}>{categories.find(c => c.idCategoria == item.idCategoria).nombre.toLowerCase()}</span>
                <span className={styles.itemStore}>{stores.find(s => s.idTienda == item.idTienda).nombre}</span>
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <h3>No hay productos!</h3>
      )}
      </>
    )
}

export default ProductList
