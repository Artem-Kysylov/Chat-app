// Import libraries
import React from 'react'

export const Input = (props) => {
  return (
    <div className='input__wrapper'
      style={props.style} 
    >
      <label>{props.label}</label>
      <input
        onChange={props.onChange} 
        type={props.type} 
        placeholder={props.placeholder}
      />
    </div>
  )
}
