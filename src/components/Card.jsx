import React from 'react'

const Card = (props) => (
  <div
    {...props}
  >
    {props.children || null}
  </div>
)

export default Card