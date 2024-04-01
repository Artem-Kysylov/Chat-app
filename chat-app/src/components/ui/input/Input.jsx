// Import libraries
import React from 'react'

export const Input = (props) => {
  return (
    <div>
      <label>{props.label}</label>
      <input type={props.type} placeholder={props.placeholder}/>
    </div>
  )
}
