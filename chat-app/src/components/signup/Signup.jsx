// Import libraries 
import React from 'react'
import { Link } from 'react-router-dom'

// Import components 
import { Input } from '../ui/input/Input'
import { Button } from '../ui/button/Button'
import { TextLink } from '../ui/link/TextLink'

export const Signup = () => {
  return (
    <div>
    <div></div>
    <div>
      <h1>Sign up for free</h1>
      <form>
        <Input
          label='Email address'
          type='email'
          placeholder='mail@mail.com'
        />
        <Input
          label='Password'
          type='password'
          placeholder='Enter your password here...'
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
    </div>
  </div>
  )
}
