// Import libraries
import React from 'react'

// Import components 
import { Search } from '../ui/search/Search'
import { Chats } from '../chats/Chats'

export const Sidebar = () => {
  return (
    <div>
      <Search/>
      <Chats/>
    </div>
  )
}
