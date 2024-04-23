// Imports 
import { createContext, useContext, useReducer } from "react"
import { UserAuth } from './AuthContext'

export const ChatContext = createContext()

export const ChatContextProvider = ({ children }) => {
    // Context
    const { user } = UserAuth()

    const INITIAL_STATE = {
        chatId: 'null',
        user: {}
    }

    // Create chatReducer 
    const chatReducer = (state, action) => {
        switch(action.type) {
            case 'CHANGE_USER':
                return {
                    user: action.payload,
                    chatId: user.uid > action.payload.uid
                    ? user.uid + action.payload.uid
                    : action.payload.uid + user.uid
                }    
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

    return(
        <ChatContext.Provider value={{ data:state, dispatch }}>
            {children}
        </ChatContext.Provider>
    )
}

export const ChatUser = () => {
    return useContext(ChatContext)
}