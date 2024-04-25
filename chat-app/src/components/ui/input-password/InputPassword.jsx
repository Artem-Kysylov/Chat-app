// Import libraries 
import React, { useState} from 'react'
import { FaEye } from "react-icons/fa"
import { FaEyeSlash } from "react-icons/fa"


export const InputPassword = (props) => {
    // State 
    const [visible, setVisible] = useState(false)

    return (
      <div className='input__password__wrapper'
        style={props.style} 
      >
        <label htmlFor='password'>Password</label>
        <div className="input__password__items">
            <input className='password__input'
                onChange={props.onChange} 
                type={visible ? 'text' : 'password'}
                value={props.value} 
                placeholder={props.placeholder}
            />
            <div className='input__password-icon' onClick={() => setVisible(!visible)}>
                { visible ? <FaEye /> : <FaEyeSlash />}            
            </div>  
        </div>
      </div>
    )
  }
