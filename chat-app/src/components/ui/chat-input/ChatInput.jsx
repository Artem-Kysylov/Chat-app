// Import libraries 
import React, { useState } from 'react'
import { GoPaperclip } from "react-icons/go"

// Import context 
import { UserAuth } from '../../../context/AuthContext'
import { ChatUser } from '../../../context/ChatContext'

// Import components 
import { ChatButton } from '../../ui/chat-button/ChatButton'

export const ChatInput = () => {
  // States
  const [text, setText] = useState('')
  const [img, setImg] = useState(null) 
    // Context 
  const { user } = UserAuth()
  const { data } = ChatUser()

  return (
    <div className='chatInput__wrapper'>
      <div className="chatInput__items">
        <div className="chatInput__items-send">        
          <input type="file" style={{ display: 'none'}} id='file' />
          <label htmlFor="file">
            <GoPaperclip 
              style={{ 
                color: '#ACACAC',
                height: '24px',
                width: '24px',
                cursor: 'pointer'
              }}
            />
          </label>          
        </div>
        <input type="text" placeholder='Type your message...' />
      </div>
      <ChatButton/>
    </div>
  )
}
