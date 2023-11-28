import React, { useState, useContext, useEffect } from 'react'
import { Layout, Row, Form, Input, Button, Select, InputNumber, Upload } from 'antd'
import styles from '../styles/components/AddProduct.module.css'
import { MarketContext } from '../context'
import { UploadOutlined } from '@ant-design/icons';
import { editProduct } from '../services/index'
import { useLocation, useHistory } from 'react-router-dom'

const {Option} = Select

const EditProduct = () => {
  const { user, categories, reloadStoreProducts } = useContext(MarketContext)
  const [ defaultData, setDefaultData ] = useState(null)
  const [ loading, setLoading ] = useState(true)
  const history = useHistory()
  const location = useLocation()

  const handleSubmit = async (values) => {
    const body = {
      idProducto: location.state.data.idProducto,
      idTienda: location.state.data.idTienda,
      idCategoria: values.category,
      nombre: values.name,
      descripcion: values.description,
      precio: values.price,
      foto: {
          "urlFoto": location.state.data.foto.urlFoto
      }
    }
    const resp = await editProduct(body)
    if(resp){
      reloadStoreProducts()
      history.push('/')
    }
  }

  const getOptions = () => {
    return categories.map(c =>  <Option value={c.idCategoria}>{c.nombre}</Option>)
  }

  useEffect(() => {
    if(location.state.data){
      const product = location.state.data
      const data = {
        name: product.nombre,
        description: product.descripcion,
        category: product.idCategoria,
        price: product.precio
      }
      setDefaultData(data)
      setLoading(false)
    }else{
      history.push('/')
    }
  }, [])

  if(loading){
    return <h1>Cargando...</h1>
  }

  return (
    <Layout.Content >
        <Row className={styles.container}>
            <Row className={styles.content} >
              <Form
                layout="vertical"
                initialValues={{
                  category: 1,
                  price: 1000
                }}
                initialValues={defaultData || {}}
                onFinish={handleSubmit}
              >
                <Form.Item
                  label="Nombre"
                  name="name"
                  rules={[{ required: true, message: 'Porfavor ingrese un nombre!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Descripcion"
                  name="description"
                  rules={[{ required: true, message: 'Porfavor ingrese una descripcion!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Categoria"
                  name="category"
                  rules={[{ required: true, message: 'Profavor seleccione una categoria!' }]}
                >
                  <Select defaultValue={defaultData ? defaultData.category : categories[0].idCategoria  } style={{ width: "100%" }} >
                    {getOptions()}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Precio"
                  name="price"
                  rules={[{ required: true, message: 'Porfavor ingrese un precio!' }]}
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    defaultValue={defaultData ? defaultData.price : 1000}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>

                <Form.Item >
                  <Button type="primary" htmlType="submit">
                    Enviar
                  </Button>
                </Form.Item>
              </Form>
            </Row>
        </Row>
    </Layout.Content>
  )
}

export default EditProduct
