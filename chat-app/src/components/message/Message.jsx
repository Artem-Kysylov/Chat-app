// Import libraries 
import React from 'react'

export const Message = () => {
  return (
    <div className='message__wrapper owner'>
      <div className="message__items">
        <div className="message__info ">
          <img className='message__info-img' src="https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg" alt="/" />
          <div className="message__info-content">
            <p className="message__info-content-text">Hello</p>
            {/* <img className='message__info-content-img' src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="/" /> */}
          </div>
        </div>
        <span className='message__date'>Just now</span>
      </div>
    </div>
  )
}
