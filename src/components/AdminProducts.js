import React, { useState, useEffect, useContext } from 'react'
import { Layout, Table, Button, Row } from 'antd'
import styles from '../styles/components/AdminProducts.module.css'
import { MarketContext } from '../context'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

const AdminProducts = () => {
    const { user, itemsStore, categories, handleDeleteProduct } = useContext(MarketContext)
    const history = useHistory()
    const columns = [
        {
          title: 'ID',
          dataIndex: 'idProducto',
          key: 'idProducto',
        },
        {
          title: 'Nombre',
          dataIndex: 'nombre',
          key: 'nombre',
        },
        {
          title: 'Descripcion',
          dataIndex: 'descripcion',
          key: 'descripcion',
        },
        {
          title: 'Categoria',
          dataIndex: 'idCategoria',
          key: 'idCategoria',
          render: (text, record) => <p>{categories.find(c => c.idCategoria === Number(text)).nombre }</p>
        },
        {
          title: 'Precio',
          dataIndex: 'precio',
          key: 'precio',
          render: text => <strong>${Intl.NumberFormat("en-US").format(text)}</strong>
        },
        {
          title: 'Editar',
          key: 'edit',
          render: (text, record) => (
            <Button onClick={() => handleEdit(record)} type="primary">
              Editar
            </Button>
          ),
        },
      ];
    
    const handleEdit = (record) => {
        console.log(record)
        history.push("/products/edit", { data: record });
    }

    useEffect(async () => {
       console.log(itemsStore)
    }, [])
    
    return (
        <Layout.Content >
            <Row className={styles.container}>
                <Row className={styles.content}>
                    <Button className={styles.addBtn} type="primary" >
                        <Link to="/products/add">Agregar Producto</Link>
                    </Button>
                    <Table pagination={{ pageSize: 5 }} columns={columns} dataSource={itemsStore || []} />
                </Row>
            </Row>
        </Layout.Content>
    )
}

export default AdminProducts
