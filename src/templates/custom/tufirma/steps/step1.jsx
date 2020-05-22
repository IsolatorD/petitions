import React, {useState, useEffect} from 'react'

import {Row, Col, useScreenClass} from 'react-grid-system'

import Text from '../../../../components/Text'
import Button from '../../../../components/Button'
import Card from '../../../../components/Card'

import Categories from '../Categories'

const TYPES = [
  {name: 'Apoyo', value: 'SUPPORTING'},
  {name: 'Defensa', value: 'DEFENDING'},
  {name: 'Discusión', value: 'ARGUING'},
  {name: 'Súplica', value: 'PLEADING'}
]

const Step1 = ({typeSelected, categorySelected, onSelectType, onSelectCategory, changeStep}) => {
  const screenClass = useScreenClass()
  const [isValid, setIsValid] = useState({type: true, category: true })

  const verifyBeforeNext = () => {
    setIsValid({
      type: !!typeSelected,
      category: !!categorySelected
    })

    if (typeSelected && categorySelected) {
      changeStep(2)
    }
  }

  return (
    <>
      <Row
        style={{
          paddingTop: ['xs', 'sm'].includes(screenClass) ? `${1.5}rem` : `${3}rem`
        }}
      >
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{
            paddingLeft: ['xs', 'sm'].includes(screenClass) ? `15px` : `${2.5}rem`,
            paddingBottom: `${1}rem`
          }}
        >
          <Text
            className='default-title'
            style={{
              color: '#FF3300',
              fontFamily: 'Montserrat-Bold',
              textTransform: 'uppercase',
              fontSize: ['xs', 'sm'].includes(screenClass) ? `${1.3}rem` : `${2}rem`
            }}
          >
            ¿Qué tipo {' '}
            <Text
              className='default-title'
              style={{
                color: '#000000',
                fontFamily: 'Montserrat-Bold',
                textTransform: 'uppercase',
                fontSize: ['xs', 'sm'].includes(screenClass) ? `${1.3}rem` : `${2}rem`
              }}
            >
              de campaña <br/> estás solicitando?
            </Text>
          </Text>
        </Col>
      </Row>
      <Row>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={6}
          xl={6}
          style={{
            marginTop: `${1}rem`,
            paddingLeft: ['xs', 'sm'].includes(screenClass) ? '15px' : `${2.5}rem`,
          }}
        >
          <Row>
            {TYPES.map((type, i) => (
              <Col
                key={i}
                xs={3}
                sm={3}
                md={3}
                lg={3}
                xl={3}
              >
                <Card
                  onClick={() => onSelectType(type.value)}
                  style={{
                    backgroundColor: typeSelected === type.value ? '#FF3300' : '#DBDBDB',
                    borderRadius: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: ['xs', 'sm'].includes(screenClass) ? '4rem' : '5rem',
                    height: ['xs', 'sm'].includes(screenClass) ? '4rem' : '5rem'
                  }}
                >
                  <Text
                    className="default-text"
                    style={{
                      color: typeSelected === type.value ? '#fff' : '#2B2B2B',
                      textAlign: 'center',
                      fontFamily: 'Montserrat-Bold',
                      fontSize: ['xs', 'sm'].includes(screenClass) ? `${.6}rem` : `${.7}rem`
                    }}
                  >
                    {type.name}
                  </Text>
                </Card>
              </Col>
            ))}
            {
              !isValid.type &&
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
                  className="default-text"
                  style={{
                    color: '#FF647C',
                    textAlign: 'center',
                    fontFamily: 'Montserrat-Bold',
                    fontSize: ['xs', 'sm'].includes(screenClass) ? `${.6}rem` : `${.7}rem`
                  }}
                >
                  Debe seleccionar un tipo
                </Text>
              </Col>
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
            paddingLeft: ['xs', 'sm'].includes(screenClass) ? '15px' : `${2.5}rem`,
            marginTop: `${3}rem`,
            marginBottom: `${2}rem`
          }}
        >
          <Text
            className="default-text"
            style={{
              color: '#676C77',
              fontSize: ['xs', 'sm'].includes(screenClass) ? `${1}rem` : `${1}rem`
            }}
          >
            Al seleccionar una categoría, tufirma.org puede recomendar tu campaña a los interesados.
          </Text>
        </Col>
        <Categories
          categorySelected={categorySelected}
          changeCategory={onSelectCategory}
        />
        {
          !isValid.category &&
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            style={{
              marginTop: '1rem',
              paddingLeft: ['xs', 'sm'].includes(screenClass) ? '15px' : `${2.5}rem`
            }}
          >
            <Text
              className="default-text"
              style={{
                color: '#FF647C',
                textAlign: 'center',
                fontFamily: 'Montserrat-Bold',
                fontSize: ['xs', 'sm'].includes(screenClass) ? `${.6}rem` : `${.7}rem`
              }}
            >
              Debe seleccionar una categoria
            </Text>
          </Col>
        }
      </Row>
      <Row>
        <Col
          xs={12}
          sm={12}
          md={2}
          lg={2}
          xl={2}
          style={{
            paddingLeft: ['xs', 'sm'].includes(screenClass) ? '15px' : `${2.5}rem`,
            marginTop: `${3}rem`,
            marginBottom: `${2}rem`
          }}
        >
          <Button
            onClick={() => verifyBeforeNext()}
            style={{
              width: '100%',
              height: '2rem'
            }}
          >
            continuar
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default Step1