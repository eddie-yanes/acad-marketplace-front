import React, { useState, useContext, useEffect } from 'react'
import { Row, Col, Button, InputNumber, Form } from 'antd'
import styles from '../styles/components/ProductDetail.module.css'
import { MarketContext } from '../context'
const images = require.context('../../public/images', true)

const ProductDetail = ({product}) => {
  const { isLogin, itemsCart, addItemToCart, removeItemFromCart } = useContext(MarketContext)
  const [ addingToCart, setAddingToCart ] = useState(false)
  const [ inCart, setInCart ] = useState(false)
  const formattedNumber = Intl.NumberFormat("en-US").format(product.precio); 

  const handleAddToCart = (value) => {
    setAddingToCart(true)
    if(inCart){
      removeItemFromCart({id: product.idProducto}).then(() => {
          setInCart(false)
          setAddingToCart(false)
        }
      )
    }else{
      addItemToCart({ product, amount: value.amount }).then(() => {
          setInCart(true)
          setAddingToCart(false)
        }
      )
    }
  }

  useEffect(() => {
    if(itemsCart){
      const _inCart = itemsCart.some(i => i.product.idProducto == product.idProducto)
      setInCart(_inCart)
    }
  }, [])

  return (
    <Row className={styles.rowDetails}>
      <Col span={14} className={styles.imageWrap}>
        <img width="320" src={`${process.env.PUBLIC_URL}/images/${product.foto.urlFoto != "" ? product.foto.urlFoto : "no-image-xl.png" }`} />
      </Col>
      <Col span={10} className={styles.details} >
        <div>
          <h1 className={styles.detailsName}>{product.nombre}</h1>
          <p className={styles.detailsDescription}>{product.descripcion}</p>
          <span className={styles.detailsPrice} >${formattedNumber}</span>
        </div>
        {isLogin && (
          <Form
          className={styles.formAddToCart}
          name="cart"
          initialValues={{ amount: 1 }}
          onFinish={handleAddToCart}
        >
          {!inCart && (
            <Form.Item
              label=""
              name="amount"
              rules={[{ required: true, message: 'Porfavor ingresa la cantidad!' }]}
            >
              <InputNumber min={1} max={10} defaultValue={1} />
              </Form.Item>
            )}

            <Form.Item>
              {addingToCart ? (
                <Button loading htmlType="submit">
                  Cargando
                </Button>
              ) : inCart ? (
                <Button type="danger" htmlType="submit">
                  Eliminar del Caririto
                </Button>
              ) : (
                <Button type="primary" htmlType="submit">
                  Agregar al Carrito
                </Button>
              )}
              
            </Form.Item>
          </Form>
        )}
      </Col>
    </Row>
  )
}

export default ProductDetail
