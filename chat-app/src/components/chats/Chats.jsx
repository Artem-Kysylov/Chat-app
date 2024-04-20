// Import libraries
import React, { useState, useEffect } from 'react'
import { db } from '../../firebase'
import { doc, onSnapshot } from "firebase/firestore"

// Import context 
import { UserAuth } from '../../context/AuthContext'
import { ChatUser } from '../../context/ChatContext'

// Import components 
import { UserChat } from '../user-chat/UserChat'

export const Chats = () => {
  // States 
  const [chats, setChats] = useState([])

  // Context
  const { user } = UserAuth()
  const { dispatch } = ChatUser()

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
        setChats(doc.data())
      })
      return () => {
        unsub()
      }
    }
    user.uid && getChats()
  },[user.uid])

  const handleSelect = (user) => {
    dispatch({type:'CHANGE_USER', payload: user})
  }

  return (
    <div className='chats'>
      {chats && Object.entries(chats)?.map((chat) => (
        <UserChat
          onClick={() => handleSelect(chat[1].userInfo)}
          key={chat[0]}
          photoUrl={chat[1].userInfo.photoUrl}
          displayName={chat[1].userInfo.displayName}
          lastMessage={chat[1].userInfo.lastMessage?.text}
        />
      ))}
    </div>
  )
}
