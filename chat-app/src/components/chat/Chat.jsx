// Import libraries 
import React from 'react'

// Import components 
import { Messages } from '../messages/Messages'
import { ChatInput } from '../chat-input/ChatInput'

export const Chat = () => {
  return (
    <div className='chat'>
        <div className="chat__info">
            <span className='chat__info-username'>Sam</span>
        </div>
        <Messages/>
        <ChatInput/>
    </div>
  )
}
