import React from 'react'
import './style/style.scss'
import { Routes, Route } from 'react-router-dom'

// Import context 
import { AuthContextProvider } from './context/AuthContext'
import { ChatContextProvider } from './context/ChatContext'

// Import components 
import { Signin } from './components/signin/Signin'
import { Signup } from './components/signup/Signup'
import { Home } from './routes/home/Home'
import { ProtectedRoute } from './components/protected-route/ProtectedRoute'

function App() {

  return (
    <>
    <AuthContextProvider>
      <ChatContextProvider>
        <Routes>
            <Route path='/' element={<Signin/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/home' 
              element={
                <ProtectedRoute>
                  <Home/>
                </ProtectedRoute>          
              }
            />
        </Routes>
      </ChatContextProvider>
    </AuthContextProvider>
    </>
  )
}

export default App
