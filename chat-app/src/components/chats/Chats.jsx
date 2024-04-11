// Import libraries
import React from 'react'

// Import components 
import { UserChat } from '../user-chat/UserChat'

export const Chats = () => {
  return (
    <div className='chats'>
      <UserChat/>
      <UserChat/>
      <UserChat/>
    </div>
  )
}
