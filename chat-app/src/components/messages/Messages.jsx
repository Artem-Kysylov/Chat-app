// Import libraries 
import React, { useState, useEffect } from 'react'
import { doc } from "firebase/firestore"
import { db } from '../../firebase'

// Import context 
import { ChatUser } from '../../context/ChatContext'

// Import components 
import { Message } from '../message/Message'
import { onSnapshot } from 'firebase/firestore'

export const Messages = () => {
  // State 
  const [messages, setMessages] = useState([])
  // Context 
  const { data } = ChatUser()

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })
    return () => {
      unsub()
    }
  }, [data.chatId])

  return (
    <div className='messages'>
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
        />
      ))}
    </div>
  )
}
