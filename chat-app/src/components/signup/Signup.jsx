// Import libraries 
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import { FaImagePortrait } from "react-icons/fa6"

// Import components 
import { Input } from '../ui/input/Input'
import { InputPassword } from '../ui/input-password/InputPassword'
import { Button } from '../ui/button/Button'
import { TextLink } from '../ui/link/TextLink'
import { GoogleButton } from 'react-google-button'
import Logo from '../../assets/logo/logo.svg'

export const Signup = () => {
  // States 
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [file, setFile] = useState(null)

  // Context 
  const { createUser, googleSignIn, currentUser } = UserAuth()

  // Create navigate 
  const navigate = useNavigate()

  // Select file function 
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  }

  // Handlesubmit function 
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await createUser(email, password, displayName, file)
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
    if(currentUser !== null) {
      navigate('/home')
    }
  }, [currentUser])

  return (
    <div className='signup__wrapper'>
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      <div className='signup__content'>
        <h1 className='signup__content-title'>Sign up for free</h1>
        <form onSubmit={handleSubmit}>
          <Input
            style={{width: '100%'}}
            label='Your name'
            type='text'
            value={displayName}
            placeholder='John Smith'
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <Input
            style={{width: '100%'}}
            label='Email address'
            type='email'
            value={email}
            placeholder='mail@mail.com'
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputPassword
            style={{width: '100%'}}
            value={password}
            placeholder='Enter your password here...'
            onChange={(e) => setPassword(e.target.value)}
          />
          <input 
            type="file" 
            style={{ display: 'none'}} 
            id='file' 
            onChange={handleFileChange}
          />
          <label className='signup__attach-img' htmlFor="file">
            <FaImagePortrait 
              style={{
                height: '34px',
                width: '34px',
                color: '#3559E0',
              }}
            />
            <span className='signup__attach-img-hint'>Attach your photo </span>  
          </label>                               
          <Button
            style={{width: '100%'}}
            text='Sign up'
          />
        </form>
        <p>Already have an account? 
          <TextLink 
            to='/'
            text='Sign in'
          />
        </p>
        <div className="signup__content-hint">
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
          label='Sign up with Google'
        />
      </div>
  </div>
  )
}
