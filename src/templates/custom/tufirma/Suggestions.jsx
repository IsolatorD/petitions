import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

import {Row, Col, useScreenClass} from 'react-grid-system'
import {connect} from 'react-redux'

import {withRouter} from 'react-router-dom'

import {Card, CardBody} from 'reactstrap'
import Avatar from '../../../components/Avatar'
import Text from '../../../components/Text'
import Button from '../../../components/Button'

const Suggestions = ({ petitions, history, subdomain, title, category, pId }) => {
  const screenClass = useScreenClass()
  const [threePetitions, setThreePetitions] = useState([])

  const setCategoryImage = (category) => {
    switch(category) {
      case 'Defensa de la vida':
        return require('../../../assets/icons/tufirma/1.svg')
      case 'Libertad Religiosa':
        return require('../../../assets/icons/tufirma/2.svg')
      case 'Apoyo a sacerdotes o religiosos':
        return require('../../../assets/icons/tufirma/3.svg')
      case 'Catedrales monumentos y parroquias':
        return require('../../../assets/icons/tufirma/4.svg')
      case 'Peticiones a politicos':
        return require('../../../assets/icons/tufirma/5.svg')
      case 'Educación':
        return require('../../../assets/icons/tufirma/6.svg')
      case 'Apoyo a movimientos de la iglesia':
        return require('../../../assets/icons/tufirma/7.svg')
      case 'Culto':
        return require('../../../assets/icons/tufirma/8.svg')
      case 'Otras':
        return require('../../../assets/icons/tufirma/9.svg')
    }
  }

  const viewPetition = async (petition_id) => {
    history.push(`/${subdomain}/campaign/${petition_id}`)
  }

  useEffect(() => {
    const tpetition = []
    if (petitions.length > 0) {
      let contador = 1
      petitions.map((p, i) => {
        if (contador <= 3) {
          if (pId) {
            if (p.id !== pId) {
              if (category) {
                if (p.category_id === category) {
                  tpetition.push(p)
                  contador++
                }
              } else {
                tpetition.push(p)
                contador++
              }
            }
          } else {
            if (category) {
              if (p.category_id === category) {
                tpetition.push(p)
                contador++
              }
            } else {
              tpetition.push(p)
              contador++
            }
          }
        }
      })
    }

    setThreePetitions(tpetition)
  }, [petitions, category])

  return (
    <>
      {
        threePetitions.length > 0 ?
        (
          <>
            {
              title &&
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={10}
                xl={10}
                style={{
                  marginBottom: '1rem',
                  paddingLeft: ['xs', 'sm', 'md'].includes(screenClass) ? '15px' : '6rem',
                  display: ['xs', 'sm', 'md'].includes(screenClass) ? 'flex' : 'block',
                  justifyContent: ['xs', 'sm', 'md'].includes(screenClass) ? 'center' : ''
                }}
              >
                <Text
                  className='default-title'
                  style={{
                    fontSize: '1.7rem',
                    color: '#333333',
                    textAlign: 'center'
                  }}
                >
                  {title}
                </Text>
              </Col>
            }
            <Row justify={'center'}>
              {
                threePetitions.map((petition, i) => (
                  <Col
                    key={i}
                    xs={12}
                    sm={12}
                    md={10}
                    lg={10}
                    xl={10}
                    style={{
                      marginBottom: '1rem'
                    }}
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
                                  src={setCategoryImage(petition.category)}
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
                                          // url={require('./assets/gallery.svg')}
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
          </>
        )
        :
        (
          <div />
        )
      }
    </>
  )
}

Suggestions.propTypes = {
  title: PropTypes.string
}

Suggestions.defaultProps = {
  title: null
}

const mapStateToProps = (state, store) => ({
  petitions: state.petitions.petitions,
  subdomain: state.organization.subdomain
})

export default withRouter(connect(mapStateToProps)(Suggestions))