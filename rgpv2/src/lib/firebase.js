// import { initializeApp, getApps, getApp } from 'firebase/app'
// import { getFirestore } from 'firebase/firestore'
// import { getStorage } from 'firebase/storage'

// const firebaseConfig = {
//   apiKey:            "AIzaSyAWuWpLzMHkpgbU9-wLtVsIgxN5uLywzC4",
//   authDomain:        "rgpv-hub-caee5.firebaseapp.com",
//   projectId:         "rgpv-hub-caee5",
//   storageBucket:     "rgpv-hub-caee5.firebasestorage.app",
//   messagingSenderId: "234753444720",
//   appId:             "1:234753444720:web:519fb9f122c2644ec85db5",
//   measurementId:     "G-WN2K5TKWWE",
// }

// // Prevent duplicate-app error during HMR
// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

// export const db       = getFirestore(app)
// export const storage  = getStorage(app)
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey:            "AIzaSyAWuWpLzMHkpgbU9-wLtVsIgxN5uLywzC4",
  authDomain:        "rgpv-hub-caee5.firebaseapp.com",
  projectId:         "rgpv-hub-caee5",
  storageBucket:     "rgpv-hub-caee5.firebasestorage.app",
  messagingSenderId: "234753444720",
  appId:             "1:234753444720:web:519fb9f122c2644ec85db5",
  measurementId:     "G-WN2K5TKWWE",
}

// Prevent duplicate-app error during HMR
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

export const db             = getFirestore(app)
export const storage        = getStorage(app)
export const auth           = getAuth(app)
export const googleProvider = new GoogleAuthProvider()