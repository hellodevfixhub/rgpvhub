// ─────────────────────────────────────────────────────────
//  Fill in your Cloudinary details below
//  Cloud name  → Cloudinary dashboard (top-left)
//  Upload preset → Settings → Upload → Upload Presets (Unsigned)
// ─────────────────────────────────────────────────────────
const CLOUD_NAME    = 'nnkklone'
const UPLOAD_PRESET = 'rgpvhub_uploads'

/**
 * Uploads a file to Cloudinary using an unsigned upload preset.
 * Works for PDFs, DOCs, PPTs (raw resource type).
 * @param {File} file
 * @param {string} folder  e.g. 'papers' | 'notes'
 * @param {(pct: number) => void} onProgress
 * @returns {Promise<string>}  secure download URL
 */
export const uploadToCloudinary = (file, folder, onProgress = () => {}) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData()
    formData.append('file',           file)
    formData.append('upload_preset',  UPLOAD_PRESET)
    formData.append('folder',         `rgpv-hub/${folder}`)

    const xhr = new XMLHttpRequest()
    xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`)

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100))
    })

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.responseText)
        resolve(res.secure_url)
      } else {
        try {
          const err = JSON.parse(xhr.responseText)
          reject(new Error(err?.error?.message || 'Upload failed'))
        } catch {
          reject(new Error('Upload failed — check your Cloud name and preset'))
        }
      }
    })

    xhr.addEventListener('error', () => reject(new Error('Network error during upload')))
    xhr.send(formData)
  })
}