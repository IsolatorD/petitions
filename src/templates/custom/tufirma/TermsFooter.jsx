import React from 'react'
import {Row, Col, useScreenClass} from 'react-grid-system'
import Text from '../../../components/Text'

const TermsFooter = () => {
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
          backgroundColor: '#1CB19E',
          height: ['xs', 'sm'].includes(screenClass) ? `${8}rem` : `${3}rem`,
          paddingTop: `${1}rem`
        }}
      >
        <Row>
          <Col
            xs={12}
            sm={12}
            md={9}
            lg={9}
            xl={9}
            
            style={{
              paddingLeft: ['xs', 'sm'].includes(screenClass) ? `${15}px`: `${6}rem`
            }}
          >
            <Text
              className="default-text"
              style={{
                fontSize: ['xs', 'sm'].includes(screenClass) ? `${1.1}rem` : `${.8}rem`,
                fontWeight: 'bolder',
                color: '#fff'
              }}
            >
              © Religión en Libertad 2020 Todos los derechos reservados
            </Text>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={3}
            lg={3}
            xl={3}
            
            style={{
              paddingTop: ['xs', 'sm'].includes(screenClass) ? `${1.5}rem`: 0
            }}
          >
            <Text
              className="default-text"
              style={{
                fontSize: ['xs', 'sm'].includes(screenClass) ? `${1}rem` : `${.8}rem`,
                fontWeight: 'bolder',
                color: '#fff'
              }}
            >
              Términos y condiciones
            </Text>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default TermsFooter