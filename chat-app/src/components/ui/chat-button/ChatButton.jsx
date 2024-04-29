// Import libraries 
import React from 'react'
import { PiPaperPlaneRightLight } from "react-icons/pi"

export const ChatButton = (props) => {
  return (
    <button className='chatButton'
      onClick={props.onClick}
    >
        <PiPaperPlaneRightLight 
            style={{ color: 'white'}}
        />
    </button>
  )
}
