import React, {useEffect} from 'react'

import ReactLoading from 'react-loading'
import {Container, Row, Col, useScreenClass} from 'react-grid-system'

import Routes from './router'

import * as AuthActions from './store/auth/actions'
import * as OrganizationActions from './store/organization/actions'
import * as PetitionsActions from './store/petitions/actions'

import {connect} from 'react-redux'

const App = ({dispatch, organization}) => {
  const screenClass = useScreenClass()


  useEffect(() => {
    dispatch(OrganizationActions.setSubdomain(window.location.pathname.split('/')[1]))
    dispatch(AuthActions.verifyToken())
    dispatch(OrganizationActions.getOrganizationInfo())
    dispatch(PetitionsActions.getPetitions())
    dispatch(PetitionsActions.getCategories())
    dispatch(OrganizationActions.getCountries())
  }, [window.location.pathname.split('/')[1]])


  return (
    <>
      {
        organization && organization.id ?
          <Routes />
        :
        (
          <Container
            fluid
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
                  justifyContent: 'center',
                  marginTop: ['xs', 'sm'].includes(screenClass) ? '60%' : '25%'
                }}
              >
              <ReactLoading
                type='spin'
                color='#FF3300'
                width='5rem'
              />
              </Col>
            </Row>
          </Container>
        )
      }
    </>
  )
}

const mapStateToProps = (state, store) => ({
  subdomain: state.organization.subdomain,
  organization: state.organization.organization
})
export default connect(mapStateToProps)(App)
