// Import libraries
import React from 'react'

export const Input = (props) => {
  return (
    <div className='input__wrapper'
      style={props.style} 
    >
      <label>{props.label}</label>
      <input
        className='input'
        onChange={props.onChange} 
        type={props.type}
        value={props.value} 
        placeholder={props.placeholder}
      /> 
    </div>
  )
}
