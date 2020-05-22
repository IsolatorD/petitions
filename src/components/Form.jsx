import React from 'react'
import PropTypes from 'prop-types'

import {useScreenClass} from 'react-grid-system'

import Text from './Text'

const Forms = ({formTitle, styles, children, isAuth}) => {
  const screenClass = useScreenClass()

  return (
    <div
      style={{
        width: ['xs', 'sm'].includes(screenClass) ? `${95}%` : `${40}%`,
        boxShadow: `0px 32px 50px rgba(50, 50, 71, 0.15)`,
        borderRadius: `13px 13px 0px 0px`,
        backgroundColor: '#fff',
        height: 'auto',
        ...styles
      }}
    >
      {
        formTitle && 
        <div
          style={{
            backgroundColor: '#FF3300',
            height: `${3.5}rem`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text
            className="default-title"
            style={{
              fontSize: ['xs', 'sm'].includes(screenClass) ? `${1}rem` : `${1}rem`,
              fontWeight: 'bolder',
              color: '#fff',
              textTransform: 'uppercase',
              paddingLeft: ['xs', 'sm'].includes(screenClass) ? '2.5rem' : '6rem',
              paddingRight: ['xs', 'sm'].includes(screenClass) ? '2.5rem' : '6rem',
              textAlign: 'center'
            }}
          >
            {formTitle}
          </Text>
        </div>
      }
      { isAuth && 
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: `${1.7}rem`,
            paddingBottom: `${1.7}rem`
          }}
        >
          <Text
            className="default-text"
            style={{
              fontSize: ['xs', 'sm'].includes(screenClass) ? `${.7}rem` : `${.7}rem`,
              color: '#454545',
              textAlign: 'center'
            }}
          >
            ¿Ya tienes una cuenta con nosotros?
            <Text
              className="default-text"
              style={{
                fontSize: ['xs', 'sm'].includes(screenClass) ? `${.7}rem` : `${.7}rem`,
                color: '#454545',
                textAlign: 'center',
                display: 'block',
                fontWeight: 'bolder'
              }}
            >
              Ingresa tus datos para continuar
            </Text>
          </Text>
        </div>
      }
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        {children}
      </div>
    </div>
  )
}

Forms.prototype = {
  formTitle: PropTypes.string,
  styles: PropTypes.object,
  isAuth: PropTypes.bool
}

Forms.defaultProps = {
  formTitle: null,
  styles: null,
  isAuth: true
}

export default Forms