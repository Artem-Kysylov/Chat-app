// Import libraries 
import React from 'react'
import { CgSearch } from "react-icons/cg";


export const Search = () => {
  return (
    <div className='search__wrapper'>
        <CgSearch 
          style={{ color: '#ACACAC'}}
        />
        <input type="text" placeholder='Find a user...' />
    </div>
  )
}
