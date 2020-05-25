import React from 'react'
import PropTypes from 'prop-types'

const Badge = (props) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      backgroundColor: props.color,
      color: props.textColor,
      borderRadius: props.rounded ? `${1}rem` : 0,
      textTransform: 'uppercase',
      width: `auto`,
      padding: `${.7}rem`,
      margin: `${.3}rem`,
      fontSize: `${.6}rem`,
      fontFamily: 'Montserrat',
      fontWeight: 'bolder',
      display: 'inline-block'
    }}
  >
    {props.children}
  </div>
)

Badge.propTypes = {
  color: PropTypes.string,
  textColor: PropTypes.string,
  rounded: PropTypes.bool
}

Badge.defaultProps = {
  color: '#1DA1F2',
  textColor: '#fff',
  rounded: true
}

export default Badge