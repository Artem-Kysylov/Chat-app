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
      <p>Welcome {user?.displayName}</p>
      <TextLink
          onClick={handleLogout}
          text='Logout'
      />
    </div>
  )
}
