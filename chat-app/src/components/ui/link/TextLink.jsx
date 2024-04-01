import React from 'react'
import { Link } from 'react-router-dom'

export const TextLink = (props) => {
  return (
    <Link to={props.to}>         
        {props.text}
    </Link>
  )
}
