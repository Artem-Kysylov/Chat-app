// Import libraries 
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'

// Import components
import { Input } from '../ui/input/Input'
import { Button } from '../ui/button/Button' 
import { TextLink } from '../ui/link/TextLink'


export const Signin = () => {
  // States 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Context 
  const { signIn } = UserAuth()

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

  return (
    <div>
      <div></div>
      <div>
        <h1>Sign in to your account</h1>
        <form onSubmit={handleSubmit}>
          <Input
            label='Email address'
            type='email'
            placeholder='mail@mail.com'
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label='Password'
            type='password'
            placeholder='Enter your password here...'
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            text='Sign in'
          />
      </form>
        <p>Don`t have an account yet? 
        <TextLink 
          to='/signup'
          text='Sign up'
        />
      </p>
      </div>
    </div>
  )
}
