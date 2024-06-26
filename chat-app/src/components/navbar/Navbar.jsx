// Import libraries
import React from 'react'
import { UserAuth } from '../../context/AuthContext'

// Import components 
import Logo from '../../assets/logo/logo.svg'

export const Navbar = () => {
  const { currentUser } = UserAuth()
  
  return (
    <div className='navbar__wrapper'>
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      <div className="navbar__user">
        <img className='navbar__img' src={currentUser?.photoURL} alt="/" />      
        <div className='navbar__greeting'>
          <span className='navbar__greeting-title'>Welcome</span>
          <p className='navbar__greeting-name'>{currentUser?.displayName}!</p>           
        </div>
      </div>
    </div>
  )
}
