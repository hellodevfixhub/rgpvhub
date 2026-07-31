import { storage, db } from './firebase.js'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

/**
 * Uploads a file to Firebase Storage and saves metadata to Firestore.
 * @param {File} file
 * @param {{ type: 'paper'|'note', title: string, branch: string, semester: string, year: string }} meta
 * @param {(pct: number) => void} onProgress  called with 0-100
 */
export const uploadContent = (file, meta, onProgress = () => {}) => {
  return new Promise((resolve, reject) => {
    const { type, title, branch, semester, year } = meta
    const ext      = file.name.split('.').pop()
    const safeName = title.trim().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '')
    const fileName = `${Date.now()}_${safeName}.${ext}`
    const path     = `${type}s/${fileName}`

    const storageRef  = ref(storage, path)
    const uploadTask  = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snap) => onProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
      reject,
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          const col = type === 'paper' ? 'papers' : 'notes'
          await addDoc(collection(db, col), {
            title:     title.trim(),
            branch:    branch.trim().toLowerCase(),
            semester:  parseInt(semester) || 1,
            year:      year.trim(),
            fileUrl:   downloadURL,
            fileName,
            downloads: 0,
            createdAt: serverTimestamp(),
          })
          resolve(downloadURL)
        } catch (err) {
          reject(err)
        }
      }
    )
  })
}
