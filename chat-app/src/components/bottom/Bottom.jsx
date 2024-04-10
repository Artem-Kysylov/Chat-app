// Import libraries 
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'

// Import components
import { TextLink } from '../ui/link/TextLink' 

export const Bottom = () => {
    const { logout } = UserAuth()
    const navigate = useNavigate()

    // Logout function 
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
    <div className='bottom__wrapper'>
        <TextLink
            style={{ textTransform: 'uppercase'}}
            onClick={handleLogout}
            text='Logout'
        />
    </div>
  )
}
