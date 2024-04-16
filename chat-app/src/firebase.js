// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCTyu_P2qHYc7Wjado0wJsm-xavDOrqQMU",
//   authDomain: "chat-app-38eba.firebaseapp.com",
//   projectId: "chat-app-38eba",
//   storageBucket: "chat-app-38eba.appspot.com",
//   messagingSenderId: "820068735267",
//   appId: "1:820068735267:web:f07dcf7583da0b75d11496"
// };

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCEGQCRkV4GFLOATK3G5m0MJqN5iP1h2s",
  authDomain: "my-chat-app-97d52.firebaseapp.com",
  projectId: "my-chat-app-97d52",
  storageBucket: "my-chat-app-97d52.appspot.com",
  messagingSenderId: "419359934708",
  appId: "1:419359934708:web:6288dbce679beebd83b6a1"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const storage = getStorage()
export const db = getFirestore()