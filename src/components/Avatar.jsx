import React from 'react'
import PropTypes from 'prop-types'

const Avatar = (props) => (
  <div
    style={{
      backgroundColor: props.color,
      width: `${props.size}rem`,
      height: `${props.size}rem`,
      borderRadius: props.rounded ? `${100}%` : 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: `${props.size / 3.5}rem`,
      fontFamily: 'Montserrat-Bold'
    }}
  >
    {
      props.url &&
      <img
        src={props.url}
        alt="avatar"
        style={{
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: `${100}%`,
          height: `${100}%`
        }}
      />
    }
    {!props.url && props.children}
  </div>
)

Avatar.prototype = {
  url: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  rounded: PropTypes.bool
}

Avatar.defaultProps = {
  url: null,
  size: 6,
  color: '#FF3300',
  rounded: true
}

export default Avatar