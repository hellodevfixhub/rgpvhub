import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, Search, Globe, ChevronDown,
  FileText, BookOpen, ClipboardList, Award, Calendar,
  Target, CheckCircle, Rss, Wrench, Sun, Moon
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext.jsx'
import { useLang } from '../../context/LanguageContext.jsx'
import { PAPERS, NOTES } from '../../data/index.js'
import clsx from 'clsx'

const NAV = [
  { key: 'papers',      href: '/papers',      icon: FileText },
  { key: 'notes',       href: '/notes',        icon: BookOpen },
  { key: 'syllabus',    href: '/syllabus',     icon: ClipboardList },
  { key: 'results',     href: '/results',      icon: Award },
  { key: 'timetable',   href: '/timetable',    icon: Calendar },
  { key: 'guess',       href:'/guess-papers', icon: Target },
  { key: 'solutions',   href: '/solutions',    icon: CheckCircle },
  { key: 'blog',        href: '/blog',         icon: Rss },
  { key: 'tools',       href: '/tools',        icon: Wrench },
]

export default function Header() {
  const { isDark, toggle } = useTheme()
  const { t, changeLang, currentLang, languages } = useLang()
  const location  = useLocation()
  const navigate  = useNavigate()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQ,    setSearchQ]    = useState('')
  const [results,    setResults]    = useState([])
  const [langOpen,   setLangOpen]   = useState(false)
  const [scrolled,   setScrolled]   = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMobileOpen(false); setSearchOpen(false) }, [location])

  useEffect(() => {
    if (searchQ.length < 2) { setResults([]); return }
    const q = searchQ.toLowerCase()
    const p = PAPERS.filter(x => x.title.toLowerCase().includes(q) || x.subject.toLowerCase().includes(q)).slice(0,3).map(x=>({...x,kind:'paper',href:`/papers?q=${q}`}))
    const n = NOTES.filter(x  => x.title.toLowerCase().includes(q) || x.subject.toLowerCase().includes(q)).slice(0,2).map(x=>({...x,kind:'note', href:`/notes?q=${q}`}))
    setResults([...p,...n])
  }, [searchQ])

  const submitSearch = (e) => {
    e.preventDefault()
    if (searchQ.trim()) { navigate(`/papers?q=${encodeURIComponent(searchQ.trim())}`); setSearchOpen(false); setSearchQ('') }
  }

  const active = (href) => href === '/' ? location.pathname === '/' : location.pathname.startsWith(href)

  return (
    <>
      {/* ── Top green stripe ─────────────────────────── */}
      <div className="top-bar hidden md:flex items-center justify-between px-4 h-8 text-xs">
        <span>🎓 India's #1 RGPV Academic Resource Platform</span>
        <div className="flex items-center gap-4">
          <a href="https://instagram.com/k.z.987" target="_blank" rel="noopener noreferrer" className="hover:underline text-white/90">Instagram: @k.z.987</a>
          <span>|</span>
          <a href="/contact" className="hover:underline text-white/90">Contact Us</a>
        </div>
      </div>

      {/* ── Main nav ─────────────────────────────────── */}
      <header className={clsx(
        'sticky top-0 z-50 transition-shadow duration-200',
        scrolled ? 'shadow-md' : ''
      )} style={{ backgroundColor: '#282A35' }}>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-14 gap-3">

            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0">
              <img src="/logo.png" alt="RGPV Hub" className="h-10 w-auto object-contain" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5 flex-1 ml-4">
              {NAV.map(item => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={clsx(
                    'px-2.5 py-1.5 text-[13px] font-medium rounded transition-all duration-150 whitespace-nowrap',
                    active(item.href)
                      ? 'text-white'
                      : 'text-white/75 hover:text-white hover:bg-white/10'
                  )}
                  style={active(item.href) ? { backgroundColor: '#04AA6D' } : {}}
                >
                  {t(item.key)}
                </Link>
              ))}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-1 ml-auto">

              {/* Search icon */}
              <button
                onClick={() => { setSearchOpen(true); setTimeout(() => inputRef.current?.focus(), 80) }}
                className="p-2 rounded text-white/70 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Search"
              >
                <Search size={17} />
              </button>

              {/* Language */}
              <div className="relative hidden sm:block">
                <button onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1 px-2 py-1.5 rounded text-white/70 hover:text-white hover:bg-white/10 text-xs transition-all">
                  <Globe size={14} />
                  <span>{currentLang.native.slice(0,3)}</span>
                  <ChevronDown size={11} />
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity:0, y:-6, scale:0.95 }}
                      animate={{ opacity:1, y:0,  scale:1 }}
                      exit={{   opacity:0, y:-6, scale:0.95 }}
                      transition={{ duration:0.15 }}
                      className="absolute right-0 top-full mt-1 w-44 bg-white border border-[#d5d5d5] rounded shadow-w3 z-50 py-1"
                      onMouseLeave={() => setLangOpen(false)}
                    >
                      {languages.map(l => (
                        <button key={l.code} onClick={() => { changeLang(l.code); setLangOpen(false) }}
                          className={clsx('w-full flex items-center justify-between px-3 py-1.5 text-sm transition-colors',
                            currentLang.code===l.code ? 'text-white' : 'text-[#333] hover:bg-[#f1f1f1]'
                          )}
                          style={currentLang.code===l.code ? { backgroundColor:'#04AA6D' } : {}}>
                          <span>{l.name}</span>
                          <span className="text-xs opacity-60">{l.native}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme toggle */}
              <button onClick={toggle}
                className="p-2 rounded text-white/70 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Toggle theme">
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {/* Mobile burger */}
              <button onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded text-white/70 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Menu">
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Menu ──────────────────────────── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity:0, height:0 }}
              animate={{ opacity:1, height:'auto' }}
              exit={{   opacity:0, height:0 }}
              style={{ backgroundColor:'#282A35', borderTop:'1px solid rgba(255,255,255,0.1)' }}
            >
              <div className="px-4 py-3 space-y-0.5">
                <Link to="/"
                  className={clsx('flex items-center px-3 py-2.5 rounded text-sm font-medium',
                    location.pathname==='/' ? 'text-white' : 'text-white/75 hover:text-white hover:bg-white/10')}
                  style={location.pathname==='/' ? {backgroundColor:'#04AA6D'} : {}}>
                  Home
                </Link>
                {NAV.map(item=>(
                  <Link key={item.href} to={item.href}
                    className={clsx('flex items-center gap-2.5 px-3 py-2.5 rounded text-sm font-medium',
                      active(item.href) ? 'text-white' : 'text-white/75 hover:text-white hover:bg-white/10')}
                    style={active(item.href) ? {backgroundColor:'#04AA6D'} : {}}>
                    <item.icon size={15} /> {t(item.key)}
                  </Link>
                ))}

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Green underline accent */}
        <div className="h-0.5 w-full" style={{ backgroundColor:'#04AA6D' }} />
      </header>

      {/* ── Search overlay ───────────────────────────── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{   opacity:0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4"
            onClick={e => e.target===e.currentTarget && setSearchOpen(false)}
          >
            <div className="absolute inset-0 bg-black/40" onClick={() => setSearchOpen(false)} />
            <motion.div
              initial={{ opacity:0, y:-16, scale:0.97 }}
              animate={{ opacity:1, y:0,   scale:1 }}
              exit={{   opacity:0, y:-16, scale:0.97 }}
              className="relative w-full max-w-xl bg-white border border-[#d5d5d5] rounded shadow-w3-hover overflow-hidden"
            >
              <form onSubmit={submitSearch} className="flex items-center border-b border-[#e1e1e1]">
                <Search size={18} className="ml-4 text-[#aaa] flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQ}
                  onChange={e => setSearchQ(e.target.value)}
                  placeholder={t('search')}
                  className="flex-1 px-3 py-4 text-base outline-none text-[#333] placeholder-[#aaa]"
                />
                {searchQ && (
                  <button type="button" onClick={() => setSearchQ('')} className="p-2 text-[#aaa] hover:text-[#333]">
                    <X size={16} />
                  </button>
                )}
                <button type="submit"
                  className="mx-2 px-4 py-2 rounded text-sm font-semibold text-white"
                  style={{ backgroundColor:'#04AA6D' }}>
                  Search
                </button>
              </form>

              {results.length > 0 ? (
                <div className="py-1">
                  {results.map(r => (
                    <Link key={`${r.kind}-${r.id}`} to={r.href} onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-[#f1f1f1] transition-colors group">
                      <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
                           style={{ backgroundColor: r.kind==='paper' ? '#e8f5f0' : '#eef2ff' }}>
                        {r.kind==='paper'
                          ? <FileText size={15} style={{ color:'#04AA6D' }} />
                          : <BookOpen  size={15} style={{ color:'#3F51B5' }} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-[#282A35] truncate group-hover:text-[#04AA6D]">{r.title}</div>
                        <div className="text-xs text-[#777]">{r.kind==='paper' ? 'Question Paper':'Notes'} · Sem {r.semester}</div>
                      </div>
                      <span className="w3-badge-green text-xs">{r.kind}</span>
                    </Link>
                  ))}
                </div>
              ) : searchQ.length > 1 ? (
                <div className="py-8 text-center text-[#777] text-sm">
                  No results for "<span className="font-medium text-[#333]">{searchQ}</span>"
                </div>
              ) : (
                <div className="px-4 py-3">
                  <p className="text-xs text-[#aaa] uppercase tracking-wider mb-2">Quick links</p>
                  <div className="grid grid-cols-2 gap-1">
                    {[['DSA Papers','/papers?subject=dsa'],['Maths Notes','/notes?subject=maths'],['CSE Syllabus','/syllabus?branch=cse'],['CGPA Calc','/tools']].map(([l,h])=>(
                      <Link key={h} to={h} onClick={()=>setSearchOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded text-sm text-[#555] hover:bg-[#f1f1f1] hover:text-[#04AA6D] transition-colors">
                        <Search size={12} /> {l}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
