// Import libraries 
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa"

// Custom hook to toggle password visibility 
export const usePasswordToggle = () => {
    const [visible, setVisibility] = useState(false)

    const toggleVisibility = () => {
        setVisibility(prev => !prev)
    }

    const icon = visible ? <FaEyeSlash/> : <FaEye/>

    return [visible ? 'text' : 'password', toggleVisibility, icon]
}


