import React from 'react'
import { Layout, Row, Menu } from 'antd'
import { Link } from 'react-router-dom'
import {
  HomeOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
const { SubMenu } = Menu;

const SideBar = () => {
    return (
      <Layout.Sider>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Inicio</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<AppstoreOutlined />}>
          <Link to="/products">Productos</Link>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
    )
}

export default SideBar
