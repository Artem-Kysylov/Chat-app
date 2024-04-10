// Import libraries 
import React from 'react'
import { PiPaperPlaneRightLight } from "react-icons/pi"

export const ChatButton = () => {
  return (
    <button className='chatButton'>
        <PiPaperPlaneRightLight 
            style={{ color: 'white'}}
        />
    </button>
  )
}
