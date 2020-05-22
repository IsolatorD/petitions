import React, {useState} from 'react'
import {
  Container,
  Row,
  Col,
  Visible,
  useScreenClass
} from 'react-grid-system'

import {
  Progress,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from 'reactstrap'

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
import ProgressBar from '../../../components/ProgressBar'
import Badge from '../../../components/Badge'

import './index.css'

import Header from './Header'
import Campaign from './Campaign'
import Guia from './Guia'
import Footer from './Footer'
import Avatar from '../../../components/Avatar'

import {useParams} from 'react-router-dom'

import {connect} from 'react-redux'
import * as PetitionActions from '../../../store/petitions/actions'
import { useEffect } from 'react'


const TuFirmaInterna = ({petition, dispatch}) => {
  const screenClass = useScreenClass()
  const {id} = useParams()

  const [activeIndex, setActiveIndex] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [items, setItems] = useState([require('./assets/capilla.png'), require('./assets/capilla.png'), require('./assets/capilla.png')])

  const next = () => {
    if (animating) return
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1
    setActiveIndex(nextIndex)
  }

  const goToIndex = (newIndex) => {
    if (animating) return
    setActiveIndex(newIndex)
  }

  const slides = items.map((item, i) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={i}
        tag='div'
      >
        <img
          src={item}
          alt='item'
          style={{
            width: '100%',
            backgroundSize: 'cover',
            height: ['xs', 'sm'].includes(screenClass) ? '15rem' : '20rem'
          }}
        />
      </CarouselItem>
    )
  })

  useEffect(() => {
    if (id) {
      dispatch(PetitionActions.getPetition(id))
    }
  }, [id])

  useEffect(() => {
    if (petition) {
      let div = document.getElementById('formView')
      div.innerHTML = petition.iframe
    }
  }, [petition])

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
          md={8}
          lg={8}
          xl={8}
          style={{
            paddingLeft: ['xs', 'sm'].includes(screenClass) ? `${15}px` : `${2.5}rem`,
            paddingTop: `${.7}rem`
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
                marginBottom: '1rem'
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
                {
                  petition ?
                  petition.name
                  :
                  null
                }
              </Text>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={21}
            >
              <Text
                className='default-text'
                style={{
                  fontFamily: 'Montserrat-Bold',
                  fontSize: ['xs', 'sm'].includes(screenClass) ? '.8rem' : '.9rem',
                  color: '#676C77'
                }}
              >
                Está campaña va dirigida a{' '}
                <Text
                  className='default-text'
                  style={{
                    fontFamily: 'Montserrat-Bold',
                    fontSize: ['xs', 'sm'].includes(screenClass) ? '.8rem' : '.9rem',
                    color: '#FF3300',
                    textDecoration: 'underline'
                  }}
                >
                  {petition ? `${petition.target_addressed} ${petition.target_name}` : ''}
                </Text>
              </Text>
            </Col>
          </Row>
        </Col>
        <Visible
          md
          lg
          xl
        >
          <Col
            md={4}
            lg={4}
            xl={4}
          >
            <Row>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                style={{
                  paddingBottom: `${1}rem`
                }}
              >
                <img
                  src={require('./assets/clock.svg')}
                  alt="clock"
                  style={{
                    width: `${1.5}rem`,
                    position: 'absolute'
                  }}
                />
                <Text
                  className="default-text"
                  style={{
                    fontSize: `${1}rem`,
                    fontWeight: 'bolder',
                    color: '#676C77',
                    paddingLeft: `${2}rem`,
                    fontFamily: 'Montserrat-Bold'
                  }}
                >
                  12
                  <Text
                    className="default-text"
                    style={{
                      fontSize: `${.6}rem`,
                      fontWeight: 'bolder',
                      color: '#676C77',
                      display: 'block',
                      paddingLeft: `${2}rem`,
                      textTransform: 'uppercase'
                    }}
                  >
                    días de inicio
                  </Text>
                </Text>
              </Col>
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
                    fontSize: ['xs', 'sm'].includes(screenClass) ? `${2}rem` : `${1}rem`,
                    fontWeight: 'bolder',
                    color: '#000000',
                    fontFamily: 'Montserrat-Bold'
                  }}
                >
                  {petition ? petition.signatures : 0} personas firmaron
                  <Text
                    className="default-text"
                    style={{
                      fontSize: ['xs', 'sm'].includes(screenClass) ? `${2}rem` : `${.8}rem`,
                      fontWeight: 'bolder',
                      color: '#676C77',
                      display: 'block'
                    }}
                  >
                    de {petition ? parseInt(petition.amount_goal) : 0}
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
                  paddingTop: `${.2}rem`
                }}
              >
                <Progress
                  value={petition ? petition.signatures : 0}
                  max={petition ? petition.amount_goal : 0}
                  color='warning'
                />
              </Col>
            </Row>
          </Col>
        </Visible>
      </Row>
      <Row
        style={{
          marginBottom: '2rem'
        }}
      >
        <Col
          xs={12}
          sm={12}
          md={8}
          lg={8}
          xl={8}
          style={{
            marginTop: `${1}rem`,
            paddingLeft: ['xs', 'sm'].includes(screenClass) ? 0 : `${2.5}rem`,
            paddingRight: ['xs', 'sm'].includes(screenClass) ? 0 : `${15}px`
          }}
        >
          <Row>
            <Visible
              md
              lg
              xl
            >
              <Col
                md={12}
                lg={12}
                xl={12}
              >
                <iframe
                  width={'100%'}
                  height={355}
                  src={`https://www.youtube.com/embed/T-ZQP7a8GzA`}
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
                ></iframe>
              </Col>
              <Col
                md={12}
                lg={12}
                xl={12}
                style={{
                  paddingTop: `${1.5}rem`,
                  paddingBottom: `${1.5}rem`
                }}
              >
                <Row>
                  <Col
                    md={2.5}
                    lg={1.7}
                    xl={1.7}
                    style={{
                      display: ['xs', 'sm'].includes(screenClass) ? 'flex' : 'block',
                      justifyContent: ['xs', 'sm'].includes(screenClass) ? 'center' : ''
                    }}
                  >
                    <Avatar
                      size={4}
                      url={petition && petition.user.profile_photo ? petition.user.profile_photo : null}
                    >
                      {!petition ?
                        null
                        :
                        petition.user.profile_photo ?
                        null
                        :
                        `${petition.user.first_name[0]} ${petition.user.last_name ?
                          petition.user.last_name[0]
                          :
                          ''}`
                      }
                    </Avatar>
                  </Col>
                  <Col
                    md={9.5}
                    lg={10.3}
                    xl={10.3}
                  >
                    <Row>
                      <Col
                        md={12}
                        lg={12}
                        xl={12}
                        style={{
                          paddingTop: `${.5}rem`,
                          textAlign: ['xs', 'sm'].includes(screenClass) ? 'center' : '',
                          paddingLeft: ['xs', 'sm'].includes(screenClass) ? `${2}rem` : `${15}px`,
                          paddingRight: ['xs', 'sm'].includes(screenClass) ? `${2}rem` : `${15}px`
                        }}
                      >
                        <Text
                          className="default-text"
                          style={{
                            fontSize: `${.9}rem`,
                            fontWeight: 'bolder',
                            color: '#000000',
                            fontFamily: 'Montserrat-Bold'
                          }}
                        >
                          {petition ? `${petition.user.first_name} ${petition.user.last_name ? petition.user.last_name : ''}` : ''}
                        </Text>
                      </Col>
                      <Col
                        md={12}
                        lg={12}
                        xl={12}
                      >
                        <Text
                          className="default-text"
                          style={{
                            fontSize: `${.9}rem`,
                            color: '#6A6C72',
                            fontFamily: 'Montserrat',
                            paddingTop: ['xs', 'sm'].includes(screenClass) ? `${.5}rem` : 0,
                            paddingBottom: ['xs', 'sm'].includes(screenClass) ? `${.5}rem` : 0,
                            display: ['xs', 'sm'].includes(screenClass) ? 'block' : 'inline-block'
                          }}
                        >
                          {''}
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Visible>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
            >
              <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
              >
                <CarouselIndicators
                  items={items}
                  activeIndex={activeIndex}
                  onClickHandler={goToIndex}
                />
                {slides}
                <CarouselControl
                  direction="prev"
                  directionText="Previous"
                  onClickHandler={previous}
                />
                <CarouselControl
                  direction="next"
                  directionText="Next"
                  onClickHandler={next}
                />
              </Carousel>
            </Col>
          </Row>
        </Col>
        <Visible
          xs
          sm
        >
          <Col
            xs={12}
            sm={12}
            style={{
              paddingTop: `${1}rem`,
              paddingBottom: `${1}rem`,
              paddingLeft: `${1.5}rem`,
              paddingRight: `${1.5}rem`
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
                  paddingBottom: `${.2}rem`,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <Text
                  className="default-text"
                  style={{
                    fontSize: `${1.2}rem`,
                    fontWeight: 'bolder',
                    color: '#000000',
                    fontFamily: 'Montserrat-ExtraBold'
                  }}
                >
                  {petition ? petition.signatures : 0} firmas
                </Text>
                <Text
                  className="default-text"
                  style={{
                    fontSize: `${1}rem`,
                    fontWeight: 'bolder',
                    color: '#676C77',
                    fontFamily: 'Montserrat-Bold'
                  }}
                >
                  de {petition ? parseInt(petition.amount_goal) : 0}
                </Text>
              </Col>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                style={{
                  paddingTop: `${.2}rem`
                }}
              >
                <ProgressBar
                  height={`${1}rem`}
                />
              </Col>
            </Row>
          </Col>
        </Visible>
        <Col
          xs={12}
          sm={12}
          md={4}
          lg={4}
          xl={4}
          style={{
            paddingTop: `${2.5}rem`
          }}
        >
          <div
            id='formView'
          >
          </div>
        </Col>
        <Visible
          xs
          sm
        >
          <Col
            xs={12}
            sm={12}
            md={8}
            lg={8}
            xl={8}
            style={{
              paddingLeft: ['xs', 'sm'].includes(screenClass) ? `${15}px` : `${2.5}rem`,
              paddingTop: `${1.5}rem`,
              paddingBottom: `${1.5}rem`
            }}
          >
            <Row>
              <Col
                xs={12}
                sm={12}
                md={3}
                lg={2}
                xl={2}
                style={{
                  display: ['xs', 'sm'].includes(screenClass) ? 'flex' : 'block',
                  justifyContent: ['xs', 'sm'].includes(screenClass) ? 'center' : ''
                }}
              >
                <Avatar
                  size={5}
                  url={petition && petition.user.profile_photo ? petition.user.profile_photo : null}
                >
                  {!petition ?
                    null
                    :
                    petition.user.profile_photo ?
                    null
                    :
                    `${petition.user.first_name[0]} ${petition.user.last_name ?
                      petition.user.last_name[0]
                      :
                      ''}`
                  }
                </Avatar>
              </Col>
              <Col
                xs={12}
                sm={12}
                md={9}
                lg={10}
                xl={10}
              >
                <Row>
                  <Col
                    xs={12}
                    sm={12}
                    style={{
                      paddingTop: `${.5}rem`,
                      textAlign: ['xs', 'sm'].includes(screenClass) ? 'center' : '',
                      paddingLeft: ['xs', 'sm'].includes(screenClass) ? `${2}rem` : `${15}px`,
                      paddingRight: ['xs', 'sm'].includes(screenClass) ? `${2}rem` : `${15}px`
                    }}
                  >
                    <Text
                      className="default-text"
                      style={{
                        fontSize: `${.9}rem`,
                        fontWeight: 'bolder',
                        color: '#000000',
                        fontFamily: 'Montserrat-Bold'
                      }}
                    >
                      {petition ? `${petition.user.first_name} ${petition.user.last_name ? petition.user.last_name : ''}` : ''}
                    </Text>
                    <Text
                      className="default-text"
                      style={{
                        fontSize: `${.9}rem`,
                        color: '#6A6C72',
                        fontFamily: 'Montserrat',
                        marginLeft: ['xs', 'sm'].includes(screenClass) ? 0 : `${1.5}rem`,
                        paddingTop: ['xs', 'sm'].includes(screenClass) ? `${.5}rem` : 0,
                        paddingBottom: ['xs', 'sm'].includes(screenClass) ? `${.5}rem` : 0,
                        display: ['xs', 'sm'].includes(screenClass) ? 'block' : 'inline-block'
                      }}
                    >
                      {''}
                    </Text>
                  </Col>
                  <Col
                    xs={12}
                    sm={12}
                  >
                    <iframe
                      width={'100%'}
                      height={355}
                      src={`https://www.youtube.com/embed/T-ZQP7a8GzA`}
                      frameborder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
                    ></iframe>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Visible>
      </Row>
      <Campaign />
      <Guia />
      <Footer />
    </Container>
  )
}

const mapStateToProps = (state, store) => ({
  petition: state.petitions.petition,
  subdomain: state.organization.subdomain
})

export default connect(mapStateToProps)(TuFirmaInterna)