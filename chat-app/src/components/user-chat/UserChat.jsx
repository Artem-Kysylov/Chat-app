// Import libraries 
import React from 'react'

export const UserChat = (props) => {
  return (
    <div className="user__chat" onClick={props.onClick}>
        <img className='user__chat-img' src={props.photoUrl} alt="/" />
        <div className="user__chat-info">
            <span className='user__chat-name'>{props.displayName}</span>
            <p className="user__chat-message">{props.lastMessage?.text}</p> 
        </div>
    </div>
  )
}
