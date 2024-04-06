// Import libraries 
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'

// Import components 
import { Input } from '../ui/input/Input'
import { Button } from '../ui/button/Button'
import { TextLink } from '../ui/link/TextLink'
import { GoogleButton } from 'react-google-button'

export const Signup = () => {
  // States 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Context 
  const { createUser, googleSignIn, user } = UserAuth()

  // Create navigate 
  const navigate = useNavigate()

  // Handlesubmit function 
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await createUser(email, password)
      navigate('/home')      
    } catch (error) {
      setError(error.message)
      console.log(error.message)
    }
  }

  // HandleGoogle signin fuction
  const HandleGoogleSignIn = async () => {
    try {
      if(googleSignIn) {
        await googleSignIn()
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    if(user !== null) {
      navigate('/home')
    }
  }, [user])

  return (
    <div className='signup__wrapper'>
    <div className='signup__content'>
      <h1 className=''>Sign up for free</h1>
      <form onSubmit={handleSubmit}>
        <Input
          style={{width: '100%'}}
          label='Email address'
          type='email'
          placeholder='mail@mail.com'
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          style={{width: '100%'}}
          label='Password'
          type='password'
          placeholder='Enter your password here...'
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          text='Sign up'
        />
      </form>
      <p>Already have an account? 
        <TextLink 
          to='/'
          text='Sign in'
        />
      </p>
      <GoogleButton
        onClick={HandleGoogleSignIn}
        label='Sign up with Google'
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          height: '57px', 
          backgroundColor: '#FFF', 
          color: '#121212',
          fontWeight: 'bold',
          border: '1px solid #ACACAC', 
          borderRadius: '10px',
          boxShadow: 'none',                    
        }}
      />
    </div>
  </div>
  )
}
