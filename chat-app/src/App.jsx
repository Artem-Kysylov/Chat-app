import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Import components 
import { Signin } from './components/signin/Signin'
import { Signup } from './components/signup/Signup'
import { Home } from './routes/home/Home'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </>
  )
}

export default App
