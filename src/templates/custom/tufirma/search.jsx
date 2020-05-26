import React, {useState, useEffect} from 'react'
import {Container, Row, Col, Visible, useScreenClass} from 'react-grid-system'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

import Header from './Header'
import Campaign from './Campaign'
import Guia from './Guia'
import Footer from './Footer'

import Text from '../../../components/Text'
import Input from '../../../components/Input'
import Button from '../../../components/Button'

import { useQuery } from '../../../helpers'

import {
  Card,
  CardBody
} from 'reactstrap'

const Search = ({petitions, subdomain, history}) => {
  const screenClass = useScreenClass()
  let query = useQuery()

  const [search, setSearch] = useState('')
  const [invalidSearch, setInvalidSearch] = useState(false)
  const [result, setResult] = useState([])
  const [searchNotFound, setSearchNotFound] = useState(false)

  useEffect(() => {
    if (query.get('q')) {
      setSearch(query.get('q'))
      searchData(query.get('q'))
    }
  }, [query.get('q'), petitions])

  const searchData = (searchQuery = null) => {
    let s = searchQuery || search
    if (s === '') {
      setInvalidSearch(true)
    } else {
      setInvalidSearch(false)
      const searchResults = petitions.filter(f => {
        if (f.name.toLowerCase().includes(s.toLowerCase())) {
          return f
        }
      })
      if (searchResults.length > 0) {
        setSearchNotFound(false)
      } else {
        setSearchNotFound(true)
      }
      setResult(searchResults)
    }
  }

  const viewPetition = async (petition_id) => {
    history.push(`/${subdomain}/campaign/${petition_id}`)
  }

  return (
    <Container
      fluid
      style={{
        overflowX: 'hidden'
      }}
    >
      <Header/>
      <Row>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{
            paddingLeft: ['xs', 'sm'].includes(screenClass) ? '15px' : '2rem',
            marginBottom: '3rem'
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
                marginBottom: '2rem'
              }}
            >
              <Text
                className='default-title'
                style={{
                  fontSize: ['xs', 'sm'].includes(screenClass) ? '1.5rem' : '2rem'
                }}
              >
                Resultados de tu busqueda
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
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  style={{
                    marginBottom: '1rem'
                  }}
                >
                  <Row>
                    <Col
                      xs={10}
                      sm={10}
                      md={10}
                      lg={11}
                      xl={11}
                      style={{
                        paddingRight: 0,
                      }}
                    >
                      <Input
                        onChange={(event) => setSearch(event.target.value)}
                        name='search'
                        value={search}
                        placeholder="Escribe tu busqueda aqui"
                        width={['xs', 'sm'].includes(screenClass) ? `${100}%` : `${100}%`}
                        style={{
                          borderTop: 'none',
                          borderRight: 'none',
                          borderLeft: 'none',
                          borderBottom: '1px solid #C4C4C4',
                          width: ['xs', 'sm'].includes(screenClass) ? `${100}%` : `${100}%`,
                          height: 50,
                          paddingRight: 10,
                          paddingLeft: 10
                        }}
                      />
                      {invalidSearch &&
                        <Text
                          className='default-text'
                          style={{
                            color: '#FF3300',
                            fontSize: '.8rem'
                          }}
                        >
                          Ingresa tu busqueda
                        </Text>
                      }
                    </Col>
                    <Col
                      xs={2}
                      sm={2}
                      md={2}
                      lg={1}
                      xl={1}
                      style={{
                        paddingLeft: 0,
                      }}
                    >
                      <Button
                        onClick={() => searchData()}
                        style={{
                          right: `${2.4}rem`,
                          display: 'inline-block',
                          // position: 'absolute',
                          width: '2.5rem',
                          height: '2.5rem',
                          cursor: 'pointer'
                        }}
                      >
                        <img
                          src={require('./assets/search.svg')}
                          alt="search"
                          style={{
                            width: '1rem'
                          }}
                        />
                      </Button>
                    </Col>
                  </Row>
                </Col>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                >
                  <Text
                    className='default-text'
                    style={{
                      fontSize: ['xs', 'sm'].includes(screenClass) ? '.8rem' : '1.2rem',
                      marginLeft: ['xs', 'sm'].includes(screenClass) ? '1rem' : '2rem',
                      fontFamily: 'Montserrat-Bold',
                      color: '#676C77'
                    }}
                  >
                    {result.length} resultados
                  </Text>
                </Col>
              </Row>
            </Col>
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
            paddingLeft: ['xs', 'sm'].includes(screenClass) ? '15px' : '2rem',
            marginBottom: '2rem'
          }}
        >
          <Row>
            {
              !searchNotFound ?
                result.map((res, i) => (
                  <Col
                    key={i}
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    style={{
                      marginBottom: '1rem'
                    }}
                  >
                    <Card>
                      <CardBody>
                        <Row>
                          <Col
                            xs={6}
                            sm={6}
                            md={2.5}
                            lg={2.5}
                            xl={2.5}
                          >
                            {
                              res.resources.length > 0 ?
                              (
                                <img
                                  src={res.resources[0]}
                                  alt="img"
                                  style={{
                                    width: '100%',
                                    height: '7rem'
                                  }}
                                />
                              )
                              :
                              (
                                <div
                                  style={{
                                    width: '100%',
                                    height: '7rem',
                                    backgroundImage: `url(${require('./assets/logo.svg')})`,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat'
                                  }}
                                  >
                                  <div
                                    style={{
                                      backgroundColor: 'rgba(240, 240, 240, 0.79)',
                                      width: '100%',
                                      height: '7rem'
                                    }}
                                  >
                                  </div>
                                </div>
                              )
                            }
                          </Col>
                          <Col
                            xs={6}
                            sm={6}
                            md={9.5}
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
                                style={{
                                  marginBottom: '.5rem'
                                }}
                              >
                                <Text
                                  className='default-text'
                                  style={{
                                    fontFamily: 'Montserrat-Bold',
                                    fontSize: ['xs', 'sm'].includes(screenClass) ? '.8rem' : '1.3rem'
                                  }}
                                >
                                  {res.name}
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
                                  <Visible
                                    md
                                    lg
                                    xl
                                  >
                                    <Col
                                      xs={12}
                                      sm={12}
                                      md={12}
                                      lg={12}
                                      xl={12}
                                      style={{
                                        marginBottom: '1rem'
                                      }}
                                    >
                                      <Text
                                        className='default-text'
                                        style={{
                                          fontSize: ['xs', 'sm'].includes(screenClass) ? '.6rem' : '.8rem'
                                        }}
                                      >
                                        {res.description}
                                      </Text>
                                    </Col>
                                  </Visible>
                                  <Col
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={12}
                                    style={{
                                      display: 'flex',
                                      justifyContent: ['xs', 'sm'].includes(screenClass) ? 'flex-start' : 'flex-end'
                                    }}
                                  >
                                    <Button
                                      onClick={() => viewPetition(res.id)}
                                    >
                                      Ver
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
              :
              (
                <>
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
                      src={require('./assets/search_not_found.svg')}
                      alt="search_not_found"
                      style={{
                        width: '10rem'
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
                      marginBottom: '5rem'
                    }}
                  >
                    <Text
                      className='default-text'
                      style={{
                        color: 'rgba(103, 108, 119, 0.8)',
                        fontSize: ['xs', 'sm'].includes(screenClass) ? '1rem' : '1.2rem',
                        textAlign: 'center'
                      }}
                    >
                      Lo sentimos tu busqueda no tuvo resultados, intentalo nuevamente
                    </Text>
                  </Col>
                </>
              )
            }
          </Row>
        </Col>
      </Row>
      <Campaign />
      <Guia />
      <Footer />
    </Container>
  )
}

const mapStateToProps = (state, store) => ({
  subdomain: state.organization.subdomain,
  petitions: state.petitions.petitions
})

export default withRouter(connect(mapStateToProps)(Search))