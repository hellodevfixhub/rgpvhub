import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initGoogleAnalytics, trackPageView } from '../../lib/analytics.js'

export default function Analytics() {
  const location = useLocation()
  const measurementId = import.meta.env.VITE_GA_ID

  useEffect(() => {
    initGoogleAnalytics(measurementId)
  }, [measurementId])

  useEffect(() => {
    if (!measurementId) return
    trackPageView(location.pathname + location.search, measurementId)
  }, [location, measurementId])

  return null
}
