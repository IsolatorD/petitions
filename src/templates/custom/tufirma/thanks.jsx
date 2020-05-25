import React from 'react'
import {
  Container,
  Row,
  Col,
  Visible,
  useScreenClass
} from 'react-grid-system'

import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon
} from 'react-share'

import Card from '../../../components/Card'
import Button from '../../../components/Button'
import Text from '../../../components/Text'

import './index.css'

import Header from './Header'
import Campaign from './Campaign'
import Guia from './Guia'
import Footer from './Footer'

const TuFirmaThanks = () => {
  const screenClass = useScreenClass()

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
          md={7}
          lg={7}
          xl={7}
          style={{
            paddingLeft: ['xs', 'sm'].includes(screenClass) ? `${15}px` : `${2.5}rem`,
            paddingTop: `${.7}rem`
          }}
        >
          <Text
            className="default-title"
            style={{
              fontSize: ['xs', 'sm'].includes(screenClass) ? `${2}rem` : `${2.2}rem`,
              fontWeight: 'bolder',
              color: '#000000',
              textTransform: 'uppercase'
            }}
          >
            FELIPE
            <Text
              className="default-title"
              style={{
                fontSize: ['xs', 'sm'].includes(screenClass) ? `${2}rem` : `${2.2}rem`,
                fontWeight: 'bolder',
                color: '#FF3300',
                display: 'block',
                textTransform: 'uppercase'
              }}
            >
              ¡gracias por tu firma!
            </Text>
          </Text>
        </Col>
        <Col
          md={3.5}
          lg={3}
          xl={2.5}
          style={{
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            zIndex: 6,
            top: ['md', 'lg', 'xl'].includes(screenClass) ? `${7}rem` : screenClass === 'xs' ? `${24}rem` : `${27}rem`,
            right: ['lg', 'xl'].includes(screenClass) ? `${3.5}rem` : ['xs', 'sm'].includes(screenClass) ? 0 : `${.5}rem`
          }}
        >
          <Card
            className="tf-search-box"
            style={{
              width: `${80}%`,
              height: ['md', 'lg', 'xl'].includes(screenClass) ? `${13}rem` : screenClass === 'xs' ? `${9}rem` : `${10}rem`,
              paddingTop: ['xs', 'sm'].includes(screenClass) ? `${.7}rem` : `${1}rem`,
              paddingLeft: `${2}rem`,
              paddingRight: `${2}rem`,
              paddingBottom: ['xs', 'sm'].includes(screenClass) ? `${.7}rem` : `${1}rem`,
              backgroundColor: '#FFC000'
            }}
          >
            <Row>
              <Col
                md={12}
                lg={12}
                xl={12}
              >
                <Text
                  className="default-title"
                  style={{
                    fontSize: ['xs', 'sm'].includes(screenClass) ? `${1.3}rem` : `${1.1}rem`,
                    color: '#000000'
                  }}
                >
                  Contigo ya <br/> somos
                </Text>
              </Col>
              <hr
                style={{
                  width: `${90}%`,
                  backgroundColor: '#000000',
                  border: '1px solid'
                }}
              />
              <Col
                md={12}
                lg={12}
                xl={12}
              >
                <Text
                  className="default-title"
                  style={{
                    fontSize: ['xs', 'sm'].includes(screenClass) ? `${2}rem` : `${2}rem`,
                    fontWeight: 'bolder',
                    color: '#000000',
                    fontFamily: 'Montserrat-ExtraBold'
                  }}
                >
                  8250 <br/>firmas
                </Text>
              </Col>
            </Row>
          </Card>
        </Col>
        <Visible
          md
          lg
          xl
        >
          <Col
            md={5}
            lg={5}
            xl={5}
          >
            <img
              src={require('./assets/green_check.svg')}
              alt="green_check"
              style={{
                width: `${4}rem`
              }}
            />
          </Col>
        </Visible>
        <Visible
          xs
          sm
        >
          <Col
            xs={12}
            sm={12}
            style={{
              paddingTop: `${1.5}rem`,
              paddingLeft: 0,
              paddingRight: 0
            }}
          >
            <img
              src={require('./assets/capilla.png')}
              alt="campaign_image"
              style={{
                width: `${100}%`,
                height: `${12.5}rem`
              }}
            />
          </Col>
        </Visible>
      </Row>
      <Row>
        <Col
          xs={12}
          sm={12}
          md={5}
          lg={5}
          xl={5}
          style={{
            paddingLeft: ['xs', 'sm'].includes(screenClass) ? `${15}px` : `${2.5}rem`,
            paddingTop: ['xs', 'sm'].includes(screenClass) ? `${7.3}rem` : `${4}rem`,
            paddingBottom: `${2}rem`
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
                className="default-text"
                style={{
                  fontSize: ['xs', 'sm'].includes(screenClass) ? `${1}rem` : `${.9}rem`,
                  fontWeight: 'bolder',
                  color: '#484848'
                }}
              >
                Con tu aporte Jonathan Mora podrá tener “APOYO” para “RECUPEREMOS LA IGLESIA DE SANTA LUCIA”.
              </Text>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              style={{
                paddingTop: `${1.5}rem`,
                paddingBottom: `${1.5}rem`
              }}
            >
              <Text
                className="default-text"
                style={{
                  fontSize: ['xs', 'sm'].includes(screenClass) ? `${1}rem` : `${.9}rem`,
                  fontWeight: 'bolder',
                  color: '#484848'
                }}
              >
                Comparte esta campaña para que personas como tú puedan apoyar está campaña.
              </Text>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
            >
              <Row>
                <Col
                  xs={4}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                  style={{
                    padding: ['xs', 'sm'].includes(screenClass) ? `${5}px` : `${15}px`
                  }}
                >
                  <Card
                    style={{
                      width: `${100}%`,
                      height: `${6}rem`,
                      boxShadow: `0px 10px 20px rgba(31, 32, 65, 0.2)`,
                      borderRadius: '4px',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}
                  >
                    <TwitterShareButton>
                      <TwitterIcon
                        size={32}
                        round
                      />
                    </TwitterShareButton>
                    <Text
                      className="default-text"
                      style={{
                        fontSize: ['xs', 'sm'].includes(screenClass) ? `${.8}rem` : `${.9}rem`,
                        fontWeight: 'bolder',
                        color: '#1F2041'
                      }}
                    >
                      Compartir
                    </Text>
                  </Card>
                </Col>
                <Col
                  xs={4}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                  style={{
                    padding: ['xs', 'sm'].includes(screenClass) ? `${5}px` : `${15}px`
                  }}
                >
                  <Card
                    style={{
                      width: `${100}%`,
                      height: `${6}rem`,
                      boxShadow: `0px 10px 20px rgba(31, 32, 65, 0.2)`,
                      borderRadius: '4px',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}
                  >
                    <FacebookShareButton>
                      <FacebookIcon
                        size={32}
                        round
                      />
                    </FacebookShareButton>
                    <Text
                      className="default-text"
                      style={{
                        fontSize: ['xs', 'sm'].includes(screenClass) ? `${.8}rem` : `${.9}rem`,
                        fontWeight: 'bolder',
                        color: '#1F2041'
                      }}
                    >
                      Compartir
                    </Text>
                  </Card>
                </Col>
                <Col
                  xs={4}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                  style={{
                    padding: ['xs', 'sm'].includes(screenClass) ? `${5}px` : `${15}px`
                  }}
                >
                  <Card
                    style={{
                      width: `${100}%`,
                      height: `${6}rem`,
                      boxShadow: `0px 10px 20px rgba(31, 32, 65, 0.2)`,
                      borderRadius: '4px',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}
                  >
                    <WhatsappShareButton>
                      <WhatsappIcon
                        round
                        size={32}
                      />
                    </WhatsappShareButton>
                    <Text
                      className="default-text"
                      style={{
                        fontSize: ['xs', 'sm'].includes(screenClass) ? `${.8}rem` : `${.9}rem`,
                        fontWeight: 'bolder',
                        color: '#1F2041'
                      }}
                    >
                      Compartir
                    </Text>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Visible
              md
              lg
              xl
            >
              <Col
                md={10}
                lg={7}
                xl={7}
                style={{
                  paddingTop: `${2}rem`
                }}
              >
                <Button
                  style={{
                    width: `${100}%`,
                    fontSize: `${1}rem`
                  }}
                >
                  QUIERO INICIAR MI CAMPAÑA
                </Button>
              </Col>
            </Visible>
          </Row>
        </Col>
        <Visible
          md
          lg
          xl
        >
          <Col
            md={7}
            lg={7}
            xl={7}
            style={{
              paddingTop: `${1.5}rem`,
              paddingRight: 0
            }}
          >
            <img
              src={require('./assets/capilla.png')}
              alt="campaign_image"
              style={{
                width: `${100}%`,
                height: `${24}rem`
              }}
            />
          </Col>
        </Visible>
      </Row>
      <Campaign />
      <Guia />
      <Footer />
    </Container>
  )
}

export default TuFirmaThanks