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
    if(e.code === 'Enter') {
      handleSearch()
    }
  }

  const handleSelect = async () => {
    // Check if chat exists in Firestore, if not, create a new one
    const combinedId = user.uid > chatUser.uid ? user.uid + chatUser.uid : chatUser.uid + user.uid;
    try {
      const chatDoc = doc(db, 'chats', combinedId);
      const chatDocSnapshot = await getDoc(chatDoc);
      
      if (!chatDocSnapshot.exists()) {
        // Create a new chat in the 'chats' collection
        await setDoc(chatDoc, { messages: [] });

        // Update user chats 
        const userChatData = {
          userInfo: {
            uid: chatUser.uid,
            displayName: chatUser.displayName,
            photoURL: chatUser.photoURL
          },
          date: serverTimestamp()
        };
        
        await Promise.all([
          updateDoc(doc(db, 'userChats', user.uid), { [combinedId]: userChatData }),
          updateDoc(doc(db, 'userChats', chatUser.uid), { [combinedId]: userChatData })
        ])        
        // Reset chatUser to null after successful chat creation
        // setChatUser(null)
      }
    } catch (error) {
      // Set error only if the chat creation fails
      setError(true)
    }    
    // Reset the username field
    setUsername('')
    setChatUser(null)
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
