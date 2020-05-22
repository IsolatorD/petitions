import React from 'react'
import {Row, Col, useScreenClass} from 'react-grid-system'
import Text from '../../../components/Text'
import Button from '../../../components/Button'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import TermsFooter from './TermsFooter'
import { connect } from 'react-redux'

const Footer = ({ categories }) => {
  const screenClass = useScreenClass()
  return (
    <>
      <Row>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          lx={12}
          style={{
            backgroundColor: '#F0F0F0',
            height: 'auto',
            paddingTop: ['xs', 'sm'].includes(screenClass) ? `${1}rem` : `${2.5}rem`,
            paddingBottom: `${1}rem`,
            paddingLeft: ['xs', 'sm'].includes(screenClass) ? `${15}px` : `${7}rem`
          }}
        >
          <Row>
            <Col
              xs={12}
              sm={12}
              md={5}
              lg={5}
              xl={5}
            >
              <Row>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  style={{
                    textAlign: ['xs', 'sm'].includes(screenClass) ? 'center' : ''
                  }}
                >
                  <img
                    src={require('./assets/logo2.svg')}
                    alt="logo2"
                    style={{
                      width: ['xs', 'sm'].includes(screenClass) ? `${15}rem` : `${13}rem`
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
                    paddingTop: `${.5}rem`,
                    paddingBottom: `${1}rem`
                  }}
                >
                  <Text
                    className="default-text"
                    style={{
                      fontSize: ['xs', 'sm'].includes(screenClass) ? `${.7}rem` : `${.7}rem`,
                      fontWeight: 'bolder',
                      color: '#676C77'
                    }}
                  >
                    Religión en Libertad es propiedad de la Fundación Nueva Evangelización para el siglo XXI, una fundación formada exclusivamente por seglares católicos, que son padres de familia y tienen distintas sensibilidades espirituales.
                  </Text>
                </Col>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  
                >
                  <Button
                    style={{
                      marginBottom: `${1}rem`
                    }}
                  >
                    FIRMAR AHORA
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col
              
              xs={12}
              sm={12}
              md={1.5}
              lg={1.5}
              xl={1.5}
            >
              <Text
                className="default-text"
                style={{
                  fontSize: ['xs', 'sm'].includes(screenClass) ? `${.7}rem` : `${.8}rem`,
                  fontWeight: 'bolder',
                  color: 'black',
                  textDecoration: 'underline',
                  fontFamily: 'Montserrat-ExtraBold'
                }}
              >
                Recursos
              </Text>
              <div>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0
                  }}
                >
                  <li
                    style={{
                      marginBottom: `${.4}rem`
                    }}
                  >
                    <Text
                      className="default-text"
                      style={{
                        fontSize: ['xs', 'sm'].includes(screenClass) ? `${.5}rem` : `${.7}rem`,
                        fontWeight: 'bolder',
                        color: 'black'
                      }}
                    >
                      Blog
                    </Text>
                  </li>
                  <li
                    style={{
                      marginBottom: `${.4}rem`
                    }}
                  >
                    <Text
                      className="default-text"
                      style={{
                        fontSize: ['xs', 'sm'].includes(screenClass) ? `${.5}rem` : `${.7}rem`,
                        fontWeight: 'bolder',
                        color: 'black'
                      }}
                    >
                      Ayuda y Soporte
                    </Text>
                  </li>
                  <li
                    style={{
                      marginBottom: `${.4}rem`
                    }}
                  >
                    <Text
                      className="default-text"
                      style={{
                        fontSize: ['xs', 'sm'].includes(screenClass) ? `${.5}rem` : `${.7}rem`,
                        fontWeight: 'bolder',
                        color: 'black'
                      }}
                    >
                      Prensa
                    </Text>
                  </li>
                </ul>
              </div>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={1.5}
              lg={1.5}
              xl={1.5}
            >
              <Text
                className="default-text"
                style={{
                  fontSize: ['xs', 'sm'].includes(screenClass) ? `${.7}rem` : `${.8}rem`,
                  fontWeight: 'bolder',
                  color: 'black',
                  textDecoration: 'underline',
                  fontFamily: 'Montserrat-ExtraBold'
                }}
              >
                Explorar
              </Text>
              <div>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0
                  }}
                >
                  <li
                    style={{
                      marginBottom: `${.4}rem`
                    }}
                  >
                    <Text
                      className="default-text"
                      style={{
                        fontSize: ['xs', 'sm'].includes(screenClass) ? `${.5}rem` : `${.7}rem`,
                        fontWeight: 'bolder',
                        color: 'black'
                      }}
                    >
                      Como trabajamos
                    </Text>
                  </li>
                  <li
                    style={{
                      marginBottom: `${.4}rem`
                    }}
                  >
                    <Text
                      className="default-text"
                      style={{
                        fontSize: ['xs', 'sm'].includes(screenClass) ? `${.5}rem` : `${.7}rem`,
                        fontWeight: 'bolder',
                        color: 'black'
                      }}
                    >
                      Log in
                    </Text>
                  </li>
                  <li
                    style={{
                      marginBottom: `${.4}rem`
                    }}
                  >
                    <Text
                      className="default-text"
                      style={{
                        fontSize: ['xs', 'sm'].includes(screenClass) ? `${.5}rem` : `${.7}rem`,
                        fontWeight: 'bolder',
                        color: 'black'
                      }}
                    >
                      Registrate
                    </Text>
                  </li>
                  <li
                    style={{
                      marginBottom: `${.4}rem`
                    }}
                  >
                    <Text
                      className="default-text"
                      style={{
                        fontSize: ['xs', 'sm'].includes(screenClass) ? `${.5}rem` : `${.7}rem`,
                        fontWeight: 'bolder',
                        color: 'black'
                      }}
                    >
                      Contáctanos
                    </Text>
                  </li>
                </ul>
              </div>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={1.5}
              lg={1.5}
              xl={1.5}
            >
              <Text
                className="default-text"
                style={{
                  fontSize: ['xs', 'sm'].includes(screenClass) ? `${.7}rem` : `${.8}rem`,
                  fontWeight: 'bolder',
                  color: 'black',
                  textDecoration: 'underline',
                  fontFamily: 'Montserrat-ExtraBold'
                }}
              >
                Categorías
              </Text>
              <div>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0
                  }}
                >
                  {categories.map((ct, i) => (
                    <li
                      key={i}
                      style={{
                        marginBottom: `${.4}rem`
                      }}
                    >
                      <Text
                        className="default-text"
                        style={{
                          fontSize: ['xs', 'sm'].includes(screenClass) ? `${.5}rem` : `${.6}rem`,
                          fontWeight: 'bolder',
                          color: 'black'
                        }}
                      >
                        {ct.name}
                      </Text>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={2.5}
              lg={2.5}
              xl={2.5}
            >
              <Text
                className="default-text"
                style={{
                  fontSize: ['xs', 'sm'].includes(screenClass) ? `${.7}rem` : `${.8}rem`,
                  fontWeight: 'bolder',
                  color: 'black',
                  textDecoration: 'underline',
                  fontFamily: 'Montserrat-ExtraBold'
                }}
              >
                Redes sociales
              </Text>
              <div
                style={{
                  marginTop: `${.5}rem`,
                  marginBottom: ['xs', 'sm'].includes(screenClass) ? `${1}rem` : `${8}rem`
                }}
              >
                <FontAwesomeIcon
                  icon={['fab', 'twitter']}
                  color={'#FF3300'}
                />
                <FontAwesomeIcon
                  icon={['fab', 'instagram']}
                  color={'#FF3300'}
                  style={{
                    marginLeft: `${1.4}rem`
                  }}
                />
                <FontAwesomeIcon
                  icon={['fab', 'facebook-square']}
                  color={'#FF3300'}
                  style={{
                    marginLeft: `${1.4}rem`
                  }}
                />
              </div>
              <div>
                <img
                  src={require('./assets/logo.svg')}
                  alt="logo"
                  style={{
                    width: `${6}rem`
                  }}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <TermsFooter />
    </>
  )
}

const mapStateToProps = (state, store) => ({
  categories: state.petitions.categories
})

export default connect(mapStateToProps)(Footer)