// Import libraries 
import React, { useRef, useEffect } from 'react'

// Import context 
import { UserAuth } from '../../context/AuthContext'
import { ChatUser } from '../../context/ChatContext'

export const Message = ({ message }) => {
  // Context 
  const { currentUser } = UserAuth()
  const { data } = ChatUser()

  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({behavior: 'smooth'})
  }, [message])

  return (
    <div ref={ref}
      className={`message__wrapper ${message.senderId === currentUser.uid && 'owner'}`}>
      <div className="message__info ">
          <img 
            className='message__info-img' 
            src={message.senderId === currentUser.uid 
              ? currentUser.photoURL 
              : data.user.photoURL
            } 
            alt="/" 
          />
          <span className='message__date'>Just now</span>
      </div>
      <div className="message__info-content">
          <p className="message__info-content-text">{message.text && message.text}</p>
          {message.img && 
            <img 
              className='message__info-content-img' 
              src={message.img}    
              alt="/" 
            />
          }
      </div>
    </div>
  )
}
