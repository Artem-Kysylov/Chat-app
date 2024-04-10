// Import libraries 
import React from 'react'


// Import components 
import { Sidebar } from '../../components/sidebar/Sidebar'
import { Chat } from '../../components/chat/Chat'

export const Home = () => {
  return (
    <div className='home__wrapper'>
      <Sidebar/>
      <Chat/>
    </div>
  )
}
