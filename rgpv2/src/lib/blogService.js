import { db } from './firebase.js'
import {
  collection, addDoc, getDocs, updateDoc, deleteDoc,
  doc, query, orderBy, where, serverTimestamp,
} from 'firebase/firestore'

const COL = 'blog_posts'

export const getPosts = async () => {
  const q = query(collection(db, COL), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export const getPostBySlug = async (slug) => {
  const q = query(collection(db, COL), where('slug', '==', slug))
  const snap = await getDocs(q)
  if (snap.empty) return null
  const d = snap.docs[0]
  return { id: d.id, ...d.data() }
}

export const createPost = async (data) => {
  return await addDoc(collection(db, COL), {
    ...data,
    views: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export const updatePost = async (id, data) => {
  return await updateDoc(doc(db, COL, id), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export const deletePost = async (id) => {
  return await deleteDoc(doc(db, COL, id))
}
