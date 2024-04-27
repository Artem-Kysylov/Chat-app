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
  const { currentUser } = UserAuth()
  const { dispatch } = ChatUser()

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data())
      })
      return () => {
        unsub()
      }
    }
    currentUser.uid && getChats()
  },[currentUser.uid])

  const handleSelect = (user) => {
    dispatch({ type:'CHANGE_USER', payload: user })
    const userChats = user.chats || []
    userChats.forEach(chat => {
      if (!chats.some(existingChat => existingChat.chatId === chat.chatId)) {
        setChats(prevChats => [...prevChats, chat]);
      }
    })
  }

  console.log(chats)


  return (
    <div className='chats'>
      {Array.isArray(chats) && Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
        <UserChat
          onClick={() => handleSelect(chat)}
          key={chat[0]}
          photoUrl={chat.userInfo.photoUrl ? chat.userInfo.photoUrl : ""}
          displayName={chat.userInfo.displayName ? chat.userInfo.displayName : ""}
          lastMessage={chat.lastMessage?.text}
        />
      ))}
    </div>
  )
}
