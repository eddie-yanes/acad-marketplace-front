import React from 'react'
import { Layout } from 'antd'
import styles from '../styles/components/Footer.module.css'

const Footer = () => {
    return (
       <Layout.Footer className={styles.container}>
         <span>Marketplace</span>
       </Layout.Footer>
    )
}

export default Footer
