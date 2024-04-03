import React from 'react'
import { Link } from 'react-router-dom'

export const TextLink = (props) => {
  return (
    <span className="text__link">
      <Link 
        to={props.to} 
        onClick={props.onClick}
      >         
        {props.text}
      </Link>
    </span>
  )
}
