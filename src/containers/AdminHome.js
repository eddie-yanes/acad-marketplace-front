import React from 'react'
import { Layout } from 'antd'
import styles from '../styles/containers/Home.module.css'
import {
    BrowserRouter as Router, Switch, Route
  } from "react-router-dom";

// Components
import Header from '../components/Header' 
import Footer from '../components/Footer' 
import SideBar from '../components/SideBar'
import Dashboard from '../components/Dashboard'
import AdminProducts from '../components/AdminProducts'
import AddProduct from '../components/AddProduct'
import EditProduct from '../components/EditProduct'

const AdminHome = () => {
    return (
        <Layout style={{height: '100vh'}}>
            <Header type="admin"/>
            <Layout>
                <Router>
                <SideBar />
                    <Switch>
                        <Route path="/products/edit">
                            <EditProduct />
                        </Route>
                        <Route path="/products/add">
                            <AddProduct />
                        </Route>
                        <Route path="/products">
                            <AdminProducts />
                        </Route>
                        <Route path="/">
                            <Dashboard />
                        </Route>
                    </Switch>
                </Router>
            </Layout>
            <Footer/>
        </Layout>
    )
}

export default AdminHome
