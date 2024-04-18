// Import libraries
import React, { useState, useEffect } from 'react'
import { db } from '../../firebase'
import { doc, onSnapshot } from "firebase/firestore"
import { UserAuth } from '../../context/AuthContext'

// Import components 
import { UserChat } from '../user-chat/UserChat'

export const Chats = () => {
  // States 
  const [chats, setChats] = useState([])

  // Context
  const { user } = UserAuth()

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

  return (
    <div className='chats'>
      <UserChat/>
      <UserChat/>
      <UserChat/>
    </div>
  )
}
