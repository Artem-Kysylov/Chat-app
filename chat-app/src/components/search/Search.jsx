// Import libraries 
import React, { useState, useEffect } from 'react'
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
import { db } from '../../firebase'

// Import context 
import { UserAuth } from '../../context/AuthContext'


export const Search = () => {
  // States 
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState(false)

  // Context
  const { currentUser } = UserAuth()

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
        setUser(userData)
        console.log(doc.id, " => ", doc.data());
      })
      setError(false)
    } catch (error) {
      setError(true)
    }
  }

  // HandleKey function 
  const handleKey = (e) => {
    if(e.code === 'Enter') {
      handleSearch()
    }
  }

  const handleSelect = async () => {
    // Check if chat exists in Firestore, if not, create a new one
    const combinedId = 
    currentUser.uid > user.uid 
    ? currentUser.uid + user.uid 
    : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId))
      
      if (!res.exists()) {
        // Create a new chat in the 'chats' collection
        await setDoc(doc(db, 'chats', combinedId), { messages: [] })

        // Create user chats 
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(), 
        })

        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(), 
        })
      }
    } catch (error) {
      // Set error only if the chat creation fails
      setError(true)
    }    
    // Reset the username field and set user to null
    setUser(null)
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
        {user && <div className="search__user-chat" onClick={handleSelect}>
            <img className='search__user-chat-img' src={user.photoURL} alt="/" />
            <div className="search__user-chat-info">
                <span className='search__user-chat-name'>{user.displayName}</span>
            </div>
          </div> 
        }            
      </>
    </div>
  )
}
