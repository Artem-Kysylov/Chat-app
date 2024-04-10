// Import libraries 
import React from 'react'

// Import components 
import { ChatTop } from '../chat-top/ChatTop'
import { Messages } from '../messages/Messages'
import { ChatInput } from '../ui/chat-input/ChatInput'

export const Chat = () => {
  return (
    <div className='chat__wrapper'>
        <ChatTop/>
        <Messages/>
        <ChatInput/>
    </div>
  )
}
