import React, {useState, useRef, useEffect} from 'react'

import {Row, Col, useScreenClass} from 'react-grid-system'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {
  Card,
  CardBody,
  Badge,
  FormGroup,
  Label,
  Input as RInput
} from 'reactstrap'

import {Formik, ErrorMessage, Field} from 'formik'
import * as Yup from 'yup'

import RCard from '../../../../components/Card'
import Text from '../../../../components/Text'
import Button from '../../../../components/Button'
import Input from '../../../../components/Input'

const destinySchema = Yup.object().shape({
  target_name: Yup.string().required('Ingresa el nombre de tu destinatario'),
  target_addressed: Yup.string().required('Ingresa el nombre de la organización'),
  target_email: Yup.string().email('Ingresa un email valido').notRequired(),
  target_phone: Yup.number().notRequired(),
  send_email_to_target: Yup.boolean().notRequired()
})

const Step2 = ({changeStep, tags, onAddtag, onDeleteTag, onDestinatario, onRessources, onDescription, onProjectName, onComplete}) => {
  const screenClass = useScreenClass()
  const [isValid, setIsValid] = useState({ name: false, destiny: false, problem: false, visual: false, tags: false })
  const [allValid, setAllValid] = useState(false)

  const [projectName, setProjectName] = useState('')
  const [projectNameInvalid, setProjectNameInvalid] = useState(false)

  const [projectDescription, setProjectDescription] = useState('')
  const [projectDescriptionInvalid, setProjectDescriptionInvalid] = useState(false)

  const [mainImage, setMainImage] = useState()
  const [optionalImageOne, setOptionalImageOne] = useState()
  const [optionalImageTwo, setOptionalImageTwo] = useState()
  const mainImageRef = useRef()
  const optionalImageOneRef = useRef()
  const optionalImageTwoRef = useRef()
  const [invalidRessources, setInvalidRessources] = useState(false)
  const [maxSizeImage, setMaxSizeImage] = useState({main: false, optionalOne: false, optionalTwo: false})
  const [video, setVideo] = useState('')

  const [tag, setTag] = useState('')
  const [tagInvalid, setTagInvalid] = useState(false)
  const [maxTag, setMaxTag] = useState(false)


  useEffect (() => {
    if (isValid.name && isValid.destiny && isValid.problem && isValid.visual && isValid.tags) {
      setAllValid(true)
    } else {
      setAllValid(false)
    }
  }, [isValid])

  const generatePreviewImage = (file, name) => {
    if (file) {
      if (file.size > 2097152) {
        switch (name) {
          case 'main':
            setMaxSizeImage({...maxSizeImage, main: true})
            break
          case 'one':
            setMaxSizeImage({...maxSizeImage, optionalOne: true})
            break
          case 'two':
            setMaxSizeImage({...maxSizeImage, optionalTwo: true})
            break
        }
      } else {
        switch (name) {
          case 'main':
            setMaxSizeImage({...maxSizeImage, main: false})
            break
          case 'one':
            setMaxSizeImage({...maxSizeImage, optionalOne: false})
            break
          case 'two':
            setMaxSizeImage({...maxSizeImage, optionalTwo: false})
            break
        }
      }
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        switch (name) {
          case 'main':
            setMainImage({preview: reader.result, file})
            break
          case 'one':
            setOptionalImageOne({preview: reader.result, file})
            break
          case 'two':
            setOptionalImageTwo({preview: reader.result, file})
            break
        }
      }
    }
  }

  const verifyTagInput = (save = false) => {
    if (save) {
      if (tags.length > 0) {
        verifyFormValidations('tags', true)
        setTagInvalid(false)
      } else {
        verifyFormValidations('tags', false)
        setTagInvalid(true)
      }
    } else {
      if (tag) {
        if (tags.length < 10) {
          setTagInvalid(false)
          onAddtag(tag)
        } else {
          setMaxTag(true)
        }
        setTag('')
      } else {
        setTagInvalid(true)
      }
    }
  }

   const verifyFormValidations = (name, value) => {
    switch (name) {
      case 'name':
        value ?setIsValid({...isValid, name: true}) : setIsValid({...isValid, name: false})
        break
      case 'destiny':
        value ? setIsValid({...isValid, destiny: true}) : setIsValid({...isValid, destiny: false})
        break
      case 'problem':
        value ? setIsValid({...isValid, problem: true}) : setIsValid({...isValid, problem: false})
        break
      case 'visual':
        value ? setIsValid({...isValid, visual: true}) : setIsValid({...isValid, visual: false})
        break
      case 'tags':
        value ? setIsValid({...isValid, tags: true}) : setIsValid({...isValid, tags: false})
        break
    }
  }

  const verifyProjectName = () => {
    if (projectName) {
      setProjectNameInvalid(false)
      onProjectName(projectName)
      verifyFormValidations('name', true)
    } else {
      setProjectNameInvalid(true)
      verifyFormValidations('name', false)
    }
  }
  const verifyProjectDescription = () => {
    if (projectDescription) {
      setProjectDescriptionInvalid(false)
      onDescription(projectDescription)
      verifyFormValidations('problem', true)
    } else {
      setProjectDescriptionInvalid(true)
      verifyFormValidations('problem', false)
    }
  }

  const verifyResources = () => {
    if (mainImage) {
      let data = {images: [], video: null}
      data.images.push(mainImage.file)
      if (optionalImageOne) {
        data.images.push(optionalImageOne.file)
      }
      if (optionalImageTwo) {
        data.images.push(optionalImageTwo.file)
      }

      if (video) {
        data.video = video
      }
      onRessources(data)
      verifyFormValidations('visual', true)
    } else {
      setInvalidRessources(true)
      verifyFormValidations('visual', false)
    }
  }

  return (
    <>
      <Row
        style={{
          marginTop: ['xs', 'sm'].includes(screenClass) ? `${1.5}rem` : `${2}rem`
        }}
      >
        <Col
          xs={4}
          sm={4}
          md={2}
          lg={2}
          xl={2}
          style={{
            paddingLeft: ['xs', 'sm'].includes(screenClass) ? `15px` : `${5}rem`,
            marginBottom: `${1}rem`
          }}
        >
          <Button
            onClick={() => changeStep(1)}
          >
            Volver
          </Button>
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
            paddingLeft: ['xs', 'sm'].includes(screenClass) ? `15px` : `${5}rem`,
            paddingRight: ['xs', 'sm'].includes(screenClass) ? `15px` : `${5}rem`,
            marginBottom: `${3}rem`
          }}
        >
          <Card
            style={{
              backgroundColor: 'rgba(196, 196, 196, 0.4)'
            }}
          >
            <CardBody>
              <Row>
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
                      color: '#676C77',
                      fontFamily: 'Montserrat-Bold'
                    }}
                  >
                    ¡Crea tu petición!{' '}
                    <Text
                      className='default-text'
                      style={{
                        color: '#676C77'
                      }}
                    >
                      Completa los campos a continuación. Guarda al finalizar
                    </Text>
                  </Text>
                </Col>
              </Row>
            </CardBody>
          </Card>
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
            paddingLeft: ['xs', 'sm'].includes(screenClass) ? `15px` : `${5}rem`,
            paddingRight: ['xs', 'sm'].includes(screenClass) ? `15px` : `${5}rem`,
            marginBottom: `${3}rem`
          }}
        >
          <Row>
            <Col
              xs={3}
              sm={3}
              md={3}
              lg={3}
              xl={3}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <RCard
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  backgroundColor: isValid.name ? '#FF3300' : '#C4C4C4',
                  borderRadius: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <img
                  src={isValid.name ? require('../assets/form-p1-w.svg') : require('../assets/form-p1.svg')}
                  alt="p1"
                  style={{
                    width: '1.7rem',
                  }}
                />
              </RCard>
                <Text
                  className='default-text'
                  style={{
                    color: isValid.name ? '#FF3300' : '#C4C4C4',
                    fontFamily: 'Montserrat-Bold',
                    fontSize: `${.5}rem`,
                    marginTop: '.8rem',
                    textTransform: 'uppercase'
                  }}
                >
                  nombre
                </Text>
            </Col>
            <Col
              xs={3}
              sm={3}
              md={3}
              lg={3}
              xl={3}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <RCard
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  backgroundColor: isValid.destiny ? '#FF3300' : '#C4C4C4',
                  borderRadius: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <img
                  src={isValid.destiny ? require('../assets/form-p2-w.svg') : require('../assets/form-p2.svg')}
                  alt="p2"
                  style={{
                    width: '1.7rem'
                  }}
                />
              </RCard>
                <Text
                  className='default-text'
                  style={{
                    color: isValid.destiny ? '#FF3300' : '#C4C4C4',
                    fontFamily: 'Montserrat-Bold',
                    fontSize: `${.5}rem`,
                    marginTop: '.8rem',
                    textTransform: 'uppercase'
                  }}
                >
                  destinatario
                </Text>
            </Col>
            <Col
              xs={3}
              sm={3}
              md={3}
              lg={3}
              xl={3}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <RCard
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  backgroundColor: isValid.problem ? '#FF3300' : '#C4C4C4',
                  borderRadius: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <img
                  src={isValid.problem ? require('../assets/form-p3.svg') : require('../assets/form-p3.svg')}
                  alt="p3"
                  style={{
                    width: '1.7rem'
                  }}
                />
              </RCard>
                <Text
                  className='default-text'
                  style={{
                    color: isValid.problem ? '#FF3300' : '#C4C4C4',
                    fontFamily: 'Montserrat-Bold',
                    fontSize: `${.5}rem`,
                    marginTop: '.8rem',
                    textTransform: 'uppercase'
                  }}
                >
                  problema
                </Text>
            </Col>
            <Col
              xs={3}
              sm={3}
              md={3}
              lg={3}
              xl={3}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <RCard
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  backgroundColor: isValid.visual ? '#FF3300' : '#C4C4C4',
                  borderRadius: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <img
                  src={isValid.visual ? require('../assets/form-p4-w.svg') : require('../assets/form-p4.svg')}
                  alt="p4"
                  style={{
                    width: '1.7rem'
                  }}
                />
              </RCard>
                <Text
                  className='default-text'
                  style={{
                    color: isValid.visual ? '#FF3300' : '#C4C4C4',
                    fontFamily: 'Montserrat-Bold',
                    fontSize: `${.5}rem`,
                    marginTop: '.8rem',
                    textTransform: 'uppercase'
                  }}
                >
                  visual
                </Text>
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
            paddingLeft: ['xs', 'sm'].includes(screenClass) ? `15px` : `${5}rem`,
            paddingRight: ['xs', 'sm'].includes(screenClass) ? `15px` : `${5}rem`,
            marginBottom: `${1}rem`
          }}
        >
          <Card>
            <CardBody
              style={{
                paddingTop: ['xs', 'sm'].includes(screenClass) ? 0 : '5px',
                paddingBottom: 0
              }}
            >
              <Row>
                <Col
                  xs={10}
                  sm={10}
                  md={10}
                  lg={10}
                  xl={10}
                >
                  <Text
                    className='default-text'
                    style={{
                      color: '#000000',
                      fontSize: ['xs', 'sm'].includes(screenClass) ? '.6rem' : '.8rem'
                    }}
                  >
                    Escribe el nombre de tu petición:
                  </Text>
                </Col>
                <Col
                  xs={2}
                  sm={2}
                  md={2}
                  lg={2}
                  xl={2}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}
                >
                  <img
                    src={isValid.name ? require('../assets/section_check.svg') : require('../assets/section_edit.svg')}
                    alt='ico'
                    style={{
                      marginTop: ['xs', 'sm'].includes(screenClass) ? '.5rem' : 'auto',
                      width: '1.4rem'
                    }}
                  />
                </Col>
              </Row>
            </CardBody>
            <hr
              style={{
                marginTop: '.5rem',
                marginBottom: '.5rem'
              }}
            />
            <CardBody>
              <Row>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                >
                  <Input
                    maxLength={40}
                    placeholder='Escribe el nombre de tu petición aquí'
                    type="textarea"
                    name="project_name"
                    value={projectName}
                    onChange={(event) => setProjectName(event.target.value)}
                    style={{
                      width: '100%',
                      height: '4rem',
                      resize: 'none',
                      border: '1px solid rgba(31, 32, 65, 0.25)'
                    }}
                  />
                  {projectNameInvalid &&
                    <Text
                      className='default-text'
                      style={{
                        color: '#FF647C',
                        display: 'block',
                        fontSize: ['xs', 'sm'].includes(screenClass) ? '.7rem' : '.7rem'
                      }}
                    >
                      Ingresa el nombre de tu petición
                    </Text>
                  }
                </Col>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  style={{
                    marginTop: '1rem',
                    display: ['xs', 'sm'].includes(screenClass) ? 'block' : 'flex',
                    justifyContent: ['xs', 'sm'].includes(screenClass) ? '' : 'flex-end'
                  }}
                >
                  <Button
                    onClick={() => verifyProjectName()}
                    style={{
                      width: ['xs', 'sm'].includes(screenClass) ? '100%' : '10rem'
                    }}
                  >
                    guardar
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
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
            paddingLeft: ['xs', 'sm'].includes(screenClass) ? `15px` : `${5}rem`,
            paddingRight: ['xs', 'sm'].includes(screenClass) ? `15px` : `${5}rem`,
            marginBottom: `${1}rem`
          }}
        >
          <Card
            style={{
              backgroundColor: '#EBEBEB'
            }}
          >
            <CardBody
              style={{
                paddingTop: '.8rem'
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
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <img
                    src={require('../assets/tip.svg')}
                    alt="tip"
                    style={{
                      width: '1.3rem'
                    }}
                  />
                  <Text
                    className='default-text'
                    style={{
                      marginLeft: '1rem',
                      color: '#FF3300',
                      fontSize: '.9rem',
                      textTransform: 'uppercase',
                      fontFamily: 'Montserrat-Bold'
                    }}
                  >
                    Ten en cuenta
                  </Text>
                </Col>
              </Row>
            </CardBody>
            <CardBody
              style={{
                paddingTop: ['xs', 'sm'].includes(screenClass) ? 0 : '20px',
                paddingBottom: ['xs', 'sm'].includes(screenClass) ? '20px' : '3rem'
              }}
            >
              <Row>
                <Col
                  xs={4}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                >
                  <Text
                    className='default-text'
                    style={{
                      color: '#000000',
                      fontSize: ['xs', 'sm'].includes(screenClass) ? '.6rem' : '.8rem',
                      fontFamily: 'Montserrat-Bold',
                      textTransform: 'uppercase'
                    }}
                  >
                    Se breve y conciso
                  </Text>
                  <Text
                    className='default-text'
                    style={{
                      marginTop: '1rem',
                      display: 'block',
                      color: '#606060',
                      fontSize: ['xs', 'sm'].includes(screenClass) ? '.6rem' : '.8rem'
                    }}
                  >
                    Ejemplo: "Salve la parroquia de Sta Catalina de Barcelona"
                    <br/><br/>
                    No: "La parroquia Sta Catalina de Barcelona está en peligro por ..."
                  </Text>
                </Col>
                <Col
                  xs={4}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                >
                  <Text
                    className='default-text'
                    style={{
                      color: '#000000',
                      fontSize: ['xs', 'sm'].includes(screenClass) ? '.6rem' : '.8rem',
                      fontFamily: 'Montserrat-Bold',
                      textTransform: 'uppercase'
                    }}
                  >
                    Enfócate en la solución
                  </Text>
                  <Text
                    className='default-text'
                    style={{
                      marginTop: '1rem',
                      display: 'block',
                      color: '#606060',
                      fontSize: ['xs', 'sm'].includes(screenClass) ? '.6rem' : '.8rem'
                    }}
                  >
                    Ejemplo: "Ayudar a los sacerdote a culminar sus estudios religiosos"
                    <br/><br/>
                    No: "Los sacerdotes no podran terminar sus estudios religiosos"
                  </Text>
                </Col>
                <Col
                  xs={4}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                >
                  <Text
                    className='default-text'
                    style={{
                      color: '#000000',
                      fontSize: ['xs', 'sm'].includes(screenClass) ? '.6rem' : '.8rem',
                      fontFamily: 'Montserrat-Bold',
                      textTransform: 'uppercase'
                    }}
                  >
                    Comunica la urgencia
                  </Text>
                  <Text
                    className='default-text'
                    style={{
                      marginTop: '1rem',
                      display: 'block',
                      color: '#606060',
                      fontSize: ['xs', 'sm'].includes(screenClass) ? '.6rem' : '.8rem'
                    }}
                  >
                    Ejemplo: “En convento sera clausurado este mes"
                  </Text>
                </Col>
              </Row>
            </CardBody>
          </Card>
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
            paddingLeft: ['xs', 'sm'].includes(screenClass) ? `15px` : `${5}rem`,
            paddingRight: ['xs', 'sm'].includes(screenClass) ? `15px` : `${5}rem`,
            marginBottom: `${1}rem`
          }}
        >
          <Card>
            <CardBody
              style={{
                paddingTop: ['xs', 'sm'].includes(screenClass) ? 0 : '5px',
                paddingBottom: 0
              }}
            >
              <Row>
                <Col
                  xs={10}
                  sm={10}
                  md={10}
                  lg={10}
                  xl={10}
                >
                  <Text
                    className='default-text'
                    style={{
                      color: '#000000',
                      fontSize: ['xs', 'sm'].includes(screenClass) ? '.6rem' : '.8rem'
                    }}
                  >
                    Escribe el destinatario de tu petición:
                  </Text>
                </Col>
                <Col
                  xs={2}
                  sm={2}
                  md={2}
                  lg={2}
                  xl={2}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}
                >
                  <img
                    src={isValid.destiny ? require('../assets/section_check.svg') : require('../assets/section_edit.svg')}
                    alt='ico'
                    style={{
                      marginTop: ['xs', 'sm'].includes(screenClass) ? '.5rem' : 'auto',
                      width: '1.4rem'
                    }}
                  />
                </Col>
              </Row>
            </CardBody>
            <hr
              style={{
                marginTop: '.5rem',
                marginBottom: '.5rem'
              }}
            />
            <CardBody>
              <Formik
                initialValues={{
                  target_name: '',
                  target_addressed: '',
                  target_email: '',
                  target_phone: '',
                  send_email_to_target: false
                }}
                validationSchema={destinySchema}
                onSubmit={async (values, actions) => {
                  onDestinatario(values)
                  verifyFormValidations('destiny', true)
                }}
              >
                {({ handleChange, handleSubmit, handleBlur, values}) => (
                  <form
                    onSubmit={handleSubmit}
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: ['xs', 'sm'].includes(screenClass) ? 'column' : 'row',
                        justifyContent: ['xs', 'sm'].includes(screenClass) ? 'center' : 'space-evenly',
                        marginBottom: `${.6}rem`
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          paddingLeft: ['xs', 'sm'].includes(screenClass) ? '' : '2rem',
                          paddingRight: ['xs', 'sm'].includes(screenClass) ? '' : '2rem'
                        }}
                      >
                        <Text
                          className='default-text'
                          style={{
                            fontFamily: 'Montserrat-Bold',
                            textTransform: 'uppercase',
                            fontSize: ['xs', 'sm'].includes(screenClass) ? '.7rem' : '.8rem',
                            marginLeft: ['xs', 'sm'].includes(screenClass) ? '1.5rem' : 0
                          }}
                        >
                          Dirigido a
                        </Text>
                        <Input
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.target_addressed}
                          name='target_addressed'
                          placeholder="Monseñor Jose Bastidas, Ministro de Barcelona"
                          width={`${100}%`}
                          style={{
                            border: '1px solid #C4C4C4',
                            borderRadius: 5,
                            width: ['xs', 'sm'].includes(screenClass) ? `${80}%` : `${100}%`,
                            height: 35,
                            paddingRight: 10,
                            paddingLeft: 10
                          }}
                        />
                        <ErrorMessage
                          name="target_addressed"
                          >
                          {msg =>
                            <Text
                              className="default-text"
                              style={{
                                fontSize: ['xs', 'sm'].includes(screenClass) ? `${.7}rem` : `${.5}rem`,
                                color: '#FF3300',
                                paddingTop: `${.2}rem`,
                                marginLeft: ['xs', 'sm'].includes(screenClass) ? '1.5rem' : 0
                              }}
                            >
                              {msg}
                            </Text>
                          }
                        </ErrorMessage>
                      </div>
                      <div
                        style={{
                          flex: 1,
                          paddingLeft: ['xs', 'sm'].includes(screenClass) ? '' : '2rem',
                          paddingRight: ['xs', 'sm'].includes(screenClass) ? '' : '2rem'
                        }}
                      >
                        <Text
                          className='default-text'
                          style={{
                            fontFamily: 'Montserrat-Bold',
                            textTransform: 'uppercase',
                            fontSize: ['xs', 'sm'].includes(screenClass) ? '.7rem' : '.8rem',
                            marginLeft: ['xs', 'sm'].includes(screenClass) ? '1.5rem' : 0
                          }}
                        >
                          Nombre de la intitución u organización
                        </Text>
                        <Input
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.target_name}
                          name='target_name'
                          placeholder='Ejemplo: Ministerio religioso'
                          width={`${100}%`}
                          style={{
                            border: '1px solid #C4C4C4',
                            borderRadius: 5,
                            width: ['xs', 'sm'].includes(screenClass) ? `${80}%` : `${100}%`,
                            height: 35,
                            paddingRight: 10,
                            paddingLeft: 10
                          }}
                        />
                        <ErrorMessage
                          name="target_name"
                        >
                          {msg =>
                            <Text
                              className="default-text"
                              style={{
                                fontSize: ['xs', 'sm'].includes(screenClass) ? `${.7}rem` : `${.5}rem`,
                                color: '#FF3300',
                                paddingTop: `${.2}rem`,
                                marginLeft: ['xs', 'sm'].includes(screenClass) ? '1.5rem' : 0
                              }}
                            >
                              {msg}
                            </Text>
                          }
                        </ErrorMessage>
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: ['xs', 'sm'].includes(screenClass) ? 'column' : 'row',
                        justifyContent: ['xs', 'sm'].includes(screenClass) ? 'center' : 'space-evenly',
                        marginBottom: `${.6}rem`
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          paddingLeft: ['xs', 'sm'].includes(screenClass) ? '' : '2rem',
                          paddingRight: ['xs', 'sm'].includes(screenClass) ? '' : '2rem'
                        }}
                      >
                        <Text
                          className='default-text'
                          style={{
                            fontFamily: 'Montserrat-Bold',
                            textTransform: 'uppercase',
                            fontSize: ['xs', 'sm'].includes(screenClass) ? '.7rem' : '.8rem',
                            marginLeft: ['xs', 'sm'].includes(screenClass) ? '1.5rem' : 0
                          }}
                        >
                          EMAIL (OPCIONAL)
                        </Text>
                        <Input
                          type="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.target_email}
                          name='target_email'
                          placeholder="Ejemplo: example@gmail.cm"
                          width={`${100}%`}
                          style={{
                            border: '1px solid #C4C4C4',
                            borderRadius: 5,
                            width: ['xs', 'sm'].includes(screenClass) ? `${80}%` : `${100}%`,
                            height: 35,
                            paddingRight: 10,
                            paddingLeft: 10
                          }}
                        />
                        <ErrorMessage
                          name="target_email"
                        >
                          {msg =>
                            <Text
                              className="default-text"
                              style={{
                                fontSize: ['xs', 'sm'].includes(screenClass) ? `${.7}rem` : `${.5}rem`,
                                color: '#FF3300',
                                paddingTop: `${.2}rem`,
                                marginLeft: ['xs', 'sm'].includes(screenClass) ? '1.5rem' : 0
                              }}
                            >
                              {msg}
                            </Text>
                          }
                        </ErrorMessage>
                      </div>
                      <div
                        style={{
                          flex: 1,
                          paddingLeft: ['xs', 'sm'].includes(screenClass) ? '' : '2rem',
                          paddingRight: ['xs', 'sm'].includes(screenClass) ? '' : '2rem'
                        }}
                      >
                        <Text
                          className='default-text'
                          style={{
                            fontFamily: 'Montserrat-Bold',
                            textTransform: 'uppercase',
                            fontSize: ['xs', 'sm'].includes(screenClass) ? '.7rem' : '.8rem',
                            marginLeft: ['xs', 'sm'].includes(screenClass) ? '1.5rem' : 0
                          }}
                        >
                          TELÉFONO (OPCIONAL)
                        </Text>
                        <Input
                          type="number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.target_phone}
                          name='target_phone'
                          placeholder="Ejemplo: +57 000000000"
                          width={`${100}%`}
                          style={{
                            border: '1px solid #C4C4C4',
                            borderRadius: 5,
                            width: ['xs', 'sm'].includes(screenClass) ? `${80}%` : `${100}%`,
                            height: 36,
                            paddingRight: 10,
                            paddingLeft: 10
                          }}
                        />
                        <ErrorMessage
                          name="target_phone"
                        >
                          {msg =>
                            <Text
                              className="default-text"
                              style={{
                                fontSize: ['xs', 'sm'].includes(screenClass) ? `${.7}rem` : `${.5}rem`,
                                color: '#FF3300',
                                paddingTop: `${.2}rem`,
                                marginLeft: ['xs', 'sm'].includes(screenClass) ? '1.5rem' : 0
                              }}
                            >
                              {msg}
                            </Text>
                          }
                        </ErrorMessage>
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        marginTop: '1rem',
                        marginBottom: '1rem',
                        marginLeft: ['xs', 'sm'].includes(screenClass) ? '1rem' : '2rem'
                      }}
                    >
                      <Field
                        name='send_email_to_target'
                        render={({ field }) => (
                          <FormGroup check>
                            <Label check>
                              <RInput
                                {...field}
                                id='send_email_to_target'
                                type="checkbox"
                                name='send_email_to_target'
                                value={values.send_email_to_target}
                              />{' '}
                              <Text
                                className='default-text'
                                style={{
                                  fontFamily: 'Montserrat-Bold',
                                  fontSize: ['xs', 'sm'].includes(screenClass) ? '.7rem' : '.8rem'
                                }}
                              >
                                ¿Quieres que tufirma.org le notifique al destinatario de tu petición?
                              </Text>
                            </Label>
                          </FormGroup>
                        )}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                      }}
                    >
                      <Button
                        type="submit"
                        style={{
                          width: `${7}rem`
                        }}
                      >
                        Guardar
                      </Button>
                    </div>
                  </form>
                )}
              </Formik>
            </CardBody>
          </Card>
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
            paddingLeft: ['xs', 'sm'].includes(screenClass) ? `15px` : `${5}rem`,
            paddingRight: ['xs', 'sm'].includes(screenClass) ? `15px` : `${5}rem`,
            marginBottom: `${1}rem`
          }}
        >
          <Card>
            <CardBody
              style={{
                paddingTop: ['xs', 'sm'].includes(screenClass) ? 0 : '5px',
                paddingBottom: 0
              }}
            >
              <Row>
                <Col
                  xs={10}
                  sm={10}
                  md={10}
                  lg={10}
                  xl={10}
                >
                  <Text
                    className='default-text'
                    style={{
                      color: '#000000',
                      fontSize: ['xs', 'sm'].includes(screenClass) ? '.6rem' : '.8rem'
                    }}
                  >
                    Describe el problema:
                  </Text>
                </Col>
                <Col
                  xs={2}
                  sm={2}
                  md={2}
                  lg={2}
                  xl={2}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}
                >
                  <img
                    src={isValid.problem ? require('../assets/section_check.svg') : require('../assets/section_edit.svg')}
                    alt='ico'
                    style={{
                      marginTop: ['xs', 'sm'].includes(screenClass) ? '.5rem' : 'auto',
                      width: '1.4rem'
                    }}
                  />
                </Col>
              </Row>
            </CardBody>
            <hr
              style={{
                marginTop: '.5rem',
                marginBottom: '.5rem'
              }}
            />
            <CardBody
              style={{
                paddingTop: 0
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
                  <Row>
                    <Col
                      xs={8}
                      sm={8}
                      md={9}
                      lg={10}
                      xl={10}
                    >
                      <Text
                        className='default-text'
                        style={{
                          fontSize: ['xs', 'sm'].includes(screenClass) ? '.6rem' : '.8rem',
                          fontFamily: 'Montserrat-Bold'
                        }}
                      >
                        Explicanos tu problematica
                      </Text>
                    </Col>
                    <Col
                      xs={4}
                      sm={4}
                      md={3}
                      lg={2}
                      xl={2}
                    >
                      <Text
                        className='default-text'
                        style={{
                          fontSize: ['xs', 'sm'].includes(screenClass) ? '.6rem' : '.8rem'
                        }}
                      >
                        1.000 Carácteres
                      </Text>
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
                  <Input
                    maxLength={1000}
                    placeholder='Escribe aquí tu texto'
                    type="textarea"
                    value={projectDescription}
                    onChange={(event) => setProjectDescription(event.target.value)}
                    name="project_description"
                    style={{
                      width: '100%',
                      height: '4rem',
                      resize: 'none',
                      border: '1px solid rgba(31, 32, 65, 0.25)'
                    }}
                  />
                  {projectDescriptionInvalid &&
                    <Text
                      className='default-text'
                      style={{
                        color: '#FF647C',
                        display: 'block',
                        fontSize: ['xs', 'sm'].includes(screenClass) ? '.7rem' : '.7rem'
                      }}
                    >
                      Ingresa la descripción de tu petición
                    </Text>
                  }
                </Col>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  style={{
                    marginTop: '1rem',
                    display: ['xs', 'sm'].includes(screenClass) ? 'block' : 'flex',
                    justifyContent: ['xs', 'sm'].includes(screenClass) ? '' : 'flex-end'
                  }}
                >
                  <Button
                    onClick={() => verifyProjectDescription()}
                    style={{
                      width: ['xs', 'sm'].includes(screenClass) ? '100%' : '10rem'
                    }}
                  >
                    guardar
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
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
            paddingLeft: ['xs', 'sm'].includes(screenClass) ? `15px` : `${5}rem`,
            paddingRight: ['xs', 'sm'].includes(screenClass) ? `15px` : `${5}rem`,
            marginBottom: `${1}rem`
          }}
        >
          <Card
            style={{
              backgroundColor: '#EBEBEB'
            }}
          >
            <CardBody
              style={{
                paddingTop: '.8rem'
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
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <img
                    src={require('../assets/tip.svg')}
                    alt="tip"
                    style={{
                      width: '1.3rem'
                    }}
                  />
                  <Text
                    className='default-text'
                    style={{
                      marginLeft: '1rem',
                      color: '#FF3300',
                      fontSize: '.9rem',
                      textTransform: 'uppercase',
                      fontFamily: 'Montserrat-Bold'
                    }}
                  >
                    Ten en cuenta
                  </Text>
                </Col>
              </Row>
            </CardBody>
            <CardBody
              style={{
                paddingTop: ['xs', 'sm'].includes(screenClass) ? 0 : '20px',
                paddingBottom: ['xs', 'sm'].includes(screenClass) ? '20px' : '3rem'
              }}
            >
              <Row>
                <Col
                  xs={4}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                >
                  <Text
                    className='default-text'
                    style={{
                      color: '#000000',
                      fontSize: ['xs', 'sm'].includes(screenClass) ? '.6rem' : '.8rem',
                      fontFamily: 'Montserrat-Bold',
                      textTransform: 'uppercase'
                    }}
                  >
                    Describe la solución
                  </Text>
                  <Text
                    className='default-text'
                    style={{
                      marginTop: '1rem',
                      display: 'block',
                      color: '#606060',
                      fontSize: ['xs', 'sm'].includes(screenClass) ? '.6rem' : '.8rem'
                    }}
                  >
                    Haz una sintesis completa del porque deberian apoyar tu causa o petición.
                  </Text>
                </Col>
                <Col
                  xs={4}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                >
                  <Text
                    className='default-text'
                    style={{
                      color: '#000000',
                      fontSize: ['xs', 'sm'].includes(screenClass) ? '.6rem' : '.8rem',
                      fontFamily: 'Montserrat-Bold',
                      textTransform: 'uppercase'
                    }}
                  >
                    Deja claro por qué te importa.
                  </Text>
                  <Text
                    className='default-text'
                    style={{
                      marginTop: '1rem',
                      display: 'block',
                      color: '#606060',
                      fontSize: ['xs', 'sm'].includes(screenClass) ? '.6rem' : '.8rem'
                    }}
                  >
                    Hazle ver a los demás porque es importante luchar por lo que tu quieres, y que se deberia cambiar.
                  </Text>
                </Col>
                <Col
                  xs={4}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                >
                  <Text
                    className='default-text'
                    style={{
                      color: '#000000',
                      fontSize: ['xs', 'sm'].includes(screenClass) ? '.6rem' : '.8rem',
                      fontFamily: 'Montserrat-Bold',
                      textTransform: 'uppercase'
                    }}
                  >
                    Respeta a los demás
                  </Text>
                  <Text
                    className='default-text'
                    style={{
                      marginTop: '1rem',
                      display: 'block',
                      color: '#606060',
                      fontSize: ['xs', 'sm'].includes(screenClass) ? '.6rem' : '.8rem'
                    }}
                  >
                    No fomentes odios, ni diga cosas sin fundamento hacia los demás.
                    <br/><br/>
                    Tú petición sera revisada puede que no sea aprobada, por está razón.
                  </Text>
                </Col>
              </Row>
            </CardBody>
          </Card>
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
            paddingLeft: ['xs', 'sm'].includes(screenClass) ? `15px` : `${5}rem`,
            paddingRight: ['xs', 'sm'].includes(screenClass) ? `15px` : `${5}rem`,
            marginBottom: `${1}rem`
          }}
        >
          <Card>
            <CardBody
              style={{
                paddingTop: ['xs', 'sm'].includes(screenClass) ? 0 : '5px',
                paddingBottom: 0
              }}
            >
              <Row>
                <Col
                  xs={10}
                  sm={10}
                  md={10}
                  lg={10}
                  xl={10}
                >
                  <Text
                    className='default-text'
                    style={{
                      color: '#000000',
                      fontSize: ['xs', 'sm'].includes(screenClass) ? '.6rem' : '.8rem'
                    }}
                  >
                    Sube las fotos y/o videos que apoyen tu petición
                  </Text>
                </Col>
                <Col
                  xs={2}
                  sm={2}
                  md={2}
                  lg={2}
                  xl={2}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}
                >
                  <img
                    src={isValid.visual ? require('../assets/section_check.svg') : require('../assets/section_edit.svg')}
                    alt='ico'
                    style={{
                      marginTop: ['xs', 'sm'].includes(screenClass) ? '.5rem' : 'auto',
                      width: '1.4rem'
                    }}
                  />
                </Col>
              </Row>
            </CardBody>
            <hr
              style={{
                marginTop: '.5rem',
                marginBottom: '.5rem'
              }}
            />
            <CardBody>
              <Row>
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
                      <img
                        src={require('../assets/gallery.svg')}
                        alt="gallery"
                        style={{
                          width: '2rem',
                          marginRight: '1rem'
                        }}
                      />
                      <Text
                        className='default-text'
                        style={{
                          fontSize: ['xs', 'sm'].includes(screenClass) ? '.7rem' : '.8rem'
                        }}
                      >
                      Sube fotos en formato JPG que no pesen más de 2MB,{' '}
                        <Text
                          className='default-text'
                          style={{
                            fontFamily: 'Montserrat-Bold',
                            fontSize: ['xs', 'sm'].includes(screenClass) ? '.7rem' : '.8rem'
                          }}
                        >
                          Sólo puedes subir máximo (3) fotos.
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
                        marginBottom: '1rem'
                      }}
                    >
                      <Row>
                        <Col
                          xs={4}
                          sm={4}
                          md={4}
                          lg={4}
                          xl={4}
                        >
                          <Card>
                            <CardBody
                              style={{
                                backgroundColor: 'rgba(196, 196, 196, 0.5)'
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
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginBottom: '1rem'
                                  }}
                                >
                                  <img
                                    src={ mainImage && mainImage.preview ? mainImage.preview : require('../assets/gallery.svg')}
                                    alt="gallery"
                                    style={{
                                      width: mainImage && mainImage.preview ? '100%' : '5rem',
                                      height: mainImage && mainImage.preview ? '8rem' : 'auto'
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
                                    justifyContent: 'center'
                                  }}
                                >
                                  <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    name="mainImage"
                                    ref={mainImageRef}
                                    style={{
                                      display: 'none'
                                    }}
                                    onChange={(event) => {
                                      generatePreviewImage(event.currentTarget.files[0], 'main')
                                    }}
                                  />
                                  <Button
                                    onClick={() => mainImageRef.current.click()}
                                    style={{
                                      backgroundColor: '#188B9A',
                                    }}
                                  >
                                    <Text
                                      className='default-text'
                                      style={{
                                        color: '#fff',
                                        fontSize: '.6rem',
                                        textTransform: 'none'
                                      }}
                                    >
                                      {mainImage ? 'Cambiar' : 'Subir foto principal'}
                                    </Text>
                                  </Button>
                                </Col>
                              </Row>
                            </CardBody>
                          </Card>
                          {invalidRessources &&
                            <Text
                              className='default-text'
                              style={{
                                color: '#FF647C',
                                display: 'block',
                                fontFamily: 'Montserrat-Bold',
                                textAlign: 'center',
                                fontSize: ['xs', 'sm'].includes(screenClass) ? '.7rem' : '.7rem'
                              }}
                            >
                              La imagen principal es requerida.
                            </Text>
                          }
                          {maxSizeImage.main &&
                            <Text
                              className='default-text'
                              style={{
                                color: '#FF647C',
                                display: 'block',
                                fontFamily: 'Montserrat-Bold',
                                textAlign: 'center',
                                fontSize: ['xs', 'sm'].includes(screenClass) ? '.7rem' : '.7rem'
                              }}
                            >
                              La imagen excede el tamaño maximo de 2MB
                            </Text>
                          }
                        </Col>
                        <Col
                          xs={4}
                          sm={4}
                          md={4}
                          lg={4}
                          xl={4}
                        >
                          <Card>
                            <CardBody
                              style={{
                                backgroundColor: 'rgba(196, 196, 196, 0.5)'
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
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginBottom: '1rem'
                                  }}
                                >
                                  <img
                                    src={ optionalImageOne && optionalImageOne.preview ? optionalImageOne.preview : require('../assets/gallery.svg')}
                                    alt="gallery"
                                    style={{
                                      width: optionalImageOne && optionalImageOne.preview ? '100%' : '5rem',
                                      height: optionalImageOne && optionalImageOne.preview ? '8rem' : 'auto'
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
                                    justifyContent: 'center'
                                  }}
                                >
                                  <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    name="optionalImageOne"
                                    ref={optionalImageOneRef}
                                    style={{
                                      display: 'none'
                                    }}
                                    onChange={(event) => {
                                      generatePreviewImage(event.currentTarget.files[0], 'one')
                                    }}
                                  />
                                  <Button
                                    onClick={() => optionalImageOneRef.current.click()}
                                    style={{
                                      backgroundColor: '#188B9A',
                                    }}
                                  >
                                    <Text
                                      className='default-text'
                                      style={{
                                        color: '#fff',
                                        fontSize: '.6rem',
                                        textTransform: 'none'
                                      }}
                                    >
                                      {optionalImageOne ? 'Cambiar' : 'Subir foto (Opcional*)'}
                                    </Text>
                                  </Button>
                                </Col>
                              </Row>
                            </CardBody>
                          </Card>
                          {maxSizeImage.optionalOne &&
                            <Text
                              className='default-text'
                              style={{
                                color: '#FF647C',
                                display: 'block',
                                fontFamily: 'Montserrat-Bold',
                                textAlign: 'center',
                                fontSize: ['xs', 'sm'].includes(screenClass) ? '.7rem' : '.7rem'
                              }}
                            >
                              La imagen excede el tamaño maximo de 2MB
                            </Text>
                          }
                        </Col>
                        <Col
                          xs={4}
                          sm={4}
                          md={4}
                          lg={4}
                          xl={4}
                        >
                          <Card>
                            <CardBody
                              style={{
                                backgroundColor: 'rgba(196, 196, 196, 0.5)'
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
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginBottom: '1rem'
                                  }}
                                >
                                  <img
                                    src={ optionalImageTwo && optionalImageTwo.preview ? optionalImageTwo.preview : require('../assets/gallery.svg')}
                                    alt="gallery"
                                    style={{
                                      width: optionalImageTwo && optionalImageTwo.preview ? '100%' : '5rem',
                                      height: optionalImageTwo && optionalImageTwo.preview ? '8rem' : 'auto'
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
                                    justifyContent: 'center'
                                  }}
                                >
                                  <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    name="optionalImageTwo"
                                    ref={optionalImageTwoRef}
                                    style={{
                                      display: 'none'
                                    }}
                                    onChange={(event) => {
                                      generatePreviewImage(event.currentTarget.files[0], 'two')
                                    }}
                                  />
                                  <Button
                                    onClick={() => optionalImageTwoRef.current.click()}
                                    style={{
                                      backgroundColor: '#188B9A',
                                    }}
                                  >
                                    <Text
                                      className='default-text'
                                      style={{
                                        color: '#fff',
                                        fontSize: '.6rem',
                                        textTransform: 'none'
                                      }}
                                    >
                                      {optionalImageTwo ? 'Cambiar' : 'Subir foto (Opcional*)'}
                                    </Text>
                                  </Button>
                                </Col>
                              </Row>
                            </CardBody>
                          </Card>
                          {maxSizeImage.optionalTwo &&
                            <Text
                              className='default-text'
                              style={{
                                color: '#FF647C',
                                display: 'block',
                                fontFamily: 'Montserrat-Bold',
                                textAlign: 'center',
                                fontSize: ['xs', 'sm'].includes(screenClass) ? '.7rem' : '.7rem'
                              }}
                            >
                              La imagen excede el tamaño maximo de 2MB
                            </Text>
                          }
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
                      <Card>
                        <CardBody>
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
                              <img
                                src={require('../assets/youtube.svg')}
                                alt="youtube"
                                style={{
                                  width: '2rem'
                                }}
                                />
                                <Text
                                  className='default-text'
                                  style={{
                                    fontSize: ['xs', 'sm'].includes(screenClass) ? '.7rem' : '.8rem'
                                  }}
                                >
                                  Link del video
                                </Text>
                            </Col>
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
                                  fontFamily: 'Montserrat-Bold',
                                  fontSize: ['xs', 'sm'].includes(screenClass) ? '.7rem' : '.8rem'
                                }}
                              >
                                COPIA Y PEGA EL LInk del video
                              </Text>
                              <Input
                                placeholder='Ej. https://www.youtube.com/watch?v=ClS2J9UNNck'
                                type='text'
                                name='video'
                                value={video}
                                onChange={(event) => setVideo(event.target.value)}
                                style={{
                                  height: '2rem',
                                  paddingLeft: '.5rem',
                                  paddingRight: '.5rem',
                                  width: '100%',
                                  borderRadius: '4px',
                                  border: '1px solid rgba(31, 32, 65, 0.5)'
                                }}
                              />
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  style={{
                    marginTop: '1rem',
                    display: ['xs', 'sm'].includes(screenClass) ? 'block' : 'flex',
                    justifyContent: ['xs', 'sm'].includes(screenClass) ? '' : 'flex-end'
                  }}
                >
                  <Button
                    onClick={() => verifyResources()}
                    style={{
                      width: ['xs', 'sm'].includes(screenClass) ? '100%' : '10rem'
                    }}
                  >
                    guardar
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
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
            paddingLeft: ['xs', 'sm'].includes(screenClass) ? `15px` : `${5}rem`,
            paddingRight: ['xs', 'sm'].includes(screenClass) ? `15px` : `${5}rem`,
            marginBottom: `${1}rem`
          }}
        >
          <Card
            style={{
              backgroundColor: '#EBEBEB'
            }}
          >
            <CardBody
              style={{
                paddingTop: '.8rem'
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
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <img
                    src={require('../assets/tip.svg')}
                    alt="tip"
                    style={{
                      width: '1.3rem'
                    }}
                  />
                  <Text
                    className='default-text'
                    style={{
                      marginLeft: '1rem',
                      color: '#FF3300',
                      fontSize: '.9rem',
                      textTransform: 'uppercase',
                      fontFamily: 'Montserrat-Bold'
                    }}
                  >
                    Ten en cuenta
                  </Text>
                </Col>
              </Row>
            </CardBody>
            <CardBody
              style={{
                paddingTop: ['xs', 'sm'].includes(screenClass) ? 0 : '20px',
                paddingBottom: ['xs', 'sm'].includes(screenClass) ? '20px' : '3rem'
              }}
            >
              <Row>
                <Col
                  xs={4}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                >
                  <Text
                    className='default-text'
                    style={{
                      color: '#000000',
                      fontSize: ['xs', 'sm'].includes(screenClass) ? '.6rem' : '.8rem',
                      fontFamily: 'Montserrat-Bold',
                      textTransform: 'uppercase'
                    }}
                  >
                    Elije fotos emocionales
                  </Text>
                  <Text
                    className='default-text'
                    style={{
                      marginTop: '1rem',
                      display: 'block',
                      color: '#606060',
                      fontSize: ['xs', 'sm'].includes(screenClass) ? '.6rem' : '.8rem'
                    }}
                  >
                    Las fotos de personas o animales funcionan bien. Fotos con perosnas viendo a la camara, reflejando la problematica.
                  </Text>
                </Col>
                <Col
                  xs={4}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                >
                  <Text
                    className='default-text'
                    style={{
                      color: '#000000',
                      fontSize: ['xs', 'sm'].includes(screenClass) ? '.6rem' : '.8rem',
                      fontFamily: 'Montserrat-Bold',
                      textTransform: 'uppercase'
                    }}
                  >
                    Intenta subir fotos con buena resolución
                  </Text>
                  <Text
                    className='default-text'
                    style={{
                      marginTop: '1rem',
                      display: 'block',
                      color: '#606060',
                      fontSize: ['xs', 'sm'].includes(screenClass) ? '.6rem' : '.8rem'
                    }}
                  >
                    No subas imagenes muy pequeñas porque se van a distorsionar en grandes pantallas, ten en cuenta el peso recomendado de las imagenes, las imagenes pesadas haran lento el sitio.
                  </Text>
                </Col>
                <Col
                  xs={4}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                >
                  <Text
                    className='default-text'
                    style={{
                      color: '#000000',
                      fontSize: ['xs', 'sm'].includes(screenClass) ? '.6rem' : '.8rem',
                      fontFamily: 'Montserrat-Bold',
                      textTransform: 'uppercase'
                    }}
                  >
                    Se amigable
                  </Text>
                  <Text
                    className='default-text'
                    style={{
                      marginTop: '1rem',
                      display: 'block',
                      color: '#606060',
                      fontSize: ['xs', 'sm'].includes(screenClass) ? '.6rem' : '.8rem'
                    }}
                  >
                    Ten en cuenta de respetar los derechos de las personas y/o animales, no seas muy rudo con tu contenido visual.
                    <br/><br/>
                    Si tienes fotos de otras personas pricipalmente niños, solicita permiso para publicarlas.
                  </Text>
                </Col>
              </Row>
            </CardBody>
          </Card>
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
            paddingLeft: ['xs', 'sm'].includes(screenClass) ? `15px` : `${5}rem`,
            paddingRight: ['xs', 'sm'].includes(screenClass) ? `15px` : `${5}rem`,
            marginBottom: `${1}rem`
          }}
        >
          <Card>
            <CardBody
              style={{
                paddingTop: ['xs', 'sm'].includes(screenClass) ? 0 : '5px',
                paddingBottom: 0
              }}
            >
              <Row>
                <Col
                  xs={10}
                  sm={10}
                  md={10}
                  lg={10}
                  xl={10}
                >
                  <Text
                    className='default-text'
                    style={{
                      color: '#000000',
                      fontSize: ['xs', 'sm'].includes(screenClass) ? '.6rem' : '.8rem'
                    }}
                  >
                    Selecciona máx (10) tags para tu petición
                  </Text>
                </Col>
                <Col
                  xs={2}
                  sm={2}
                  md={2}
                  lg={2}
                  xl={2}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}
                >
                  <img
                    src={isValid.tags ? require('../assets/section_check.svg') : require('../assets/section_edit.svg')}
                    alt='ico'
                    style={{
                      marginTop: ['xs', 'sm'].includes(screenClass) ? '.5rem' : 'auto',
                      width: '1.4rem'
                    }}
                  />
                </Col>
              </Row>
            </CardBody>
            <hr
              style={{
                marginTop: '.5rem',
                marginBottom: '.5rem'
              }}
            />
            <CardBody>
              <Row>
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
                    >
                      <Row>
                        {tags.map((t, i) => (
                          <Col
                            key={i}
                          >
                            <Badge
                              color="primary"
                            >
                              <Text
                                className='default-text'
                                style={{
                                  color: '#fff',
                                  fontSize: ['xs', 'sm'].includes(screenClass) ? '.6rem' : '.5rem',
                                  marginRight: '1rem'
                                }}
                              >
                                {t}
                              </Text>
                              <FontAwesomeIcon
                                icon={['fas', 'trash']}
                                onClick={() => onDeleteTag(t)}
                                style={{cursor: 'pointer'}}
                              />
                            </Badge>
                          </Col>
                        ))}
                      </Row>
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
                        >
                          <Text
                            className='default-text'
                            style={{
                              color: '#000000',
                              fontSize: ['xs', 'sm'].includes(screenClass) ? '.7rem' : '.8rem',
                              fontFamily: 'Montserrat-Bold',
                              textTransform: 'uppercase'
                            }}
                          >
                            tags
                          </Text>
                        </Col>
                        <Col
                          xs={9}
                          sm={9}
                          md={5}
                          lg={5}
                          xl={5}
                        >
                          <Input
                            placeholder='Escribe una palabra clave'
                            type='text'
                            name='tag'
                            value={tag}
                            onChange={(event) => setTag(event.target.value)}
                            style={{
                              height: '2rem',
                              paddingLeft: '.5rem',
                              paddingRight: '.5rem',
                              width: '100%',
                              borderRadius: '4px',
                              border: '1px solid rgba(31, 32, 65, 0.5)'
                            }}
                          />
                          {tagInvalid &&
                            <Text
                              className='default-text'
                              style={{
                                color: '#FF647C',
                                display: 'block',
                                fontSize: ['xs', 'sm'].includes(screenClass) ? '.7rem' : '.7rem'
                              }}
                            >
                              Ingresa tu etiqueta
                            </Text>
                          }
                          {maxTag &&
                            <Text
                              className='default-text'
                              style={{
                                color: '#FF647C',
                                display: 'block',
                                fontSize: ['xs', 'sm'].includes(screenClass) ? '.7rem' : '.7rem'
                              }}
                            >
                              Ya has colocado el máximo de etiquetas
                            </Text>
                          }
                        </Col>
                        <Col
                          xs={3}
                          sm={3}
                          md={2}
                          lg={2}
                          xl={2}
                          style={{
                            paddingTop: '.1rem',
                          }}
                          >
                          <Button
                            onClick={() => verifyTagInput()}
                            style={{
                              width: '2rem'
                            }}
                          >
                            <FontAwesomeIcon
                              icon={['fas', 'plus']}
                              color={'#fff'}
                              />
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  style={{
                    marginTop: '1rem',
                    display: ['xs', 'sm'].includes(screenClass) ? 'block' : 'flex',
                    justifyContent: ['xs', 'sm'].includes(screenClass) ? '' : 'flex-end'
                  }}
                >
                  <Button
                    onClick={() => verifyTagInput(true)}
                    style={{
                      width: ['xs', 'sm'].includes(screenClass) ? '100%' : '10rem'
                    }}
                  >
                    guardar
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
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
            marginTop: '2rem',
            marginBottom: '2rem'
          }}
        >
          {
            allValid && 
            <Button
              onClick={() => onComplete()}
              style={{
                width: ['xs', 'sm'].includes(screenClass) ? '100%' : '60%'
              }}
            >
              TERMINAR Y ENVIAR PARA APROBACIÓN
            </Button>
          }
        </Col>
      </Row>
    </>
  )
}

export default Step2