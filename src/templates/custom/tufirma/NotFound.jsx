import React from 'react'
import {Container, Row, Col, useScreenClass} from 'react-grid-system'

import Header from './Header'
import Campaign from './Campaign'
import Guia from './Guia'
import Footer from './Footer'
import Button from '../../../components/Button'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'

const NotFount = ({subdomain, history}) => {
  const screenClass = useScreenClass()

  const goHome = () => {
    history.replace(`/${subdomain}`)
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
            paddingRight: 0,
            paddingLeft: 0,
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#f7f7f7',
            paddingTop: '3rem',
            paddingBottom: '3rem',
          }}
        >
          <img
            src={require('./assets/notFound.jpeg')}
            alt="notFound"
            style={{
              width: '60%',
              height: ['xs', 'sm', 'md'].includes(screenClass) ? 'auto' : '32rem'
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
            justifyContent: 'center',
            paddingBottom: '3rem',
            backgroundColor: '#f7f7f7'
          }}
        >
          <Button
            onClick={() => goHome()}
            style={{
              width: 'auto',
              paddingRight: '1.5rem',
              paddingLeft: '1.5rem'
            }}
          >
            QUIERO FIRMAR UNA PETICIÓN
          </Button>
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

export default withRouter(connect(mapStateToProps)(NotFount))