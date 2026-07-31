import { Link, useLocation } from 'react-router-dom'
import { Home, FileText, BookOpen, Wrench, LayoutGrid } from 'lucide-react'

const ITEMS = [
  { icon: Home,       label: 'Home',      href: '/' },
  { icon: FileText,   label: 'Papers',    href: '/papers' },
  { icon: BookOpen,   label: 'Notes',     href: '/notes' },
  { icon: Wrench,     label: 'Tools',     href: '/tools' },
  { icon: LayoutGrid, label: 'Dashboard', href: '/dashboard' },
]

export default function MobileNav() {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
         style={{ backgroundColor:'#282A35', borderTop:'2px solid #04AA6D' }}>
      <div className="flex items-stretch">
        {ITEMS.map(item => {
          const isActive = item.href==='/' ? location.pathname==='/' : location.pathname.startsWith(item.href)
          return (
            <Link key={item.href} to={item.href}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3 transition-all"
              style={{ backgroundColor: isActive ? '#04AA6D' : 'transparent' }}>
              <item.icon size={20} color={isActive ? '#ffffff' : 'rgba(255,255,255,0.55)'}
                         strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[9px] font-semibold uppercase tracking-wider"
                    style={{ color: isActive ? '#ffffff' : 'rgba(255,255,255,0.55)' }}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
