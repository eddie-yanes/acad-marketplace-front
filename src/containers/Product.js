import React, { useState, useEffect } from 'react'
import { Layout, Row, Col} from 'antd'
import styles from '../styles/containers/Product.module.css'
import { useParams } from 'react-router-dom'
import { getProduct } from '../services/index'

// Components
import Header from '../components/Header' 
import Footer from '../components/Footer' 
import ProductDetail from '../components/ProductDetail'
import ProductComments from '../components/ProductComments'
import ProductReviews from '../components/ProductReviews'

const Product = () => {
  let { id } = useParams()
  const [ product, setProduct ] = useState({})
  const [ requesting, setRequesting ] = useState(true)

  useEffect(async () => {
    const {status, data} = await getProduct({id})
    if(status){
      setProduct(data[0])
    }
    setRequesting(false)
  }, [])

  return (
      <Layout style={{height: '100vh'}}>
          <Header/>
          <Layout.Content className={styles.container}>
            { requesting ? (
              <h3>cargando...</h3>
            ) : id ? (
              <div className={styles.detailsContainer}>
                <ProductDetail product={product} />
                <ProductReviews product={product} />
                <ProductComments product={product} />
              </div>
            ) : (
              <h3>No ha seleccionado Producto!</h3>
            )}
          </Layout.Content>
          <Footer/>
      </Layout>
  )
}

export default Product
