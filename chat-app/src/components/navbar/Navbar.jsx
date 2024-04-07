// Import libraries
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'

// Import components 
import { TextLink } from '../ui/link/TextLink'

export const Navbar = () => {
  const { logout, user } = UserAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
      console.log('You are logged out')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div className="logo">Logo</div>
      <div className="navbar__user">
        <img className='navbar__img' src="https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg" alt="/" />      
        <p>Welcome {user?.displayName}</p>
        <TextLink
            onClick={handleLogout}
            text='Logout'
        />
      </div>
    </div>
  )
}
