import { db } from './firebase.js'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { uploadToCloudinary } from './cloudinaryService.js'

/**
 * Uploads a file to Cloudinary and saves metadata to Firestore.
 * @param {File} file
 * @param {{ type: 'paper'|'note', title: string, course: string, branch: string, semester: string, year: string, subject: string }} meta
 * @param {(pct: number) => void} onProgress  called with 0-100
 */
export const uploadContent = async (file, meta, onProgress = () => {}) => {
  const { type, title, course, branch, semester, year, subject } = meta
  const ext      = file.name.split('.').pop()
  const safeName = title.trim().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '')
  const fileName = `${Date.now()}_${safeName}.${ext}`
  const folder   = type === 'paper' ? 'papers' : 'notes'

  const downloadURL = await uploadToCloudinary(file, folder, onProgress)

  const col = type === 'paper' ? 'papers' : 'notes'
  await addDoc(collection(db, col), {
    title:     title.trim(),
    course:    (course || '').trim(),
    branch:    branch.trim().toLowerCase(),
    semester:  parseInt(semester) || 1,
    year:      year.trim(),
    subject:   (subject || '').trim(),
    fileUrl:   downloadURL,
    fileName,
    downloads: 0,
    createdAt: serverTimestamp(),
  })

  return downloadURL
}