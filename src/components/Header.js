import React, { useContext } from 'react'
import { Layout, Avatar, Col, Badge } from 'antd'
import styles from '../styles/components/Header.module.css'
import { Link, useHistory } from 'react-router-dom'
import logo from '../assets/logo.jpg'
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { MarketContext } from '../context'
import { ROLES } from '../constants'

const Header = () => {
    let history = useHistory()
    const { role, user, isLogin, itemsCart, handleLogout } = useContext(MarketContext)

    return (
       <Layout.Header className={styles.container}>
         <img
          onClick={() => { history.push('/') }}
          style={{cursor: 'pointer'}}
          width={200}
          src={logo}
        />
        <div style={{display: 'flex'}}>
          {isLogin && user.email ? (
            <div className={styles.userWrap}>
              <div className={styles.userLabels}>
                <span className={styles.userEmail}>{user.email}</span>
                <span onClick={handleLogout} className={styles.userLogout} >cerrar sesion</span>
              </div>
              <div className={styles.userAvatar}>
                <Avatar style={{backgroundColor: "#FFCE22"}} size={38} icon={<UserOutlined />} />
              </div>
            </div>
          ) : (
            <Col>
              <Link style={{marginRight: '20px'}} to="/login">Iniciar sesión</Link>
              <Avatar size={38} icon={<UserOutlined />} />
            </Col>
          )}
          {isLogin && [ROLES.CLIENT].includes(role) && (
            <Col style={{marginLeft: '30px'}}>
              <Link to="/cart-store" >
                <Badge count={itemsCart.length}>
                  <Avatar style={{cursor: 'pointer', backgroundColor: '#348FD9'}} shape="circle" icon={<ShoppingCartOutlined />} />
                </Badge>
              </Link>
            </Col>
          )}
        </div>
       </Layout.Header>
    )
}

export default Header
