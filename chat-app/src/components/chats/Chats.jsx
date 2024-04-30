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

  const handleSelect = (selectedUser) => {
    console.log("Selected user:", selectedUser)
    dispatch({ type:'CHANGE_USER', payload: selectedUser })
  }


  return (
    <div className='chats'>
      {chats && Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <UserChat
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
          photoUrl={chat[1].userInfo.photoURL}
          displayName={chat[1].userInfo.displayName}
          lastMessage={chat[1].lastMessage}
        />
      ))}
    </div>
  )
}
