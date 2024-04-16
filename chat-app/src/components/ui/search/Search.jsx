// Import libraries 
import React, { useState } from 'react'
import { CgSearch } from "react-icons/cg";
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from '../../../firebase'
import { UserAuth } from '../../../context/AuthContext'


export const Search = () => {
  const [username, setUsername] = useState('')
  const [chatUser, setChatUser] = useState(null)
  const [error, setError] = useState(false)

  const { user } = UserAuth()

  // HandleSearch function 
  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==' , username)
    )
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      })
    } catch (error) {
      setError(true)
    }
  }

  // HandleKey function 
  const handleKey = (e) => {
    e.code === 'Enter' && handleSearch()
  }

  const handleSelect = async () => {
    // Check chats in firestore exists, if not create new one 
    const combinedId = user.uid
    const res = await getDocs(db, 'chats')
    // Create user chats 
  }

  return (
    <div className="search">
      <div className='search__wrapper'>
          <CgSearch 
            style={{ color: '#ACACAC'}}
          />
          <input 
            type="text" 
            placeholder='Find a user...'
            onKeyDown={handleKey}
            onChange={(e) => setUsername(e.target.value)} 
          />
      </div>
      {error && <span>Sorry, user not found..</span>}
      {chatUser && 
      <div className="user__chat" onClick={handleSelect}>
        <img className='user__chat-img' src={chatUser?.photoURL} alt="/" />
        <div className="user__chat-info">
            <span className='user__chat-name'>{chatUser?.displayName}</span>
        </div>
      </div> 
      }      
    </div>
  )
}
