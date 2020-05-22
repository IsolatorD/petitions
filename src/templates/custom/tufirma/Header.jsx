import React from 'react'
import {Row, Col, useScreenClass, Visible} from 'react-grid-system'
import {Link, withRouter} from 'react-router-dom'

import Logo from './assets/logo.svg'
import Button from '../../../components/Button'
import Text from '../../../components/Text'
import Dropdown from '../../../components/Dropdown'

import {connect} from 'react-redux'

const Header = (props) => {
  const screenClass = useScreenClass()

  const toCampaign = () => {
    if (props.user) {
      props.history.push(`/${props.subdomain}/publish`)
    } else {
      props.history.push(`/${props.subdomain}/login`)
    }
  }
  return (
    <Row>
      <Col
        xs={5}
        sm={5}
        md={6.5}
        lg={6.5}
        xl={6.5}
        style={{
          paddingLeft: ['xs', 'sm'].includes(screenClass) ? `${15}px` : `${2.5}rem`
        }}
      >
        <img
          onClick={() => {
            if (props.location.pathname !== `/${props.subdomain}`) {
              props.history.push(`/${props.subdomain}`)
            }
          }}
          src={Logo}
          alt={'TuFirma.org'}
          style={{
            marginTop: props.isDash ? 0 : ['xs', 'sm'].includes(screenClass) ? `${15}px` : `${1.5}rem`,
            cursor: 'pointer',
            width: props.isDash ? '70px' : '100px',
            height: props.isDash ? '70px' : '100px'
          }}
        />
      </Col>
      <Col
        xs={7}
        sm={7}
        md={5.5}
        lg={5.5}
        xl={5.5}
      >
        <Row>
          <Visible md lg xl>
            <Col 
              xs={12}
              sm={12}
              md={6}
              lg={7}
              xl={7}
              style={{
                marginTop: 10
              }}
            >
              <ul
                className="tf-nav"
              >
                <Text
                  className="tf-nav-item default-text"
                  style={{
                    marginTop: 2,
                    fontSize: `${.6}rem`,
                    fontWeight: 'bolder',
                    textTransform: 'uppercase',
                    fontFamily: 'Montserrat-ExtraBold'
                  }}
                >
                  Contactenos
                </Text>
                {
                  props.user ? 
                  (
                    <Link
                      to={`/${props.subdomain}/mypetitions`}
                      className="tf-nav-item default-text"
                      style={{
                        marginTop: 2,
                        fontSize: `${.6}rem`,
                        fontWeight: 'bolder',
                        textTransform: 'uppercase',
                        fontFamily: 'Montserrat-ExtraBold',
                        textDecoration: 'none'
                      }}
                    >
                      mis peticiones
                    </Link>
                  )
                  :
                  (
                    <Link
                      to={`/${props.subdomain}/login`}
                      className="tf-nav-item default-text"
                      style={{
                        marginTop: 2,
                        fontSize: `${.6}rem`,
                        fontWeight: 'bolder',
                        textTransform: 'uppercase',
                        fontFamily: 'Montserrat-ExtraBold',
                        textDecoration: 'none'
                      }}
                    >
                      Iniciar Sesión
                    </Link>
                  )
                }
              </ul>
            </Col>
          </Visible>
          <Col
            xs={11}
            sm={11}
            md={6}
            lg={5}
            xl={5}
            style={{
              marginTop: 20,
              padding: 0,
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Button
              onClick={() => toCampaign()}
            >
              Crea ya tu campaña
            </Button>
            <Visible xs sm>
              <Dropdown
                style={{
                  marginLeft: `${1}rem`
                }}
              >
                <Text
                  className="default-text"
                  style={{
                    fontSize: `${.65}rem`,
                    fontWeight: 'bolder',
                    textTransform: 'uppercase'
                  }}
                >
                  Contactenos
                </Text>
                {
                  props.user ? 
                  (
                    <Link
                      to={`/${props.subdomain}/mypetitions`}
                      className="default-text"
                      style={{
                        fontSize: `${.65}rem`,
                        fontWeight: 'bolder',
                        textTransform: 'uppercase',
                        textDecoration: 'none'
                      }}
                    >
                      mis peticiones
                    </Link>
                  )
                  :
                  (
                    <Link
                      to={`/${props.subdomain}/login`}
                      className="default-text"
                      style={{
                        fontSize: `${.65}rem`,
                        fontWeight: 'bolder',
                        textTransform: 'uppercase',
                        textDecoration: 'none'
                      }}
                    >
                      Iniciar Sesión
                    </Link>
                  )
                }
              </Dropdown>
            </Visible>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

const mapStateToProps = (state, store) => ({
  subdomain: state.organization.subdomain,
  user: state.auth.user
})

export default withRouter(connect(mapStateToProps)(Header))