import React from 'react'

const Button = (props) => (
  <button
    className={props.styles ? '' : 'button-default'}
    {...props}
  >
    <span
      className={props.textStyles ? '' : 'default-text'}
    >
      {props.children || 'Texto'}
    </span>
  </button>
)

export default Button