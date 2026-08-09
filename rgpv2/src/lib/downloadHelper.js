import toast from 'react-hot-toast'

export function downloadFile(url, filename = '', successMessage = 'Download started!', errorMessage = 'Download file is not available yet.') {
  if (!url) {
    toast.error(errorMessage)
    return
  }

  const anchor = document.createElement('a')
  anchor.href = encodeURI(url)
  anchor.target = '_blank'
  if (filename) anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  toast.success(successMessage)
}
