// Import libraries 
import React from 'react'


// Import components 
import { Navbar } from '../../components/navbar/Navbar'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { Chat } from '../../components/chat/Chat'

export const Home = () => {
  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <Chat/>
    </div>
  )
}
