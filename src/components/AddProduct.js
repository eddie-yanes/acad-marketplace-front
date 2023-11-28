import React, { useContext } from 'react'
import { Layout, Row, Form, Input, Button, Select, InputNumber, Upload } from 'antd'
import styles from '../styles/components/AddProduct.module.css'
import { MarketContext } from '../context'
import { UploadOutlined } from '@ant-design/icons';
import { registerProduct } from '../services/index'
import { useHistory } from 'react-router-dom'

const {Option} = Select

const AddProduct = () => {
  const { user, categories, reloadStoreProducts } = useContext(MarketContext)
  const history = useHistory()
  const handleSubmit = async (values) => {
    const body = {
      idProducto: 0,
      idTienda: user.idStore,
      idCategoria: values.category,
      nombre: values.name,
      descripcion: values.description,
      precio: values.price,
      foto: {
          "urlFoto": values.image.file ?  values.image.file.name : ""
      }
    }
    const resp = await registerProduct(body)
    if(resp){
      reloadStoreProducts()
      history.push('/')
    }
  }

  const getOptions = () => {
    return categories.map(c =>  <Option value={c.idCategoria}>{c.nombre}</Option>)
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
                  <Select defaultValue={categories[0].idCategoria} style={{ width: "100%" }} >
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
                    defaultValue={1000}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>

                <Form.Item
                  label="Imagen"
                  name="image"
                >
                  <Upload
                    listType="picture"
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
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

export default AddProduct
