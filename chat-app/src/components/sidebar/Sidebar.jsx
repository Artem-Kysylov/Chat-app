// Import libraries
import React from 'react'

// Import components 
import { Navbar } from '../navbar/Navbar'
import { Search } from '../search/Search'
import { Chats } from '../chats/Chats'
import { Bottom } from '../bottom/Bottom'

export const Sidebar = () => {
  return (
    <div className='sidebar__wrapper'>
      <Navbar/>
      <Search/>
      <Chats/>
      <Bottom/>
    </div>
  )
}
