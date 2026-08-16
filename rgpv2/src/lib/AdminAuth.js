import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from './firebase.js'

/**
 * Subscribes to Firebase auth state and checks whether the signed-in
 * user's UID exists as a document in the top-level `admins` collection.
 *
 * To make someone an admin: in the Firebase console, go to Firestore,
 * create a collection called `admins`, and add a document whose ID is
 * exactly that user's UID (find it under Authentication > Users).
 * The document's fields don't matter — existence is what grants access.
 * An empty doc `{}` is enough; adding `{ email: '...' }` just helps you
 * remember who's who when browsing the console.
 */
export function useAdminStatus() {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)

      if (!firebaseUser) {
        setIsAdmin(false)
        setLoading(false)
        return
      }

      try {
        const adminDoc = await getDoc(doc(db, 'admins', firebaseUser.uid))
        setIsAdmin(adminDoc.exists())
      } catch (err) {
        console.error('Admin check failed:', err)
        setIsAdmin(false)
      } finally {
        setLoading(false)
      }
    })

    return unsubscribe
  }, [])

  return { user, isAdmin, loading }
}