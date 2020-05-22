import React, {useState, useEffect} from 'react'
import {Row, Col, useScreenClass, Visible} from 'react-grid-system'
import {connect} from 'react-redux'

import {withRouter} from 'react-router-dom'

import {Card, CardBody} from 'reactstrap'
import Avatar from '../../../components/Avatar'
import Text from '../../../components/Text'
import Button from '../../../components/Button'

const Suggestions = ({ petitions, history, subdomain }) => {
  const screenClass = useScreenClass()

  const setCategoryImage = (category) => {
    return require('../../../assets/icons/tufirma/1.svg')
  }

  const viewPetition = async (petition_id) => {
    history.push(`/${subdomain}/campaign/${petition_id}`)
  }

  return (
    <>
      {
        petitions.length > 0 ?
        (

          <Row justify={'center'}>
            {
              petitions.map((petition, i) => (
                <Col
                  key={i}
                  xs={12}
                  sm={12}
                  md={10}
                  lg={10}
                  xl={10}
                >
                  <Card>
                    <CardBody>
                      <Row>
                        <Col
                          xs={12}
                          sm={12}
                          md={12}
                          lg={2.5}
                          xl={2.5}
                          style={{
                            display: ['xs', 'sm'].includes(screenClass) ? 'flex' : 'block',
                            justifyContent: 'center',
                            marginBottom: ['xs', 'sm', 'md'].includes(screenClass) ? '1rem' : 0,
                            zIndex: 6
                          }}
                        >
                          <img
                            src={petition.resources.length > 0 ? petition.resources[0] : require('./assets/catedral.png')}
                            alt="main"
                            style={{
                              borderRadius: '20px',
                              width: ['xs', 'sm', 'md'].includes(screenClass) ? '100%' : '10rem',
                              height: ['xs', 'sm', 'md'].includes(screenClass) ? '15rem' : '10rem'
                            }}
                          />
                        </Col>
                        <Col
                          xs={12}
                          sm={12}
                          md={12}
                          lg={9.5}
                          xl={9.5}
                        >
                          <Row>
                            <Col
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              xl={12}
                            >
                              <img
                                src={setCategoryImage(petition.category_id)}
                                alt="category"
                                style={{
                                  width: '2rem'
                                }}
                              />
                              <Text
                                className='default-text'
                                style={{
                                  marginLeft: '1rem',
                                  fontFamily: 'Montserrat-Bold',
                                  fontSize: ['xs', 'sm'].includes(screenClass) ? '1rem' : '1.5rem'
                                }}
                              >
                                {petition.name}
                              </Text>
                            </Col>
                            <Col
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              xl={12}
                              style={{
                                marginTop: '1rem'
                              }}
                            >
                              <Text
                                className='default-text'
                                style={{
                                  marginLeft: '1rem',
                                  fontSize: ['xs', 'sm'].includes(screenClass) ? '.6rem' : '.8rem'
                                }}
                              >
                                {petition.description}
                              </Text>
                            </Col>
                            <Col
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              xl={12}
                              style={{
                                marginTop: '1rem',
                                backgroundColor: '#F0F0F0',
                                paddingTop: '1rem',
                                paddingBottom: '1rem',
                                borderRadius: '0 0 10px 10px'
                              }}
                            >
                              <Row>
                                <Col
                                  xs={12}
                                  sm={12}
                                  md={3}
                                  lg={3}
                                  xl={3}
                                >
                                  <Row>
                                    <Col
                                      xs={12}
                                      sm={12}
                                      md={12}
                                      lg={3}
                                      xl={3}
                                      style={{
                                        display: ['xs', 'sm', 'md'].includes(screenClass) ? 'flex' : 'block',
                                        justifyContent: ['xs', 'sm', 'md'].includes(screenClass) ? 'center' : '',
                                        marginBottom: ['xs', 'sm', 'md'].includes(screenClass) ? '.7rem' : 0
                                      }}
                                    >
                                      <Avatar
                                        size={2}
                                        url={require('./assets/gallery.svg')}
                                      />
                                    </Col>
                                    <Col
                                      xs={12}
                                      sm={12}
                                      md={12}
                                      lg={9}
                                      xl={9}
                                      style={{
                                        display: ['xs', 'sm', 'md'].includes(screenClass) ? 'flex' : 'block',
                                        justifyContent: ['xs', 'sm', 'md'].includes(screenClass) ? 'center' : '',
                                        marginBottom: ['xs', 'sm', 'md'].includes(screenClass) ? '.5rem' : 0
                                      }}
                                    >
                                      <Text
                                        className='default-text'
                                        style={{
                                          color: '#676C77',
                                          fontSize: ['xs', 'sm'].includes(screenClass) ? '.5rem' : '.7rem'
                                        }}
                                      >
                                        por{' '}
                                        <Text
                                          className='default-text'
                                          style={{
                                            color: '#676C77',
                                            fontFamily: 'Montserrat-Bold',
                                            fontSize: ['xs', 'sm'].includes(screenClass) ? '.5rem' : '.7rem'
                                          }}
                                        >
                                          {`${petition.user.first_name} ${petition.user.last_name ?petition.user.last_name : ''}`} {' '}
                                        </Text>
                                      </Text>
                                    </Col>
                                  </Row>
                                </Col>
                                <Col
                                  xs={6}
                                  sm={6}
                                  md={3}
                                  lg={3}
                                  xl={3}
                                >
                                  <img
                                    src={require('./assets/signature.svg')}
                                    alt="clock"
                                    style={{
                                      width: '1.2rem',
                                      marginRight: '1rem'
                                    }}
                                  />
                                  <Text
                                    className='default-text'
                                    style={{
                                      color: '#676C77',
                                      fontFamily: 'Montserrat-Bold',
                                      fontSize: ['xs', 'sm'].includes(screenClass) ? '.5rem' : '.7rem'
                                    }}
                                  >
                                    {petition.signatures} firmas{' '}
                                    <Text
                                      className='default-text'
                                      style={{
                                        color: '#676C77',
                                        fontSize: ['xs', 'sm'].includes(screenClass) ? '.5rem' : '.7rem'
                                      }}
                                    >
                                      de {parseInt(petition.amount_goal)}
                                    </Text>
                                  </Text>
                                </Col>
                                <Col
                                  xs={6}
                                  sm={6}
                                  md={3}
                                  lg={3}
                                  xl={3}
                                >
                                  <img
                                    src={require('./assets/clock.svg')}
                                    alt="clock"
                                    style={{
                                      width: '1.2rem',
                                      marginRight: '1rem'
                                    }}
                                  />
                                  <Text
                                    className='default-text'
                                    style={{
                                      color: '#676C77',
                                      fontFamily: 'Montserrat-Bold',
                                      fontSize: ['xs', 'sm'].includes(screenClass) ? '.5rem' : '.7rem'
                                    }}
                                  >
                                    {petition.publishing_date}
                                  </Text>
                                </Col>
                                <Col
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  lg={3}
                                  xl={3}
                                  style={{
                                    marginTop: ['xs', 'sm', 'md'].includes(screenClass) ? '1rem' : 0
                                  }}
                                >
                                  <Button
                                    onClick={() => viewPetition(petition.id)}
                                    style={{
                                      width: ['xs', 'sm', 'md'].includes(screenClass) ? '100%' : '8rem'
                                    }}
                                  >
                                    FIRMAR AHORA
                                  </Button>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              ))
            }
          </Row>
        )
        :
        (
          <div />
        )
      }
    </>
  )
}

const mapStateToProps = (state, store) => ({
  petitions: state.petitions.petitions,
  subdomain: state.organization.subdomain
})

export default withRouter(connect(mapStateToProps)(Suggestions))