import React from 'react'
import { Container, Row, Col, Visible, useScreenClass } from 'react-grid-system'

import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

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

const singUpSchema = Yup.object().shape({
  first_name: Yup.string()
  .required('Requerido'),
  last_name: Yup.string()
  .required('Requerido'),
  email: Yup.string()
  .email('Ingresa un email válido.')
  .required('Requerido'),
  email_confirmation: Yup.string()
    .equals([Yup.ref('email')], 'El correo ingresado no coincide')
    .required('Requerido')
})

const Register = (props) => {
  const screenClass = useScreenClass()

  const registerUser = async (values) => {
    console.log(values)
    const api = new API({subdomain: props.subdomain})
    try {
      const response = (await api.registerUser(values)).data
      if (response.success) {
        // TODO: Hacer el mensaje flotante de "Revisa tu bandeja de correos"
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
            registrate {' '}
            <Text
              className="default-title"
              style={{
                fontSize: ['xs', 'sm'].includes(screenClass) ? `${1.5}rem` : `${1.9}rem`,
                fontWeight: 'bolder',
                color: '#000000',
                display: 'inline-block'
              }}
            >
              ahora
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
            En tufirma.org creemos en tus causas, para crear tu petición <Link to={`/${props.subdomain}/login`}>inicia sesión</Link> <br/>o registrate con nosotros.
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
            formTitle="Registrate con tu dirección de email"
          >
            <Formik
              initialValues={{
                first_name: '',
                last_name: '',
                email: '',
                email_confirmation: ''
              }}
              validationSchema={singUpSchema}
              onSubmit={async (values, actions) => {
                await registerUser(values)
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
                      value={values.first_name}
                      name='first_name'
                      placeholder="Nombre"
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
                      name="first_name"
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
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.last_name}
                      name='last_name'
                      placeholder="Apellido"
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
                      name="last_name"
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
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email_confirmation}
                      name='email_confirmation'
                      placeholder='Confirmar email'
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
                      name="email_confirmation"
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
                      justifyContent: 'center',
                      marginTop: '2rem',
                      marginBottom: '2rem',
                      paddingLeft: ['xs', 'sm'].includes(screenClass) ? '3rem' : 0,
                      paddingRight: ['xs', 'sm'].includes(screenClass) ? '3rem' : 0
                    }}
                  >
                    <Text
                      className="default-text"
                      style={{
                        fontSize: ['xs', 'sm'].includes(screenClass) ? `${.7}rem` : `${.7}rem`,
                        color: '#030303',
                        fontWeight: 'bolder',
                        paddingTop: `${.3}rem`,
                        textAlign: 'center'
                      }}
                    >
                      Al hacer click en Registrarse, aceptas los términos y condiciones y la política de privacidad de Tu Firma.
                    </Text>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '1rem'
                    }}
                  >
                    <Button
                      type='submit'
                      style={{
                        borderRadius: '5px',
                        width: `${16}rem`,
                        height: `${2.5}rem`,
                      }}
                    >
                      Registrarse
                    </Button>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '1rem',
                      marginBottom: '3rem'
                    }}
                  >
                    <Text
                      className="default-text"
                      style={{
                        fontSize: ['xs', 'sm'].includes(screenClass) ? `${.7}rem` : `${.7}rem`,
                        color: '#030303',
                        fontWeight: 'bolder',
                        paddingTop: `${.3}rem`,
                        textAlign: 'center'
                      }}
                    >
                      ¿Ya tienes una cuenta?{' '}
                      <Link
                        style={{
                          color: '#FF3300',
                          fontWeight: 'bolder'
                        }}
                        to='/tufirma/login'
                      >
                        Iniciar sesión
                      </Link>
                    </Text>
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

export default connect(mapStateToProps)(Register)