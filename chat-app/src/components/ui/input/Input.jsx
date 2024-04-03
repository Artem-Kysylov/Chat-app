// Import libraries
import React from 'react'

export const Input = (props) => {
  return (
    <div className='input__wrapper'>
      <label>{props.label}</label>
      <input
        style={props.style} 
        onChange={props.onChange} 
        type={props.type} 
        placeholder={props.placeholder}
      />
    </div>
  )
}
