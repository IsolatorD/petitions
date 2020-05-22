import React from 'react'
import { Container, Row, Col, useScreenClass } from 'react-grid-system'

import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {Card, CardBody} from 'reactstrap'


import Text from '../../../components/Text'
import BaseForm from '../../../components/Form'
import Input from '../../../components/Input'
import Button from '../../../components/Button'

import {Formik, ErrorMessage} from 'formik'
import * as Yup from 'yup'

import Header from './Header'
import Campaign from './Campaign'
import Guia from './Guia'
import Footer from './Footer'

import API from '../../../api'
import * as AuthTypes from '../../../store/auth/types'
import * as AuthActions from '../../../store/auth/actions'

const logInSchema = Yup.object().shape({
  email: Yup.string()
  .email('Ingresa un email válido.')
  .required('Requerido'),
  password: Yup.string()
    .min(4, 'La contraseña debe tener entre 4 y 60 caracteres. ')
    .max(60, 'La contraseña debe tener entre 4 y 60 caracteres. ')
    .required('Requerido')
})

const Login = (props) => {
  const screenClass = useScreenClass()
  
  const login = async (values) => {
    console.log(values)
    const api = new API({})
    try {
      const response = (await api.login(values)).data
      if (response.token) {
        localStorage.setItem('tk', response.token.token)
        props.dispatch({
          type: AuthTypes.INSERT_TOKEN,
          token: response.token.token
        })
        props.dispatch(AuthActions.getProfile())
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container
      fluid
      style={{
        overflowX: 'hidden'
      }}
    >
      <Header />
      <Row>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{
            paddingLeft: ['xs', 'sm'].includes(screenClass) ? `${15}px` : `${2.5}rem`,
            paddingBottom: `${1}rem`
          }}
        >
          <Text
            className="default-title"
            style={{
              fontSize: ['xs', 'sm'].includes(screenClass) ? `${1.5}rem` : `${1.9}rem`,
              fontWeight: 'bolder',
              color: '#FF3300',
              textTransform: 'uppercase'
            }}
          >
            iniciar {' '}
            <Text
              className="default-title"
              style={{
                fontSize: ['xs', 'sm'].includes(screenClass) ? `${1.5}rem` : `${1.9}rem`,
                fontWeight: 'bolder',
                color: '#000000',
                display: 'inline-block'
              }}
            >
              sesión
            </Text>
          </Text>
        </Col>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{
            paddingLeft: ['xs', 'sm'].includes(screenClass) ? `${15}px` : `${2.5}rem`
          }}
        >
          <Text
            className="default-text"
            style={{
              fontSize: ['xs', 'sm'].includes(screenClass) ? `${1}rem` : `${1}rem`,
              fontWeight: 'bolder',
              fontFamily: 'Montserrat-Bold',
              color: '#000000',
              display: 'inline-block'
            }}
          >
            En tufirma.org creemos en tus causas, para crear tu petición inicia sesión <br/>o{' '}
            <Link to={`/${props.subdomain}/signup`}>registrate con nosotros.</Link>
          </Text>
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
            marginTop: `${3}rem`,
            marginBottom: `${3}rem`,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <BaseForm
            formTitle="Ingresa a tu cuenta"
          >
            <Formik
              initialValues={{
                email: '',
                password: ''
              }}
              validationSchema={logInSchema}
              onSubmit={async (values, actions) => {
                await login(values)
                actions.setSubmitting(false)
              }}
            >
              {({ handleChange, handleSubmit, handleBlur, values}) => (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    width: ['xs', 'sm'].includes(screenClass) ? '100%' : '60%'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: `${.6}rem`
                    }}
                  >
                    <Input
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      name='email'
                      placeholder="Correo electrónico"
                      width={['xs', 'sm'].includes(screenClass) ? `${80}%` : `${100}%`}
                      style={{
                        border: '1px solid #C4C4C4',
                        borderRadius: 5,
                        width: ['xs', 'sm'].includes(screenClass) ? `${80}%` : `${100}%`,
                        height: 30,
                        paddingRight: 10,
                        paddingLeft: 10
                      }}
                    />
                    <ErrorMessage
                      name="email"
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
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: `${.6}rem`
                    }}
                  >
                    <Input
                      type="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      name='password'
                      placeholder='Contraseña'
                      width={['xs', 'sm'].includes(screenClass) ? `${80}%` : `${100}%`}
                      style={{
                        border: '1px solid #C4C4C4',
                        borderRadius: 5,
                        width: ['xs', 'sm'].includes(screenClass) ? `${80}%` : `${100}%`,
                        height: 30,
                        paddingRight: 10,
                        paddingLeft: 10
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
                      display: 'flex',
                      justifyContent: ['xs', 'sm'].includes(screenClass) ? 'space-evenly' : 'space-between'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-around'
                      }}
                    >
                      <Input
                        type='radio'
                      />
                      <Text
                        className="default-text"
                        style={{
                          fontSize: ['xs', 'sm'].includes(screenClass) ? `${.6}rem` : `${.6}rem`,
                          color: '#787878',
                          fontWeight: 'bolder',
                          paddingTop: `${.3}rem`
                        }}
                      >
                        Recuérdame
                      </Text>
                    </div>
                    <Button
                      type="submit"
                      style={{
                        borderRadius: '5px',
                        width: `${7}rem`
                      }}
                    >
                      Iniciar Sesión
                    </Button>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '1rem'
                    }}
                  >
                    <Text
                      className="default-text"
                      style={{
                        fontSize: ['xs', 'sm'].includes(screenClass) ? `${.6}rem` : `${.6}rem`,
                        color: '#FF3300',
                        fontWeight: 'bolder',
                        paddingTop: `${.3}rem`,
                        textDecoration: 'underline'
                      }}
                    >
                      ¿Has olvidado tu contraseña?
                    </Text>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '2rem'
                    }}
                  >
                    <Text
                      className="default-text"
                      style={{
                        fontSize: ['xs', 'sm'].includes(screenClass) ? `${.7}rem` : `${.7}rem`,
                        color: '#282828',
                        fontWeight: 'bolder',
                        paddingTop: `${.3}rem`
                      }}
                    >
                      ¿Aún no tienes cuenta?
                    </Text>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '1rem',
                      marginBottom: '3rem'
                    }}
                  >
                    <Link
                      to={`/${props.subdomain}/signup`}
                      className='button-default'
                      style={{
                        textDecoration: 'none',
                        borderRadius: '5px',
                        width: `${13}rem`,
                        height: `${2}rem`,
                        backgroundColor: '#fff',
                        border: '1px solid #FF3300'
                      }}
                    >
                      <Text
                        className="default-text"
                        style={{
                          fontSize: ['xs', 'sm'].includes(screenClass) ? `${.6}rem` : `${.7}rem`,
                          color: '#FF3300',
                          fontWeight: 'bolder'
                        }}
                      >
                        REGISTRATE EN TU FIRMA
                      </Text>
                    </Link>
                  </div>
                </form>
              )}
            </Formik>
          </BaseForm>
        </Col>
      </Row>
      <Campaign />
      <Guia />
      <Footer />
    </Container>
  )
}

const mapStateToProps = (state, store) => ({
  subdomain: state.organization.subdomain
})

export default connect(mapStateToProps)(Login)