// Import libraries 
import React, { useState } from 'react'
import { GoPaperclip } from "react-icons/go"
import { db } from '../../../firebase'
import { Timestamp, doc, serverTimestamp, updateDoc } from "firebase/firestore"
import { v4 as uuid } from 'uuid'
import { uploadBytesResumable } from 'firebase/storage'

// Import context 
import { UserAuth } from '../../../context/AuthContext'
import { ChatUser } from '../../../context/ChatContext'

// Import components 
import { ChatButton } from '../../ui/chat-button/ChatButton'
import { arrayUnion } from 'firebase/firestore'


export const ChatInput = () => {
  // States
  const [text, setText] = useState('')
  const [img, setImg] = useState(null) 
    // Context 
  const { user } = UserAuth()
  const { data } = ChatUser()

  // Handlesend function 
  const handleSend = async () => {
    if(img) {
      const storageRef = ref(storage, uuid())
      const uploadTask = uploadBytesResumable(storageRef, img)
      uploadTask.on(
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: user.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            })
          })
        }
      )
    } else {
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: user.uid,
          date: Timestamp.now(),
        })
      })
    }

    await updateDoc(doc(db, 'userChats', user.uid), {
      [data.chatId + '.lastMessage']: {
        text
      },
      [data.chatId + '.date']: serverTimestamp()
    })

    await updateDoc(doc(db, 'userChats', data.chatUser.uid), {
      [data.chatId + '.lastMessage']: {
        text
      },
      [data.chatId + '.date']: serverTimestamp()
    })

    setText('')
    setImg(null)
  }

  return (
    <div className='chatInput__wrapper'>
      <div className="chatInput__items">
        <div className="chatInput__items-send">        
          <input 
            type="file" 
            style={{ display: 'none'}} 
            id='file'
            onChange={(e) => setImg(e => e.target.files[0])}           
          />
          <label htmlFor="file">
            <GoPaperclip 
              style={{ 
                color: '#ACACAC',
                height: '24px',
                width: '24px',
                cursor: 'pointer'
              }}
            />
          </label>          
        </div>
        <input 
          type="text" 
          placeholder='Type your message...'
          onChange={(e) => setText(e.target.value)}
          value={text} 
        />
      </div>
      <ChatButton
        onClick={handleSend}
      />
    </div>
  )
}
