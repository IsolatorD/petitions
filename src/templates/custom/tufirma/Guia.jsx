import React from 'react'
import {Row, Col, Visible, useScreenClass} from 'react-grid-system'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import Text from '../../../components/Text'

const Guia = () => {
  const screenClass = useScreenClass()

  return (
    <Row>
      <Col
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        style={{
          backgroundColor: '#A4DED2',
          height: ['xs', 'sm'].includes(screenClass) ? `${28}rem` : `${10}rem`,
          paddingTop: `${2}rem`
        }}
      >
        <Row>
          <Col
            xs={12}
            sm={12}
            md={4}
            lg={4}
            xl={4}
            
            style={{
              display: 'flex',
              textAlign: 'center',
              paddingTop: `${1}rem`,
              paddingBottom: `${1}rem`,
              paddingLeft: `${3}rem`,
              paddingRight: `${3}rem`
            }}
          >
            <Text
              className="default-title"
              style={{
                fontSize: ['xs', 'sm'].includes(screenClass) ? `${2.6}rem` : `${1.6}rem`,
                fontWeight: 'bolder',
                color: '#043B5E'
              }}
            >
              ¿Necesitas <br/>una guía?
            </Text>
            <Visible
              md
              lg
              xl
            >
              <img
                src={require('./assets/arrow.svg')}
                alt="arrow"
                style={{
                  width: `${1.5}rem`,
                  marginLeft: `${1}rem`
                }}
              />
            </Visible>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={4}
            lg={4}
            xl={4}
            
            style={{
              display: 'flex',
              textAlign: ['xs', 'sm'].includes(screenClass) ? 'center' : '',
              paddingTop: `${1}rem`,
              paddingBottom: `${1}rem`,
              paddingLeft: `${3}rem`,
              paddingRight: `${3}rem`
            }}
          >
            <Text
              className="default-title"
              style={{
                fontSize: ['xs', 'sm'].includes(screenClass) ? `${1}rem` : `${.8}rem`,
                fontWeight: 'bolder',
                color: '#043B5E'
              }}
            >
              Si no estas seguro de comenzar, te damos todo el material para que puedas iniciar tu campaña con éxito.
            </Text>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={4}
            lg={4}
            xl={4}
            
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Input
              placeholder="Ingresar Email"
              width={['xs', 'sm'].includes(screenClass) ? `${80}%` : `${90}%`}
              style={{
                border: 'none',
                borderRadius: 5,
                width: ['xs', 'sm'].includes(screenClass) ? `${80}%` : `${80}%`,
                height: 35,
                paddingRight: ['xs', 'sm'].includes(screenClass) ? 35 : `${8}rem`,
                paddingLeft: 20
              }}
            />
            <Visible
              md
              lg
              xl
            >
              <Button
                style={{
                  right: `${2.4}rem`,
                  position: 'absolute',
                  width: `${7}rem`,
                  cursor: 'pointer'
                }}
              >
                ENVIAR AHORA
              </Button>
            </Visible>
          </Col>
          <Visible
            xs
            sm
          >
            <Col
              xs={12}
              sm={12}
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: `${1}rem`
              }}
            >
              <Button
                style={{
                  width: `${19}rem`,
                  height: `${2}rem`
                }}
              >
                ENVIAR AHORA
              </Button>
            </Col>
          </Visible>
        </Row>
      </Col>
    </Row>
  )
}

export default Guia