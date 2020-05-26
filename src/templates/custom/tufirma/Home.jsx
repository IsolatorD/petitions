import React, { useEffect, useState } from 'react'
import {Container, Row, Col, useScreenClass} from 'react-grid-system'
import {withRouter, useLocation} from 'react-router-dom'

import {connect} from 'react-redux'

import Header from './Header'
import Footer from './Footer'

import Text from '../../../components/Text'
import Input from '../../../components/Input'
import Button from '../../../components/Button'

import {Formik, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import API from '../../../api'

import { useQuery } from '../../../helpers'

import * as AuthActions from '../../../store/auth/actions'

const logSchema = Yup.object().shape({
  password: Yup.string()
    .min(4, 'La contraseña debe tener entre 4 y 60 caracteres. ')
    .max(60, 'La contraseña debe tener entre 4 y 60 caracteres. ')
    .required('Requerido'),
  password_confirmation: Yup.string()
    .equals([Yup.ref('password')], 'El clave ingresada no coincide')
    .required('Requerido')
})

const Home = (props) => {
  const screenClass = useScreenClass()
  const query = useQuery()
  const [name, setName] = useState('')
  const [token, setToken] = useState(null)

  useEffect(() => {
    setToken(query.get('tk'))
    setName(query.get('name'))
  }, [props.location])

  const sendPass = async (values) => {
    let data = {
      ...values,
      token,
    }
    const api = new API({subdomain: props.subdominio})
    console.log(data)
    try {
      const response = (await api.completeRegister(data)).data
      console.log('Response complete register: ', response)
      if (response.success) {
        localStorage.setItem('tk', response.token.token)
        props.dispatch(AuthActions.setToken(response.token.token))
        props.dispatch(AuthActions.getProfile(response.token.token))
        props.history.replace(`/${props.subdominio}/profile`)
      }
    } catch (error) {
      console.log('Error verify user: ', error)
    }
  }

  return (
    <Container
      fluid
      style={{
        overflowX: 'hidden'
      }}
    >
      <Header isDash={true}/>
      <Row>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{
            backgroundColor: '#FF704D',
            paddingTop: `${3}rem`
          }}
        >
          <Row>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              style={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Text
                className='default-title'
                style={{
                  color: '#fff',
                  fontFamily: 'Montserrat-Bold'
                }}
              >
                ¡Hola {name}!
              </Text>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              style={{
                marginTop: `${1.5}rem`,
                marginBottom: `${3}rem`,
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Text
                className='default-text'
                style={{
                  color: '#fff',
                  textAlign: 'center'
                }}
              >
                Bienvenido a tufirma.org, también creemos en tu causa y vamos <br/>apoyarte en todo tu proceso.
              </Text>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              style={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <img
                src={require('./assets/laptop.png')}
                alt="Laptop"
                style={{
                  width: ['xs', 'sm'].includes(screenClass) ? `${18}rem` : `${18}rem`
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{
            paddingTop: ['xs', 'sm'].includes(screenClass) ? `${1.5}rem` : `${4}rem`,
            paddingBottom: ['xs', 'sm'].includes(screenClass) ? `${1.5}rem` : `${4}rem`,
            paddingLeft: ['xs', 'sm'].includes(screenClass) ? `${1.5}rem` : screenClass === 'md' ? `${8}rem` : `${16}rem`,
            paddingRight: ['xs', 'sm'].includes(screenClass) ? `${1.5}rem` : screenClass === 'md' ? `${8}rem` : `${16}rem`
          }}
        >
          <Row>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
            >
              <Text
                className='default-text'
                style={{
                  color: '#FF3300',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  fontFamily: 'Montserrat-Bold',
                  fontSize: `${.6}rem`
                }}
              >
                tu contraseña
              </Text> 
            </Col>
          </Row>
          <hr
            style={{
              border: '1px solid #D5D5D5',
              marginTop: '1.3rem',
              marginBottom: '1.3rem'
            }}
          />
          <Row>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
            >
              <Formik
                initialValues={{
                  password: '',
                  password_confirmation: ''
                }}
                validationSchema={logSchema}
                onSubmit={async (values, actions) => {
                    await sendPass(values)
                    actions.setSubmitting(false)
                }}
              >
                {({ handleChange, handleSubmit, handleBlur, values}) => (
                  <form
                    onSubmit={handleSubmit}
                    style={{
                      width: '100%',
                      // display: 'flex',
                      // flexDirection: ['xs', 'sm'].includes(screenClass) ? 'column' : 'row',
                      // justifyContent: 'space-around'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: ['xs', 'sm'].includes(screenClass) ? 'column' : 'row',
                        justifyContent: 'space-around'
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          marginBottom: `${.6}rem`,
                          marginRight: ['xs', 'sm'].includes(screenClass) ? 0 : '1rem'
                        }}
                      >
                        <Text
                          className='default-text'
                          style={{
                            color: '#000000',
                            textTransform: 'uppercase',
                            fontFamily: 'Montserrat-Bold',
                            fontSize: `${.6}rem`,
                            marginLeft: ['xs', 'sm'].includes(screenClass) ? `1.8rem` : 0 
                          }}
                        >
                          contraseña {' '}
                          <Text
                            className='default-text'
                            style={{
                              color: '#FF3300',
                              textTransform: 'uppercase',
                              fontFamily: 'Montserrat-Bold',
                              fontSize: `${.6}rem`
                            }}
                          >
                            *
                          </Text>
                        </Text>
                        <Input
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          name='password'
                          placeholder="Ingresa tu clave"
                          // width={['xs', 'sm'].includes(screenClass) ? `${80}%` : `${100}%`}
                          style={{
                            border: '1px solid #C4C4C4',
                            borderRadius: 5,
                            width: ['xs', 'sm'].includes(screenClass) ? `${80}%` : `${100}%`,
                            height: 30,
                            paddingRight: 10,
                            paddingLeft: 10,
                            marginTop: '.3rem'
                          }}
                        />
                        <ErrorMessage
                          name="password"
                        >
                          {msg =>
                            <Text
                              className="default-text"
                              style={{
                                fontSize: ['xs', 'sm'].includes(screenClass) ? `${.6}rem` : `${.5}rem`,
                                color: '#FF3300',
                                paddingTop: `${.2}rem`
                              }}
                            >
                              {msg}
                            </Text>
                          }
                        </ErrorMessage>
                      </div>
                      <div
                        style={{
                          flex: 1,
                          marginBottom: `${.6}rem`,
                          marginLeft: ['xs', 'sm'].includes(screenClass) ? 0 : '1rem'
                        }}
                      >
                        <Text
                          className='default-text'
                          style={{
                            color: '#000000',
                            textTransform: 'uppercase',
                            fontFamily: 'Montserrat-Bold',
                            fontSize: `${.6}rem`,
                            marginLeft: ['xs', 'sm'].includes(screenClass) ? `1.8rem` : 0 
                          }}
                        >
                          confirma tu contraseña {' '}
                          <Text
                            className='default-text'
                            style={{
                              color: '#FF3300',
                              textTransform: 'uppercase',
                              fontFamily: 'Montserrat-Bold',
                              fontSize: `${.6}rem`
                            }}
                          >
                            *
                          </Text>
                        </Text>
                        <Input
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password_confirmation}
                          name='password_confirmation'
                          placeholder="Ingresa tu clave"
                          // width={['xs', 'sm'].includes(screenClass) ? `${80}%` : `${100}%`}
                          style={{
                            border: '1px solid #C4C4C4',
                            borderRadius: 5,
                            width: ['xs', 'sm'].includes(screenClass) ? `${80}%` : `${100}%`,
                            height: 30,
                            paddingRight: 10,
                            paddingLeft: 10,
                            marginTop: '.3rem'
                          }}
                        />
                        <ErrorMessage
                          name="password_confirmation"
                        >
                          {msg =>
                            <Text
                              className="default-text"
                              style={{
                                fontSize: ['xs', 'sm'].includes(screenClass) ? `${.6}rem` : `${.5}rem`,
                                color: '#FF3300',
                                paddingTop: `${.2}rem`
                              }}
                            >
                              {msg}
                            </Text>
                          }
                        </ErrorMessage>
                      </div>
                    </div>
                    <div
                      style={{
                        display: ['xs', 'sm'].includes(screenClass) ? 'flex' : 'block',
                        justifyContent: ['xs', 'sm'].includes(screenClass) ? 'center' : '',
                        marginTop: '1rem',
                        marginBottom: '1rem'
                      }}
                    >
                      <Button
                        type='submit'
                        style={{
                          width: `${15}rem`,
                          height: `${2}rem`,
                        }}
                      >
                        guardar
                      </Button>
                    </div>
                  </form>
                )}
              </Formik>
            </Col>
          </Row>
        </Col>
      </Row>
      <Footer />
    </Container>
  )
}

const mapStateToProps = (state, store) => ({
  subdominio: state.organization.subdomain
})

export default withRouter(connect(mapStateToProps)(Home))