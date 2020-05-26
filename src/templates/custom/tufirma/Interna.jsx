import React, {useState, useRef, useEffect} from 'react'
import {
  Container,
  Row,
  Col,
  Visible,
  useScreenClass
} from 'react-grid-system'

import ReactLoading from 'react-loading'

import {
  Progress,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  Badge
} from 'reactstrap'

import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon
} from 'react-share'

import {CopyToClipboard} from 'react-copy-to-clipboard'

import Button from '../../../components/Button'
import Text from '../../../components/Text'
import ProgressBar from '../../../components/ProgressBar'

import './index.css'

import Header from './Header'
import Suggestions from './Suggestions'
import Campaign from './Campaign'
import Guia from './Guia'
import Footer from './Footer'
import Avatar from '../../../components/Avatar'

import {useParams, withRouter} from 'react-router-dom'

import {connect} from 'react-redux'

import NotFound from './NotFound'

import API from '../../../api'

const location = window.location.href

const TuFirmaInterna = ({subdomain}) => {
  const screenClass = useScreenClass()
  const {id} = useParams()

  const fbRef = useRef()
  const twRef = useRef()
  const wsRef = useRef()
  const clRef = useRef()

  const [activeIndex, setActiveIndex] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [items, setItems] = useState([])
  const [copy, setCopy] = useState(false)
  const [petition, setPetition] = useState(null)
  const [notFound, setNotFound] = useState(false)

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
        key={item.id}
        tag='div'
      >
        <img
          src={item.resource}
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
    if (copy) {
      setTimeout(() => {
        setCopy(false)
      }, 2000)
    }
  }, [copy])

  const getPetition = async (id) => {
    const api = new API({subdomain})
    try {
      const response = (await api.getPetition(id)).data
      setPetition(response)
    } catch (error) {
      console.log('Error get Petition', error)
      if (error.response && error.response.data) {
        if (error.response.data.message === 'project_not_found') {
          setNotFound(true)
        }
      }
    }
  }

  useEffect(() => {
    setPetition(null)
    if (id) {
      getPetition(id)
      // dispatch(PetitionActions.getPetition(id))
    }
  }, [id])

  useEffect(() => {
    if (petition) {
      // setTimeout(() => {
        let div = document.getElementById('formView')
        let iframe = petition.iframe.split('</div>')
        div.innerHTML = `${iframe[0]}</div>`

        let src = iframe[1].split('"')
        let ascript = document.getElementById('afrus_script_tag')
        if (ascript) {
          // console.log('existe ya')
          document.body.removeChild(ascript)
        }
        let script = document.createElement("script")
        script.id = 'afrus_script_tag'
        script.src = src[1]
        document.body.appendChild(script)
        // }, 5000);
        
        if (petition.resources.length > 0) {
          setItems(petition.resources)
        }
      }
  }, [petition])
  
  return (
    <>
    {
      petition ?
      (
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
                md={6}
                lg={7.5}
                xl={7.5}
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
                md={6}
                lg={7.5}
                xl={7.5}
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
                    {
                      petition && (petition.video !== null && petition.video !== 'null') &&
                      <Col
                        md={12}
                        lg={12}
                        xl={12}
                      >
                        <iframe
                          width={'100%'}
                          height={355}
                          src={`https://www.youtube.com/embed/${petition.video}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
                        ></iframe>
                      </Col>
                    }
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
                                {petition ? petition.user.ocupation : ''}
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
                  <Visible
                    md
                    lg
                    xl
                  >
                    <Col
                      xs={12}
                      sm={12}
                      style={{
                        marginTop: '1rem'
                      }}
                    >
                      <Text
                        className='default-text'
                        style={{
                          fontSize: '.8rem',
                          fontFamily: 'Montserrat-Bold'
                        }}
                      >
                        {petition ? petition.description : ''}
                      </Text>
                    </Col>
                  </Visible>
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
                      <Progress
                        value={petition ? petition.signatures : 0}
                        max={petition ? petition.amount_goal : 0}
                        color='warning'
                      />
                    </Col>
                  </Row>
                </Col>
              </Visible>
              <Col
                xs={12}
                sm={12}
                md={6}
                lg={4.5}
                xl={4.5}
                style={{
                  paddingTop: `${2.5}rem`,
                }}
              >
                <div id='formView'>
                </div>
                <Visible
                  md
                  lg
                  xl
                >
                  <Col
                    md={12}
                    lg={12}
                    xl={12}
                    style={{
                      marginBottom: '2rem'
                    }}
                  >
                    <Row>
                      <Col
                        md={12}
                        lg={12}
                        xl={12}
                        style={{
                          borderLeft: '.2rem solid #000000',
                          marginBottom: '1rem'
                        }}
                      >
                        <Text
                          className='default-text'
                          style={{
                            fontFamily: 'Montserrat-Bold',
                            fontSize: '.9rem'
                          }}
                        >
                          Compartir
                        </Text>
                      </Col>
                      <Col
                        md={12}
                        lg={12}
                        xl={12}
                        style={{
                          marginBottom: '1rem'
                        }}
                      >
                        <FacebookShareButton
                          ref={fbRef}
                          url={location}
                        >
                          <FacebookIcon
                            size={25}
                          ></FacebookIcon>
                        </FacebookShareButton>
                        <Text
                          onClick={() => fbRef.current.click()}
                          className='default-text'
                          style={{
                            color: '#6A6C72',
                            fontSize: '.7rem',
                            textDecoration: 'underline',
                            marginLeft: '1rem',
                            cursor: 'pointer'
                          }}
                        >
                          Compatir en Facebook
                        </Text>
                      </Col>
                      <Col
                        md={12}
                        lg={12}
                        xl={12}
                        style={{
                          marginBottom: '1rem'
                        }}
                      >
                        <TwitterShareButton
                          ref={twRef}
                          url={location}
                        >
                          <TwitterIcon
                            size={25}
                          ></TwitterIcon>
                        </TwitterShareButton>
                        <Text
                          onClick={() => twRef.current.click()}
                          className='default-text'
                          style={{
                            color: '#6A6C72',
                            fontSize: '.7rem',
                            textDecoration: 'underline',
                            marginLeft: '1rem',
                            cursor: 'pointer'
                          }}
                        >
                          Compatir en Twitter
                        </Text>
                      </Col>
                      <Col
                        md={12}
                        lg={12}
                        xl={12}
                        style={{
                          marginBottom: '1rem'
                        }}
                      >
                        <WhatsappShareButton
                          ref={wsRef}
                          url={location}
                        >
                          <WhatsappIcon
                            size={25}
                          ></WhatsappIcon>
                        </WhatsappShareButton>
                        <Text
                          onClick={() => wsRef.current.click()}
                          className='default-text'
                          style={{
                            color: '#6A6C72',
                            fontSize: '.7rem',
                            textDecoration: 'underline',
                            marginLeft: '1rem',
                            cursor: 'pointer'
                          }}
                        >
                          Compatir en Whatsapp
                        </Text>
                      </Col>
                      <Col
                        md={12}
                        lg={12}
                        xl={12}
                      >
                        <CopyToClipboard
                          ref={clRef}
                          text={location}
                          onCopy={() => setCopy(true)}
                        >
                          <img
                            src={copy ? require('./assets/green_check.svg') : require('./assets/code.svg')}
                            alt="clipboard"
                            style={{
                              width: '1.3rem',
                              cursor: 'pointer'
                            }}
                          />
                        </CopyToClipboard>
                        <Text
                          onClick={() => clRef.current.onClick()}
                          className='default-text'
                          style={{
                            color: '#6A6C72',
                            fontSize: '.7rem',
                            textDecoration: 'underline',
                            marginLeft: '1rem',
                            cursor: 'pointer'
                          }}
                        >
                          Copiar en link
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    md={12}
                    lg={12}
                    xl={12}
                  >
                    <Row>
                      <Col
                        md={12}
                        lg={12}
                        xl={12}
                        style={{
                          borderLeft: '.2rem solid #000000',
                          marginBottom: '1rem'
                        }}
                      >
                        <Text
                          className='default-text'
                          style={{
                            fontFamily: 'Montserrat-Bold',
                            fontSize: '.8rem'
                          }}
                        >
                          Tags usados
                        </Text>
                      </Col>
                      {petition &&
                        petition.tags.map((tag, i) => (
                          <Col
                            key={i}
                          >
                            <Badge
                              style={{
                                paddingTop: '.4rem',
                                paddingLeft: '.5rem',
                                paddingRight: '.5rem',
                                paddingBottom: '.4rem'
                              }}
                              color='info'
                              pill
                            >
                              {tag}
                            </Badge>
                          </Col>
                        ))
                      }
                    </Row>
                  </Col>
                </Visible>
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
                            {petition ? petition.user.ocupation : ''}
                          </Text>
                        </Col>
                        <Col
                          md={12}
                          lg={12}
                          xl={12}
                          style={{
                            marginBottom: '2.5rem',
                            paddingRight: '3.2rem',
                            paddingLeft: '3.2rem'
                          }}
                        >
                          <Row>
                            <Col
                              md={12}
                              lg={12}
                              xl={12}
                              style={{
                                marginBottom: '1rem',
                                borderTop: '.1rem solid #6A6C72',
                                paddingTop: '1rem'
                              }}
                            >
                              <FacebookShareButton
                                ref={fbRef}
                                url={location}
                              >
                                <FacebookIcon
                                  size={25}
                                ></FacebookIcon>
                              </FacebookShareButton>
                              <Text
                                onClick={() => fbRef.current.click()}
                                className='default-text'
                                style={{
                                  color: '#6A6C72',
                                  fontSize: '.9rem',
                                  textDecoration: 'underline',
                                  marginLeft: '1rem',
                                  cursor: 'pointer'
                                }}
                              >
                                Compatir en Facebook
                              </Text>
                            </Col>
                            <Col
                              md={12}
                              lg={12}
                              xl={12}
                              style={{
                                marginBottom: '1rem'
                              }}
                            >
                              <TwitterShareButton
                                ref={twRef}
                                url={location}
                              >
                                <TwitterIcon
                                  size={25}
                                ></TwitterIcon>
                              </TwitterShareButton>
                              <Text
                                onClick={() => twRef.current.click()}
                                className='default-text'
                                style={{
                                  color: '#6A6C72',
                                  fontSize: '.9rem',
                                  textDecoration: 'underline',
                                  marginLeft: '1rem',
                                  cursor: 'pointer'
                                }}
                              >
                                Compatir en Twitter
                              </Text>
                            </Col>
                            <Col
                              md={12}
                              lg={12}
                              xl={12}
                              style={{
                                marginBottom: '1rem'
                              }}
                            >
                              <WhatsappShareButton
                                ref={wsRef}
                                url={location}
                              >
                                <WhatsappIcon
                                  size={25}
                                ></WhatsappIcon>
                              </WhatsappShareButton>
                              <Text
                                onClick={() => wsRef.current.click()}
                                className='default-text'
                                style={{
                                  color: '#6A6C72',
                                  fontSize: '.9rem',
                                  textDecoration: 'underline',
                                  marginLeft: '1rem',
                                  cursor: 'pointer'
                                }}
                              >
                                Compatir en Whatsapp
                              </Text>
                            </Col>
                            <Col
                              md={12}
                              lg={12}
                              xl={12}
                            >
                              <CopyToClipboard
                                ref={clRef}
                                text={location}
                                onCopy={() => setCopy(true)}
                              >
                                <img
                                  src={copy ? require('./assets/green_check.svg') : require('./assets/code.svg')}
                                  alt="clipboard"
                                  style={{
                                    width: '1.3rem',
                                    cursor: 'pointer'
                                  }}
                                />
                              </CopyToClipboard>
                              <Text
                                onClick={() => clRef.current.onClick()}
                                className='default-text'
                                style={{
                                  color: '#6A6C72',
                                  fontSize: '.9rem',
                                  textDecoration: 'underline',
                                  marginLeft: '1rem',
                                  cursor: 'pointer'
                                }}
                              >
                                Copiar en link
                              </Text>
                            </Col>
                          </Row>
                        </Col>
                        {
                          petition && (petition.video !== null && petition.video !== 'null') &&
                          <Col
                            xs={12}
                            sm={12}
                          >
                            <iframe
                              width={'100%'}
                              height={200}
                              src={`https://www.youtube.com/embed/${petition.video}`}
                              frameBorder="0"
                              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
                            ></iframe>
                          </Col>
                        }
                        <Col
                          xs={12}
                          sm={12}
                          style={{
                            marginTop: '1rem'
                          }}
                        >
                          <Text
                            className='default-text'
                            style={{
                              fontSize: '.8rem'
                            }}
                          >
                            {petition ? petition.description : ''}
                          </Text>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Visible>
            </Row>
            <Row>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                style={{
                  marginTop: '1rem',
                  marginBottom: '2rem',
                  backgroundImage: `url(${require('./assets/people.png')})`,
                  backgroundSize: 'cover',
                  width: `${100}%`,
                  height: ['xs', 'sm'].includes(screenClass) ? '15rem' : '12rem'
                }}
              >
                <Row
                  style={{
                    backgroundColor: 'rgba(28, 177, 158, 0.7)',
                    height: '100%'
                  }}
                >
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Text
                      className='default-text'
                      style={{
                        color: '#fff',
                        fontFamily: 'Montserrat-Bold',
                        fontSize: ['xs', 'sm'].includes(screenClass) ? '1.3rem' : '1.7rem',
                        textAlign: 'center'
                      }}
                    >
                      Hoy: {' '}
                      <Text
                        className='default-text'
                        style={{
                          color: '#fff',
                          fontFamily: 'Montserrat-Bold',
                          fontSize: ['xs', 'sm'].includes(screenClass) ? '1.3rem' : '1.7rem',
                          textDecoration: 'underline'
                        }}
                      >
                        {petition ? `${petition.user.first_name} ${petition.user.last_name || ''} ` : ''}
                      </Text>
                      cuenta contigo, necesita de tu <Visible md lg xl><br/></Visible> ayuda con "{petition ? petition.name : ''}". 
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
                      alignItems: 'center'
                    }}
                  >
                    <Button
                      style={{
                        borderRadius: '5px'
                      }}
                    >
                      ¡Firmar ahora!
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Suggestions
              title={'Petitiones relacionadas'}
              pId={petition.id}
              category={petition.category_id}
            />
            <Campaign />
            <Guia />
            <Footer />
          </Container>
        )
        :
        (
          notFound ?
          (
            <NotFound />
          )
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
        )
      }
    </>
  )
}

const mapStateToProps = (state, store) => ({
  // petition: state.petitions.petition,
  subdomain: state.organization.subdomain
})

export default withRouter(connect(mapStateToProps)(TuFirmaInterna))