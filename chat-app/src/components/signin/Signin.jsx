// Import libraries 
import React from 'react'

// Import components
import { Input } from '../ui/input/Input'
import { Button } from '../ui/button/Button' 
import { TextLink } from '../ui/link/TextLink'


export const Signin = () => {
  return (
    <div>
      <div></div>
      <div>
        <h1>Sign in to your account</h1>
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
