export function initGoogleAnalytics(measurementId) {
  if (!measurementId || typeof window === 'undefined') return
  if (window.gtag) return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = window.gtag || gtag
  window.gtag('js', new Date())
  window.gtag('config', measurementId, { send_page_view: false })
}

export function trackPageView(url, measurementId) {
  if (!measurementId || typeof window === 'undefined' || !window.gtag) return
  window.gtag('config', measurementId, {
    page_path: url,
  })
}
