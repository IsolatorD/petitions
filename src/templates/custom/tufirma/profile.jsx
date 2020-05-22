import React, { useRef, useState } from 'react'
import {Container, Row, Col, useScreenClass, Visible} from 'react-grid-system'

import { Input as RInput, FormGroup, Label } from 'reactstrap'

import {connect} from 'react-redux'

import Header from './Header'
import Footer from './Footer'

import Card from '../../../components/Card'
import Text from '../../../components/Text'
import Input from '../../../components/Input'
import Button from '../../../components/Button'

import {Formik, ErrorMessage, Field} from 'formik'
import * as Yup from 'yup'

import * as AuthActions from '../../../store/auth/actions'

const profileSchema = Yup.object().shape({
  ocupation: Yup.string()
    .required('Requerido'),
  phone: Yup.string()
    .required('Requerido'),
  country_id: Yup.string()
    .required('Requerido'),
  state: Yup.string().required('Requerido'),
  city: Yup.string().required('Requerido'),
  address: Yup.string().required('Requerido'),
  zip_code: Yup.string().required('Requerido'),
  terms: Yup.bool().required()
})
const Profile = (props) => {
  const fileRef = useRef()
  const screenClass = useScreenClass()
  const [pImage, setPImage] = useState(null)
  const [iMaxSize, setIMaxSize] = useState(false)

  const sendProfile = (values) => {
    console.log('Profile Values: ', values)
    let body = {
      ...values,
      first_name: props.user.person.first_name,
      last_name: props.user.person.last_name,
      language_code: 'us'
    }
    props.dispatch(AuthActions.updateProfile(body))
  }

  const generatePreviewImage = (file) => {
    if (file) {
      if (file.size > 2097152) {
        setIMaxSize(true)
      } else {
        setIMaxSize(false)
      }
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setPImage(reader.result)
      }
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
      <Row
        style={{
          backgroundColor: '#F0F0F0',
          paddingTop: ['xs', 'sm'].includes(screenClass) ? `${1.5}rem` : `${3}rem`
        }}
      >
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{
            paddingLeft: ['xs', 'sm'].includes(screenClass) ? `15px` : `${2.5}rem`,
            paddingBottom: `${1}rem`
          }}
        >
          <Text
            className='default-title'
            style={{
              color: '#FF3300',
              fontFamily: 'Montserrat-Bold',
              textTransform: 'uppercase',
              fontSize: ['xs', 'sm'].includes(screenClass) ? `${1.5}rem` : `${2}rem`
            }}
          >
            COMPLETA{' '}
            <Text
              className='default-title'
              style={{
                color: '#000000',
                fontFamily: 'Montserrat-Bold',
                textTransform: 'uppercase',
                fontSize: ['xs', 'sm'].includes(screenClass) ? `${1.5}rem` : `${2}rem`
              }}
            >
              tu PERFIL
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
            paddingLeft: ['xs', 'sm'].includes(screenClass) ? `15px` : `${2.5}rem`,
            paddingBottom: `${1}rem`
          }}
        >
          <Text
            className='default-text'
            style={{
              color: '#676C77',
              fontSize: ['xs', 'sm'].includes(screenClass) ? `${.75}rem` : `${.9}rem`
            }}
          >
            GRACIAS{' '}
            <Text
              className='default-text'
              style={{
                color: '#676C77',
                fontSize: ['xs', 'sm'].includes(screenClass) ? `${.75}rem` : `${.9}rem`
              }}
            >
              por querer ser parte de nosotros, en{' '}
              <Text
                className='default-text'
                style={{
                  color: '#FF3300',
                  fontSize: ['xs', 'sm'].includes(screenClass) ? `${.75}rem` : `${.9}rem`
                }}
              >
                tufirma.org
              </Text>
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
            paddingLeft: ['xs', 'sm'].includes(screenClass) ? `15px` : `${2.5}rem`
          }}
        >
          <Text
            className='default-text'
            style={{
              color: '#676C77',
              fontFamily: 'Montserrat-Bold',
              fontSize: ['xs', 'sm'].includes(screenClass) ? `${.75}rem` : `${.9}rem`
            }}
          >
            Para crear completar tu cuenta por favor ingresa los siguientes datos:
          </Text>
        </Col>
      </Row>
      <Row
        style={{
          backgroundColor: '#F0F0F0',
          paddingTop: ['xs', 'sm'].includes(screenClass) ? `${1.5}rem` : `${3}rem`
        }}
      >
        <Col
          xs={12}
          sm={12}
          md={2.2}
          lg={2.2}
          xl={2.2}
          style={{
            paddingLeft: ['xs', 'sm'].includes(screenClass) ? '15px' : `${2.5}rem`,
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '4rem',
            height: `${10.5}rem`
          }}
        >
          <Card
            className="tf-search-box"
            style={{
              width: ['xs', 'sm'].includes(screenClass) ? `40%` : `100%`,
              backgroundColor: '#fff',
              boxShadow: `${0} ${4}px ${15}px rgba(0, 0, 0, 0.35)`,
              padding: `${1}rem`
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
                <img
                  src={pImage ? pImage : require('./assets/profile.svg')}
                  alt="profile"
                  style={{
                    border: pImage ? iMaxSize ? '1.5px solid #FF647C' : '1px solid #999999' : 'none',
                    width: pImage ? `${5}rem` : `${3}rem`,
                    height: pImage ? `${5}rem` : `${3}rem`,
                    backgroundSize: 'cover',
                    borderRadius: pImage ? '100%' : 0
                  }}
                />
              </Col>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: `${.5}rem`
                }}
              >
                {
                  !pImage &&
                    <Text
                      className='default-text'
                      style={{
                        textAlign: 'center',
                        color: '#FF3300',
                        fontFamily: 'Montserrat-Bold',
                        fontSize: ['xs', 'sm'].includes(screenClass) ? `${.6}rem` : `${.7}rem`
                      }}
                    >
                      Sube aquí tu foto de perfil
                    </Text>
                }
                {
                  iMaxSize &&
                    <Text
                      className='default-text'
                      style={{
                        textAlign: 'center',
                        color: '#FF3300',
                        fontFamily: 'Montserrat-Bold',
                        fontSize: ['xs', 'sm'].includes(screenClass) ? `${.5}rem` : `${.6}rem`
                      }}
                    >
                      La imagen excede el peso maximo
                    </Text>
                }
                <Text
                  className='default-text'
                  style={{
                    paddingTop: `${.5}rem`,
                    color: '#999999',
                    fontFamily: 'Montserrat-Bold',
                    fontSize: ['xs', 'sm'].includes(screenClass) ? `${.5}rem` : `${.5}rem`,
                    display: 'block'
                  }}
                >
                  Max 2MB de peso
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
                  justifyContent: 'center',
                  marginTop: `${.8}rem`
                }}
              >
                <Button
                  style={{
                    borderRadius: '5px'
                  }}
                  onClick={() => fileRef.current.click()}
                >
                  {pImage ? 'cambiar' : 'subir'}
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col
          xs={12}
          sm={12}
          md={9.8}
          lg={9.8}
          xl={9.8}
          style={{
            paddingLeft: ['xs', 'sm'].includes(screenClass) ? '15px' : `${2.5}rem`,
            paddingRight: ['xs', 'sm'].includes(screenClass) ? '15px' : `${10}rem`,
            marginBottom: '2rem',
            display: ['xs', 'sm'].includes(screenClass) ? 'flex' : 'block',
            flexDirection: 'column',
            justifyContent: ['xs', 'sm'].includes(screenClass) ? 'center' : ''
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
                justifyContent: ['xs', 'sm'].includes(screenClass) ? 'center' : ''
              }}
            >
              <Text
                className='default-text'
                style={{
                  color: '#FF3300',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  fontFamily: 'Montserrat-Bold',
                  fontSize: `${.6}rem`,
                  textAlign: ['xs', 'sm'].includes(screenClass) ? 'center' : ''
                }}
              >
                datos básicos
              </Text> 
            </Col>
            <Visible
              xs
              sm
            >
              <hr
                style={{
                  width: '90%',
                  border: '1px solid #D5D5D5',
                  marginTop: '.7rem',
                  marginBottom: '.7rem'
                }}
              />
            </Visible>
          </Row>
          <Visible
            md
            lg
            xl
          >
            <hr
              style={{
                border: '1px solid #D5D5D5',
                marginTop: '.7rem',
                marginBottom: '.7rem'
              }}
            />
          </Visible>
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
                  gender: 'M',
                  ocupation: '',
                  phone: '',
                  country_id: '',
                  state: '',
                  city: '',
                  address: '',
                  zip_code: '',
                  terms: false,
                  profile_image: null
                }}
                validationSchema={profileSchema}
                onSubmit={async (values, actions) => {
                  await sendProfile(values)
                  actions.setSubmitting(false)
                }}
              >
                {({ handleChange, handleSubmit, handleBlur, setFieldValue, values}) => (
                  <form
                    onSubmit={handleSubmit}
                    style={{
                      width: ['xs', 'sm'].includes(screenClass) ? '100%' : '60%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-around'
                    }}
                  >
                    <input
                      style={{
                        display: 'none'
                      }}
                      accept="image/png, image/jpeg"
                      type="file"
                      name="profile_image"
                      ref={fileRef}
                      onChange={(event) => {
                        generatePreviewImage(event.currentTarget.files[0])
                        if (event.currentTarget.files[0]) {
                          setFieldValue("profile_image", event.currentTarget.files[0])
                        }
                      }}
                    />
                    <div
                      style={{
                        display: 'flex',
                        marginTop: '1rem',
                        marginBottom: '2.5rem',
                        marginLeft: ['xs', 'sm'].includes(screenClass) ? '1rem' : 0
                      }}
                    >
                      <Field
                        name="gender"
                        render={({ field }) => (
                          <>
                            <FormGroup check>
                              <Label check>
                                <RInput
                                  {...field}
                                  id="male"
                                  value="M"
                                  checked={field.value === 'M'}
                                  type="radio"
                                  name="gender"
                                />{' '}
                                <Text
                                  className='default-text'
                                  style={{
                                    color: '#1F2041',
                                    textTransform: 'uppercase',
                                    fontFamily: 'Montserrat-Bold',
                                    fontSize: `${.6}rem`,
                                    marginRight: `${1}rem`
                                  }}
                                >
                                  masculino {' '}
                                </Text>
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                <RInput
                                  id="female"
                                  {...field}
                                  value="F"
                                  checked={field.value === 'F'}
                                  type="radio"
                                  name="gender"
                                />{' '}
                                <Text
                                  className='default-text'
                                  style={{
                                    color: '#1F2041',
                                    textTransform: 'uppercase',
                                    fontFamily: 'Montserrat-Bold',
                                    fontSize: `${.6}rem`,
                                    marginRight: `${1}rem`
                                  }}
                                >
                                  femenino {' '}
                                </Text>
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                <RInput
                                  id="otro"
                                  {...field}
                                  value="O"
                                  checked={field.value === 'O'}
                                  type="radio"
                                  name="gender"
                                />{' '}
                                <Text
                                  className='default-text'
                                  style={{
                                    color: '#1F2041',
                                    textTransform: 'uppercase',
                                    fontFamily: 'Montserrat-Bold',
                                    fontSize: `${.6}rem`
                                  }}
                                >
                                  no binario {' '}
                                </Text>
                              </Label>
                            </FormGroup>
                          </>
                        )}
                      />
                    </div>
                    <div
                      style={{
                        flex: 1,
                        marginBottom: `${1}rem`,
                        marginRight: ['xs', 'sm'].includes(screenClass) ? 0 : '1rem'
                      }}
                    >
                      <Text
                        className='default-text'
                        style={{
                          color: '#1F2041',
                          textTransform: 'uppercase',
                          fontFamily: 'Montserrat-Bold',
                          fontSize: `${.6}rem`,
                          marginLeft: ['xs', 'sm'].includes(screenClass) ? `1.8rem` : 0 
                        }}
                      >
                        Cargo o profesión {' '}
                      </Text>
                      <Input
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        name='ocupation'
                        placeholder="Ingresa tu cargo o profesión"
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
                        name="ocupation"
                      >
                        {msg =>
                          <Text
                            className="default-text"
                            style={{
                              fontSize: ['xs', 'sm'].includes(screenClass) ? `${.6}rem` : `${.5}rem`,
                              color: '#FF3300',
                              paddingTop: `${.2}rem`,
                              marginLeft: ['xs', 'sm'].includes(screenClass) ? `${2}rem` : 0
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
                        marginBottom: `${1}rem`,
                        marginRight: ['xs', 'sm'].includes(screenClass) ? 0 : '1rem'
                      }}
                    >
                      <Text
                        className='default-text'
                        style={{
                          color: '#1F2041',
                          textTransform: 'uppercase',
                          fontFamily: 'Montserrat-Bold',
                          fontSize: `${.6}rem`,
                          marginLeft: ['xs', 'sm'].includes(screenClass) ? `1.8rem` : 0 
                        }}
                      >
                        Teléfono
                      </Text>
                      <Input
                        type="phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone}
                        name='phone'
                        placeholder="+99 999 99 99"
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
                        name="phone"
                      >
                        {msg =>
                          <Text
                            className="default-text"
                            style={{
                              fontSize: ['xs', 'sm'].includes(screenClass) ? `${.6}rem` : `${.5}rem`,
                              color: '#FF3300',
                              paddingTop: `${.2}rem`,
                              marginLeft: ['xs', 'sm'].includes(screenClass) ? `${2}rem` : 0
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
                        marginBottom: `${1}rem`,
                        marginRight: ['xs', 'sm'].includes(screenClass) ? 0 : '1rem',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <Text
                        className='default-text'
                        style={{
                          color: '#1F2041',
                          textTransform: 'uppercase',
                          fontFamily: 'Montserrat-Bold',
                          fontSize: `${.6}rem`,
                          marginLeft: ['xs', 'sm'].includes(screenClass) ? `1.8rem` : 0 
                        }}
                      >
                        País {' '}
                      </Text>
                      <Field
                        name='country_id'
                        as='select'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.country_id}
                        style={{
                          border: '1px solid #C4C4C4',
                          borderRadius: 5,
                          width: ['xs', 'sm'].includes(screenClass) ? `${86}%` : `${100}%`,
                          height: 30,
                          paddingRight: 10,
                          paddingLeft: 10,
                          marginTop: '.3rem',
                          marginLeft: ['xs', 'sm'].includes(screenClass) ? `${1.35}rem` : '.1rem'
                        }}
                      >
                        <option
                          value=""
                        >
                          Ingresa tu país
                        </option>
                        {props.countries.map((ct, i) => (
                          <option
                            key={i}
                            value={ct.id}
                          >
                            {ct.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="country_id"
                      >
                        {msg =>
                          <Text
                            className="default-text"
                            style={{
                              fontSize: ['xs', 'sm'].includes(screenClass) ? `${.6}rem` : `${.5}rem`,
                              color: '#FF3300',
                              paddingTop: `${.2}rem`,
                              marginLeft: ['xs', 'sm'].includes(screenClass) ? `${2}rem` : 0
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
                        marginBottom: `${1}rem`,
                        marginRight: ['xs', 'sm'].includes(screenClass) ? 0 : '1rem'
                      }}
                    >
                      <Text
                        className='default-text'
                        style={{
                          color: '#1F2041',
                          textTransform: 'uppercase',
                          fontFamily: 'Montserrat-Bold',
                          fontSize: `${.6}rem`,
                          marginLeft: ['xs', 'sm'].includes(screenClass) ? `1.8rem` : 0 
                        }}
                      >
                        Estado
                      </Text>
                      <Input
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.state}
                        name='state'
                        placeholder="Ingresa tu estado"
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
                        name="state"
                      >
                        {msg =>
                          <Text
                            className="default-text"
                            style={{
                              fontSize: ['xs', 'sm'].includes(screenClass) ? `${.6}rem` : `${.5}rem`,
                              color: '#FF3300',
                              paddingTop: `${.2}rem`,
                              marginLeft: ['xs', 'sm'].includes(screenClass) ? `${2}rem` : 0
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
                        marginBottom: `${1}rem`,
                        marginRight: ['xs', 'sm'].includes(screenClass) ? 0 : '1rem'
                      }}
                    >
                      <Text
                        className='default-text'
                        style={{
                          color: '#1F2041',
                          textTransform: 'uppercase',
                          fontFamily: 'Montserrat-Bold',
                          fontSize: `${.6}rem`,
                          marginLeft: ['xs', 'sm'].includes(screenClass) ? `1.8rem` : 0 
                        }}
                      >
                        Ciudad
                      </Text>
                      <Input
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.city}
                        name='city'
                        placeholder="Ingresa tu ciudad"
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
                        name="city"
                      >
                        {msg =>
                          <Text
                            className="default-text"
                            style={{
                              fontSize: ['xs', 'sm'].includes(screenClass) ? `${.6}rem` : `${.5}rem`,
                              color: '#FF3300',
                              paddingTop: `${.2}rem`,
                              marginLeft: ['xs', 'sm'].includes(screenClass) ? `${2}rem` : 0
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
                        marginBottom: `${1}rem`,
                        marginRight: ['xs', 'sm'].includes(screenClass) ? 0 : '1rem'
                      }}
                    >
                      <Text
                        className='default-text'
                        style={{
                          color: '#1F2041',
                          textTransform: 'uppercase',
                          fontFamily: 'Montserrat-Bold',
                          fontSize: `${.6}rem`,
                          marginLeft: ['xs', 'sm'].includes(screenClass) ? `1.8rem` : 0 
                        }}
                      >
                        dirección
                      </Text>
                      <Input
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address}
                        name='address'
                        placeholder="Ingresa tu dirección"
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
                        name="address"
                      >
                        {msg =>
                          <Text
                            className="default-text"
                            style={{
                              fontSize: ['xs', 'sm'].includes(screenClass) ? `${.6}rem` : `${.5}rem`,
                              color: '#FF3300',
                              paddingTop: `${.2}rem`,
                              marginLeft: ['xs', 'sm'].includes(screenClass) ? `${2}rem` : 0
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
                        marginBottom: `${1}rem`,
                        marginRight: ['xs', 'sm'].includes(screenClass) ? 0 : '1rem'
                      }}
                    >
                      <Text
                        className='default-text'
                        style={{
                          color: '#1F2041',
                          textTransform: 'uppercase',
                          fontFamily: 'Montserrat-Bold',
                          fontSize: `${.6}rem`,
                          marginLeft: ['xs', 'sm'].includes(screenClass) ? `1.8rem` : 0 
                        }}
                      >
                        Código postal
                      </Text>
                      <Input
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.zip_code}
                        name='zip_code'
                        placeholder="Ingresa tu código postal"
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
                        name="zip_code"
                      >
                        {msg =>
                          <Text
                            className="default-text"
                            style={{
                              fontSize: ['xs', 'sm'].includes(screenClass) ? `${.6}rem` : `${.5}rem`,
                              color: '#FF3300',
                              paddingTop: `${.2}rem`,
                              marginLeft: ['xs', 'sm'].includes(screenClass) ? `${2}rem` : 0
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
                        justifyContent: ['xs', 'sm'].includes(screenClass) ? 'center' : '',
                        marginTop: '1rem',
                        marginBottom: '1rem',
                        paddingRight: ['xs', 'sm'].includes(screenClass) ? '1rem' : 0,
                        paddingLeft: ['xs', 'sm'].includes(screenClass) ? '1rem' : 0
                      }}
                    >
                      <Input
                        type='checkbox'
                        name='terms'
                        value={values.terms}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <Text
                        className="default-text"
                        style={{
                          fontSize: ['xs', 'sm'].includes(screenClass) ? `${.6}rem` : `${.6}rem`,
                          color: '#1F2041',
                          fontWeight: 'bolder',
                          fontFamily: 'Montserrat-Bold',
                          paddingTop: `${.3}rem`,
                          textTransform: 'uppercase'
                        }}
                      >
                        Acepto los términos y condiciones descritos por tufirma.org
                      </Text>
                      <ErrorMessage
                        name="terms"
                      >
                        {msg =>
                          <Text
                            className="default-text"
                            style={{
                              fontSize: ['xs', 'sm'].includes(screenClass) ? `${.6}rem` : `${.5}rem`,
                              color: '#FF3300',
                              paddingTop: `${.2}rem`,
                              marginLeft: ['xs', 'sm'].includes(screenClass) ? `${2}rem` : 0
                            }}
                          >
                            {msg}
                          </Text>
                        }
                      </ErrorMessage>
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
                          width: `${12}rem`,
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
  countries: state.organization.countries,
  user: state.auth.user
})

export default connect(mapStateToProps)(Profile)