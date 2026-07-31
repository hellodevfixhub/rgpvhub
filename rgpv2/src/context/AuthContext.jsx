import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

const readStoredValue = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function AuthProvider({ children }) {
  const [favorites, setFavorites] = useState(() => readStoredValue('rgpv-favorites', []))
  const [downloads, setDownloads] = useState(() => readStoredValue('rgpv-downloads', []))
  const [preferences, setPreferences] = useState(() => readStoredValue('rgpv-prefs', { branch: '', semester: '' }))

  const logout = () => {}

  const toggleFavorite = (item) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.id === item.id && f.type === item.type)
      const next = exists
        ? prev.filter(f => !(f.id === item.id && f.type === item.type))
        : [...prev, { ...item, savedAt: new Date().toISOString() }]
      localStorage.setItem('rgpv-favorites', JSON.stringify(next))
      return next
    })
  }

  const isFavorite = (id, type) => favorites.some(f => f.id === id && f.type === type)

  const addDownload = (item) => {
    setDownloads(prev => {
      const next = [
        { ...item, downloadedAt: new Date().toISOString() },
        ...prev.filter(d => !(d.id === item.id && d.type === item.type)),
      ].slice(0, 50)
      localStorage.setItem('rgpv-downloads', JSON.stringify(next))
      return next
    })
  }

  const updatePreferences = (prefs) => {
    setPreferences(prev => {
      const next = { ...prev, ...prefs }
      localStorage.setItem('rgpv-prefs', JSON.stringify(next))
      return next
    })
  }

  return (
    <AuthContext.Provider value={{
      user: null,
      logout,
      favorites,
      toggleFavorite,
      isFavorite,
      downloads,
      addDownload,
      preferences,
      updatePreferences,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
