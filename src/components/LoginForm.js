import React, { useState, useContext } from 'react'
import { Row, Card, Form, Input, Button, Alert } from 'antd'
import { useHistory } from "react-router-dom"
import styles from '../styles/components/LoginForm.module.css'
import { MarketContext } from '../context'

const CardTitle = () => (
  <Row className={styles.titleWrap} >
    <h4 className={styles.subtitle}>Casual marketplace</h4>
    <h1 className={styles.title} >Inicio de sesión</h1>
  </Row>
)

const LoginForm = () => {
  let history = useHistory();
  const { requesting, handleLogin } = useContext(MarketContext)
  const [ showAlert, setShowAlert ] = useState(false)
  const [ msgAlert, setMsgAlert ] = useState('')

  const handleSubmit = async (values) => {
    const resp = await handleLogin(values)  
    if(resp){
      setMsgAlert('Inicio de sesion exitoso!')
      setShowAlert(true)
      history.push('/')
    } else{
      setMsgAlert('ALgo salio mal!')
      setShowAlert(true)
    }
  }
  
  return (
    <Card className={styles.container} title={<CardTitle />}>
      <Form
        name="login"
        layout="vertical"
        initialValues={{ email: '', password: '' }}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Correo electronico"
          name="email"
          rules={[{ required: true, message: 'Porfavor ingresa tu correo electronico!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[{ required: true, message: 'Porfavor ingresa tu contraseña!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          {requesting ? (
            <Button className={styles.btn} type="primary" htmlType="submit" block loading>
              Cargando...
            </Button>
          ) : (
            <Button className={styles.btn} type="primary" htmlType="submit" block>
              Inicio de sesion
            </Button>
          )}
          
        </Form.Item>
      </Form>
      { showAlert && <Alert message={msgAlert} type="success" /> }
    </Card>
  )
}

export default LoginForm
