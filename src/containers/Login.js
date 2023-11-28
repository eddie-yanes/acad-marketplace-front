import React, { useContext } from 'react'
import { Row, Col, Layout} from 'antd'
import { MarketContext } from '../context'
import {
    Link
  } from "react-router-dom";

// Components
import LoginForm from '../components/LoginForm'

const Login = () => {
    const { isLogin } = useContext(MarketContext)

    return (
        <Layout style={{height: "100vh"}}>
        <Layout.Content>
        <Row justify="center" align="middle" style={{height: "100%"}}>
            <Col >
                <LoginForm />
            </Col>
        </Row>
        </Layout.Content>
        </Layout>
    )
}

export default Login
