// Import libraries 
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'

// Import components
import { Input } from '../ui/input/Input'
import { Button } from '../ui/button/Button' 
import { TextLink } from '../ui/link/TextLink'
import { GoogleButton } from 'react-google-button'
import Logo from '../../assets/logo/logo.svg'


export const Signin = () => {
  // States 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Context 
  const { signIn, googleSignIn, user } = UserAuth()

  // Create navigate 
  const navigate = useNavigate()

  // Handlesubmit function
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await signIn(email, password)
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
    <div className='signin__wrapper'>
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      <div className='signin__content'>
        <h1 className='signin__content-title'>Sign in to your account</h1>
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
            style={{width: '100%'}}
            text='Sign in'
          />
      </form>
        <p>Don`t have an account yet? 
        <TextLink 
          to='/signup'
          text='Sign up'
        />
      </p>
      <div className="signin__content-hint">
        <div className="hint__line"></div>
        <p className='hint__text'>Or</p>
        <div className="hint__line"></div>
      </div>
      <GoogleButton
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          height: '57px', 
          backgroundColor: 'white', 
          color: '#121212',
          fontWeight: 'bold',
          border: '1px solid #ACACAC', 
          borderRadius: '10px',
          boxShadow: 'none',                    
        }}
        onClick={HandleGoogleSignIn}
        label='Sign in with Google'
      />
      </div>
    </div>
  )
}
