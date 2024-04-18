// Import libraries 
import React, { useState } from 'react'
import { CgSearch } from "react-icons/cg";
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  setDoc,
  getDoc, 
  doc, 
  updateDoc, 
  serverTimestamp 
} from "firebase/firestore"
import { db } from '../../../firebase'
import { UserAuth } from '../../../context/AuthContext'


export const Search = () => {
  // States 
  const [username, setUsername] = useState('')
  const [chatUser, setChatUser] = useState(null)
  const [error, setError] = useState(false)

  // Context
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
        const userData = doc.data()
        setChatUser(userData)
        console.log(doc.id, " => ", doc.data());
      })
      setError(false)
    } catch (error) {
      setError(true)
    }
  }

  // HandleKey function 
  const handleKey = (e) => {
    e.code === 'Enter' && handleSearch()
  }

  // Handleselect function 
  const handleSelect = async () => {
    // Check chats in firestore exists, if not create new one 
    const combinedId = 
    user.uid > chatUser.uid 
    ? user.uid + chatUser.uid 
    : chatUser.uid + user.uid
    try {
      const res = await getDoc( doc(db, 'chats', combinedId))
      if(!res.exists()) {
        // Create chat in chats collection
        await setDoc(doc(db, 'chats', combinedId)), { messages: []} 

        // create user chats 
        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId + '.userInfo'] : {
            uid: chatUser.uid,
            displayName: chatUser.displayName,
            photoURL: chatUser.photoURL
          },
          [combinedId + '.date'] : serverTimestamp()
        }) 
        await updateDoc(doc(db, 'userChats', chatUser.uid), {
          [combinedId + '.userInfo'] : {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId + '.date'] : serverTimestamp()
        }) 
      }
      setChatUser(null)      
    } catch (error) {
      setError(true)
    }
    setUsername('')
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
            value={username} 
          />
      </div>
      <>
        {error && <span className='search__error-hint'>Sorry, user not found..</span>}
        {chatUser && <div className="search__user-chat" onClick={handleSelect}>
            <img className='search__user-chat-img' src={chatUser.photoURL} alt="/" />
            <div className="search__user-chat-info">
                <span className='search__user-chat-name'>{chatUser.displayName}</span>
            </div>
          </div> 
        }            
      </>
    </div>
  )
}
