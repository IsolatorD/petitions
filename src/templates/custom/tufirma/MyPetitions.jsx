import React, {useEffect} from 'react'
import {Container, Row, Col, useScreenClass} from 'react-grid-system'

import {connect} from 'react-redux'

import Header from './Header'
import Suggestions from './Suggestions'
import Footer from './Footer'

import Text from '../../../components/Text'
import Button from '../../../components/Button'

import {
  Card,
  CardBody
} from 'reactstrap'

import * as AuthActions from '../../../store/auth/actions'
import { withRouter } from 'react-router-dom'

const MyPetitions = ({petitions, dispatch, user}) => {
  const screenClass = useScreenClass()

  useEffect(() => {
    console.log('Petitions: ', petitions)
  }, [petitions])

  useEffect(() => {
    if (user) {
      dispatch(AuthActions.getMyPetitions())
    }
  }, [user])

  return (
    <Container
      fluid
      style={{
        overflowX: 'hidden'
      }}
    >
      <Header isDash={true} />
      <Row>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{
            paddingLeft: ['xs', 'sm'].includes(screenClass) ? '15px' : '2.5rem',
            marginTop: '3rem',
            marginBottom: '3rem'
          }}
        >
          <Text
            className='default-text'
            style={{
              textTransform: 'uppercase',
              fontFamily: 'Montserrat-Bold',
              fontSize: ['xs', 'sm'].includes(screenClass) ? '1rem' : '1.6rem'
            }}
          >
            mis peticiones
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
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '5rem'
          }}
        >
          <Row>
            {
              petitions.length > 0 ?
                petitions.map((petition, i) => (
                  <Col
                    key={i}
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                  >
                    <Card>
                      <CardBody>
                        {petition.name}
                      </CardBody>
                    </Card>
                  </Col>
                ))
              :
                (
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
                      className='default-text'
                      style={{
                        fontSize: ['xs', 'sm'].includes(screenClass) ? '.8rem' : '1rem'
                      }}
                    >
                      No tienes ninguna petición publicada, te invitamos a crear una.
                    </Text>
                  </Col>
                )
            }
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
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '.5rem'
          }}
        >
          <Text
            className='default-text'
            style={{
              fontSize: ['xs', 'sm'].includes(screenClass) ? '1rem' : '1.2rem'
            }}
          >
            ¿Quieres crear más peticiones?
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
            marginBottom: '1.5rem'
          }}
          >
          <Text
            className='default-text'
            style={{
              fontSize: ['xs', 'sm'].includes(screenClass) ? '.8rem' : '.9rem',
              color: '#6A6C72'
            }}
          >
            Muchas de esas causas pueden tener un líder como tú.
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
            marginBottom: '5rem'
          }}
        >
          <Button>
            CREAR PETICIÓN
          </Button>
        </Col>
      </Row>
      <Suggestions
        title='Peticiones que también puedes apoyar'
      />
      <Footer />
    </Container>
  )
}

const mapStateToProps = (state, store) => ({
  subdomain: state.organization.subdomain,
  user: state.auth.user,
  petitions: state.auth.petitions
})

export default withRouter(connect(mapStateToProps)(MyPetitions))