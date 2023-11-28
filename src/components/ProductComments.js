import React, { useState, useEffect, useContext } from 'react'
import styles from '../styles/components/ProductComment.module.css'
import { Row, Col, Comment, Avatar, Form, Button, List, Input } from 'antd';
import imageDefault from '../assets/no-image-xl.png'
import { UserOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { getProductQuestions, postQuestion } from '../services/index'
import { MarketContext } from '../context'

const { TextArea } = Input 

const CommentList = ({ comments, handleShowForm, showForm }) => (
  <List
    dataSource={comments}
    header={
      <Row className={styles.listHeader}>
        <Button 
          onClick={handleShowForm} 
          type={showForm ? "danger" : "primary"} 
          shape="circle" 
          icon={
            showForm ? (<CloseOutlined />) : (<PlusOutlined />)} 
          size={12} 
        />
        <span className={styles.listTitle}>{`${comments.length} ${comments.length > 1 ? 'Preguntas' : 'Pregunta'}`}</span>
      </Row>}
    itemLayout="horizontal"
    renderItem={item => {
      return (
        <>
          <Comment
            author={item.question.auhtor}
            avatar={
              <Avatar style={{backgroundColor: "#FFCE22"}} size={32} icon={<UserOutlined />} />
            }
            content={
              <p>{item.question.content}</p>
            }
          >
            {item.answer.author == "null" ? <></> : (
              <Comment
                  author={item.answer.auhtor}
                  avatar={
                    <Avatar style={{backgroundColor: "#3DCF5D"}} size={32} icon={<UserOutlined />} />
                  }
                  content={
                    <p>{item.answer.content}</p>
                  }
              />
            )}
          </Comment>
        </>
      )
    } }
  />
);

const Editor = ({ onChange, onSubmit, submitting, value, isLogin, user}) => (
  <Form onFinish={onSubmit} className={styles.formComment}>
    <Form.Item name="question">
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button disabled={!isLogin} htmlType="submit" loading={submitting} type="primary">
        Preguntar
      </Button>
    </Form.Item>
  </Form>
);

const ProductComments = ({product}) => {
  const { user, isLogin } = useContext(MarketContext)
  const [ comments, setComments ] = useState([])
  const [ submitting, setSubmitting ] = useState(false)
  const [ value, setValue ] = useState('')
  const [ showForm, setShowForm ] = useState(false)

  useEffect(async () => {
    const data = await getProductQuestions({ id: product.idProducto})
    console.log(data)
    const tempComments = [...comments]
    if(data.data.length > 0){
      data.data.forEach(q => {
        console.log(q)
        const userQuest = q.usuarioPreg
        const userResp = q.usuarioResp
        tempComments.push({
          question: {
            author: userQuest.correo,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{q.pregunta}</p>,
          },
          answer: {
            author: userResp.correo,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: q.respuesta == 'null' ? "" : <p>{q.respuesta}</p>,
          }
        })
      })
      setComments(tempComments)
    }

  }, [])

  const handleSubmit = async (values) => {
    if(isLogin && user.email){
      const body = {
        "producto": {
          "idProducto": product.idProducto
        },
        "pregunta": values.question,
        "usuarioPreg": {
            "correo": user.email
        }
      }

      const resp = await postQuestion(body)
      if(resp){
        const tempComments = [...comments]
        tempComments.push({
          question: {
            author: user.email,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{values.question}</p>,
          },
          answer: {
            author: "null",
            avatar: "",
            content: "null",
          }
        })
        setComments(tempComments)
        setValue('')
        setShowForm(false)
      }

    }
  }

  const handleShowForm = () => {
    setShowForm(!showForm)
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <Row className={styles.rowComments}>
    {comments.length >= 0 && <CommentList handleShowForm={handleShowForm} showForm={showForm} comments={comments} />}
    {showForm && (
      <Comment
        className={styles.commentWrap}
        avatar={
          <Avatar size={38} icon={<UserOutlined />} />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
            isLogin={isLogin}
          />
        }
      />
    )}
    </Row>
  )
}

export default ProductComments
