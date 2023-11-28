import React, { useEffect, useContext } from 'react'
import { Layout, Row, Col, Statistic, Button } from 'antd'
import styles from '../styles/components/Dashboard.module.css'
import { MarketContext } from '../context'

const Dashboard = () => {
    const { itemsStore } = useContext(MarketContext)

    return (
        <Layout.Content>
            <Row className={styles.container}>
                <Row className={styles.content} >
                <Row gutter={16}>
                    <Col span={12}>
                        <Statistic title="Total Precios" value={itemsStore.map(i => i.precio).reduce((a, b) => a+b)}  />
                    </Col>
                    <Col span={12}>
                    <Statistic title="Total de Productos" value={itemsStore.length} precision={2} />
                    </Col>
                </Row>
                </Row>
            </Row>
        </Layout.Content>
    )
}

export default Dashboard
