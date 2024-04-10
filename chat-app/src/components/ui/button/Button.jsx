// Import libraries
import React from 'react'

export const Button = (props) => {
  return (
    <button className='button' style={props.style}>{props.text}</button>
  )
}
