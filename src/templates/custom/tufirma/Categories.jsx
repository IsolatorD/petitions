import React from 'react'

import {Row, Col, Visible, useScreenClass} from 'react-grid-system'

import Card from '../../../components/Card'
import Text from '../../../components/Text'
import CustomSelect from '../../../components/CustomSelect'

import {connect} from 'react-redux'

const Categories = ({ categories, categorySelected, changeCategory }) => {
  const screenClass = useScreenClass()
  return (
    <Col
      xs={12}
      sm={12}
      md={12}
      lg={12}
      xl={12}
      style={{
        paddingLeft: ['xs', 'sm'].includes(screenClass) ? '15px' : `${2.5}rem`,
      }}
    >
      <Visible
        xs
        sm
      >
        <CustomSelect
          onChangeCategory={changeCategory}
          optionsList={categories}
          defaultSelect={{
            name: categorySelected ? categorySelected.name : '',
            value: categorySelected ? categorySelected.id : '',
            icon: categorySelected ? categorySelected.icon : ''
          }}
        />
      </Visible>
      <Visible
        md
        lg
        xl
      >
        <Row
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',                
            flexWrap: 'wrap'
          }}
        >
          {
            categories.map((ct, i) => (
              <Col
                key={i}
                md={1.3}
                lg={1.3}
                xl={1.3}
                style={{
                  padding: 4
                }}
              >
                <Card
                  onClick={() => changeCategory(ct)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: categorySelected && categorySelected.id === ct.id ? '#FF3300' : '#fff',
                    boxShadow: `${0} ${4}px ${4}px rgba(0, 0, 0, 0.25)`,
                    padding: 10,
                    height: `${7}rem`
                  }}
                >
                  <img
                    src={ct.icon}
                    alt={ct.name}
                    style={{
                      width: `${2.7}rem`,
                      height: `${2.7}rem`
                    }}
                  />
                  <Text
                    className="default-text"
                    style={{
                      textTransform: 'uppercase',
                      paddingTop: 10,
                      fontSize: ['xs', 'sm'].includes(screenClass) ? `${12}px` : ['md'].includes(screenClass) ?`${.45}rem` : `${.5}rem`,
                      fontWeight: 'bolder',
                      color: categorySelected && categorySelected.id === ct.id ? '#fff' : '#494C54',
                      paddingRight: ['xs', 'sm'].includes(screenClass) ? 0 : 60,
                      paddingLeft: ['xs', 'sm'].includes(screenClass) ? 0 : 60,
                      textAlign: 'center'
                    }}
                  >
                    {ct.name}
                  </Text>
                </Card>
              </Col>
            ))
          }
        </Row>
      </Visible>
    </Col>
  )
}

const mapStateToProps = (state, store) => ({
  categories: state.petitions.categories
})

export default connect(mapStateToProps)(Categories)