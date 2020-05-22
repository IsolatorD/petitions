import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Input = (props) => (
  <div
    style={{
      width: props.width,
      display: 'flex',
      justifyContent: 'center'
    }}
  >
    {/* {props.icon && props.iconPosition === 'start' &&
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          top: `${.7}rem`,
          left: `${4}em`
        }}
      >
        <FontAwesomeIcon
          icon={[props.iconType, props.icon]}
          size={props.iconSize}
          color={props.iconColor}
        />
      </div>
    } */}
    <input
      {...props}
    />
    {/* {props.icon && props.iconPosition === 'end' &&
      <div
        style={{
          position: 'absolute',
          marginTop: `${.6}rem`,
          right: `${2.5}rem`
        }}
      >
        <FontAwesomeIcon
          icon={[props.iconType, props.icon]}
          size={props.iconSize}
          color={props.iconColor}
        />
      </div>
    } */}
  </div>
)
// Input.prototype = {
//   icon: PropTypes.string,
//   iconSize: PropTypes.string,
//   iconColor: PropTypes.string,
//   iconType: PropTypes.string,
//   iconPosition: PropTypes.string
// }

// Input.defaultProps = {
//   icon: null,
//   iconColor: 'black',
//   iconSize: 'sm',
//   iconType: 'fas',
//   iconPosition: 'start'
// }

export default Input