// All imports are here 
import { createContext, useContext, useState, useEffect } from 'react'
import { 
    createUserWithEmailAndPassword,
    updateProfile, 
    signInWithEmailAndPassword, 
    signOut,
    GoogleAuthProvider,
    signInWithPopup, 
    onAuthStateChanged 
} from 'firebase/auth'
import {  
    ref, 
    uploadBytesResumable, 
    getDownloadURL 
  } from "firebase/storage"
import { auth, storage, db } from '../firebase'
import { doc, setDoc } from "firebase/firestore"


const UserContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({})
    const [error, setError] = useState(false)

    const createUser = async (email, password, displayName, file) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const fileName = `${Date.now()}_${file.name}`
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on( 
                (error) => {
                    setError(true)
                    console.log(error)
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
                        await updateProfile(userCredential.user, { 
                            displayName, 
                            photoURL: downloadURL, 
                        })
                        await setDoc(doc(db, 'users', userCredential.user.uid), {
                            uid: userCredential.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        })
                        await setDoc(doc(db, 'userChats', userCredential.user.uid), {})
                    })
                }
            )
        } catch (error) {
            console.log('Error', error)
            setError(true)
        }
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider()
        try {
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            if(user) {
                await setDoc(doc(db, 'users', user.uid), {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL
                })
            }
            
        } catch(error) {
            setError(true)
            console.error('Google Sign-In Error:', error)
        }
        
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            console.log(user)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <UserContext.Provider value = {{ createUser, logout, signIn, googleSignIn, currentUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}