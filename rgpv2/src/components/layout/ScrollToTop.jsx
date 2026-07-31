import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function ScrollToTopOnNav() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity:0, scale:0.6 }} animate={{ opacity:1, scale:1 }}
          exit={{ opacity:0, scale:0.6 }} whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }}
          onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
          className="fixed bottom-24 right-4 lg:bottom-8 z-40 w-10 h-10 rounded flex items-center justify-center text-white shadow-w3"
          style={{ backgroundColor:'#04AA6D' }}
          aria-label="Scroll to top">
          <ChevronUp size={20} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
