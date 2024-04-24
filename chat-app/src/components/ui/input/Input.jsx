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
      {props.toggleIcon && (
        <div
          className='toggle__icon'
          onClick={props.onToggle}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
          }}  
        >
          {props.toggleIcon}    
        </div>
      )}
    </div>
  )
}
