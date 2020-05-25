import React from 'react'

const Button = (props) => (
  <span
    // className={props.className ? '' : 'default-text'}
    {...props}
  >
    {props.children || ''}
  </span>
)

export default Button