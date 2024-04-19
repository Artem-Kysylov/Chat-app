import { createContext, useEffect, useState } from "react"
import { auth } from '../firebase'
import { onAuthStateChanged } from "firebase/auth"

export const ChatContext = createContext()

export const ChatContextProvider = ({ children }) => {


    return(
        <ChatContext.Provider value={{ currentUser }}>
            {children}
        </ChatContext.Provider>
    )
}