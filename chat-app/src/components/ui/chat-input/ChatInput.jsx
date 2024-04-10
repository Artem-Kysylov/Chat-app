// Import libraries 
import React from 'react'
import { GoPaperclip } from "react-icons/go"

// Import components 
import { ChatButton } from '../../ui/chat-button/ChatButton'

export const ChatInput = () => {
  return (
    <div className='chatInput__wrapper'>
      <GoPaperclip 
        style={{ color: '#ACACAC'}}
      />
      <input type="text" placeholder='Type your message...' />
      <ChatButton/>
    </div>
  )
}
