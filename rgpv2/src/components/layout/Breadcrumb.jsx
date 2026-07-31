import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

const LABELS = {
  papers:'Previous Year Papers', notes:'Study Notes', syllabus:'Syllabus',
  results:'Results', timetable:'Time Table', 'guess-papers':'Guess Papers',
  solutions:'PYQ Solutions', blog:'Blog', tools:'Tools', about:'About Us',
  contact:'Contact', dashboard:'Dashboard',
  privacy:'Privacy Policy', terms:'Terms & Conditions', disclaimer:'Disclaimer',
  admin:'Admin Panel',
}

export default function Breadcrumb({ extra = [] }) {
  const { pathname } = useLocation()
  const parts = pathname.split('/').filter(Boolean)
  if (parts.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1 text-sm mb-5"
         style={{ color:'#777' }}>
      <Link to="/" className="flex items-center gap-1 hover:text-[#04AA6D] transition-colors">
        <Home size={13} /> Home
      </Link>
      {parts.map((part, i) => {
        const href  = '/' + parts.slice(0,i+1).join('/')
        const label = LABELS[part] || decodeURIComponent(part).replace(/-/g,' ')
        const isLast = i===parts.length-1 && extra.length===0
        return (
          <span key={href} className="flex items-center gap-1">
            <ChevronRight size={13} style={{ color:'#ccc' }} />
            {isLast
              ? <span className="font-semibold capitalize" style={{ color:'#282A35' }}>{label}</span>
              : <Link to={href} className="capitalize hover:text-[#04AA6D] transition-colors">{label}</Link>}
          </span>
        )
      })}
      {extra.map((item,i)=>(
        <span key={i} className="flex items-center gap-1">
          <ChevronRight size={13} style={{ color:'#ccc' }} />
          {item.href
            ? <Link to={item.href} className="hover:text-[#04AA6D] transition-colors">{item.label}</Link>
            : <span className="font-semibold" style={{ color:'#282A35' }}>{item.label}</span>}
        </span>
      ))}
    </nav>
  )
}
