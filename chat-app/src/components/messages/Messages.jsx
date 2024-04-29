// Import libraries 
import React, { useState, useEffect } from 'react'
import { doc } from "firebase/firestore"
import { db } from '../../firebase'
import { onSnapshot } from 'firebase/firestore'

// Import context 
import { ChatUser } from '../../context/ChatContext'

// Import components 
import { Message } from '../message/Message'

export const Messages = () => {
  // State 
  const [messages, setMessages] = useState([])
  // Context 
  const { data } = ChatUser()

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })
    return () => {
      unsubscribe()
    }
  }, [data.chatId])

  return (
    <div className='messages'>
      {messages && messages.map((message) => (
        <Message
          key={message.id}
          message={message}
        />
      ))}
    </div>
  )
}
