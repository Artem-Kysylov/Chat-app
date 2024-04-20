// Import libraries 
import React from 'react'

// Import context 
import { ChatUser } from '../../context/ChatContext'

export const ChatTop = () => {
  // Context 
  const { data } = ChatUser()

  return (
    <div className='chatTop__wrapper'>
        <span className='chatTop__name'>{data.user?.displayName}</span>
    </div>
  )
}
