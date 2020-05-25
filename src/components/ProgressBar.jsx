import React from 'react'
import PropTypes from 'prop-types'

const ProgressBar = (props) => (
  <div
    style={{
      width: props.width,
      height: props.height,
      backgroundColor: props.color,
      borderRadius: props.rounded ? `${1}rem` : 0
    }}
  >
    <div
      style={{
        width: props.progressWidth,
        height: props.height,
        backgroundColor: props.progressColor,
        borderRadius: props.rounded ? `${1}rem` : 0
      }}
    >
    </div>
  </div>
)

ProgressBar.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
  progressWidth: PropTypes.string,
  progressColor: PropTypes.string,
  rounded: PropTypes.bool
}

ProgressBar.defaultProps = {
  width: `${100}%`,
  height: `${.6}rem`,
  color: 'rgba(196, 196, 196, 0.5)',
  progressWidth: `${10}%`,
  progressColor: '#FF3300',
  rounded: true
}

export default ProgressBar