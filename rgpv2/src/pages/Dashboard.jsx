import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Heart, Download, Clock, Settings, BookOpen, FileText, ChevronDown, Star } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { BRANCHES, SEMESTERS } from '../data/index.js'
import PaperCard from '../components/ui/PaperCard.jsx'
import NoteCard from '../components/ui/NoteCard.jsx'
import SEOHead from '../components/ui/SEOHead.jsx'
import toast from 'react-hot-toast'

const TABS = [
  { id:'overview',   icon:User,     label:'Overview' },
  { id:'favorites',  icon:Heart,    label:'Saved' },
  { id:'downloads',  icon:Download, label:'Downloads' },
  { id:'settings',   icon:Settings, label:'Settings' },
]

export default function Dashboard() {
  const { favorites, downloads, preferences, updatePreferences } = useAuth()
  const [searchParams] = useSearchParams()
  const [tab, setTab] = useState(searchParams.get('tab') || 'overview')

  const favPapers = favorites.filter(f => f.type === 'paper')
  const favNotes  = favorites.filter(f => f.type === 'note')
  const recentDownloads = downloads.slice(0, 6)

  return (
    <>
      <SEOHead title="My Dashboard - RGPV Hub" url="/dashboard" />

      <div className="min-h-screen pb-24 lg:pb-8">
        {/* Profile header */}
        <div style={{ backgroundColor:'#282A35' }} className="py-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded flex items-center justify-center font-black text-2xl text-white"
                style={{ backgroundColor:'#04AA6D' }}>
                {user.name?.charAt(0) || 'S'}
              </div>
              <div>
                <h1 className="font-bold text-xl text-white">Study Dashboard</h1>
                <p className="text-sm" style={{ color:'rgba(255,255,255,0.55)' }}>Saved papers, notes and download history</p>
                {preferences.branch && (
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-semibold text-white"
                    style={{ backgroundColor:'#04AA6D' }}>
                    {preferences.branch.toUpperCase()} · Sem {preferences.semester}
                  </span>
                )}
              </div>
              <div className="ml-auto hidden sm:flex items-center gap-4">
                <div className="text-center">
                  <div className="font-bold text-lg text-white">{favorites.length}</div>
                  <div className="text-xs" style={{ color:'rgba(255,255,255,0.45)' }}>Saved</div>
                </div>
                <div className="w-px h-8" style={{ backgroundColor:'rgba(255,255,255,0.15)' }} />
                <div className="text-center">
                  <div className="font-bold text-lg text-white">{downloads.length}</div>
                  <div className="text-xs" style={{ color:'rgba(255,255,255,0.45)' }}>Downloads</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-1" style={{ backgroundColor:'#04AA6D' }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          {/* Tabs */}
          <div className="flex gap-1 overflow-x-auto no-scrollbar pb-1 mb-8">
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all"
                style={tab === t.id
                  ? { backgroundColor:'#282A35', color:'#fff' }
                  : { backgroundColor:'#f1f1f1', color:'#555', border:'1px solid #d5d5d5' }}>
                <t.icon size={15} /> {t.label}
              </button>
            ))}
          </div>

          {/* Overview */}
          {tab === 'overview' && (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="space-y-6">
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label:'Saved Items',    value:favorites.length, icon:Heart,    color:'#f44336', bg:'#fce4ec' },
                  { label:'Total Downloads',value:downloads.length, icon:Download, color:'#04AA6D', bg:'#e8f5e9' },
                  { label:'Activity Points',value:favorites.length*5+downloads.length*2, icon:Star, color:'#FF9800', bg:'#fff8e1' },
                ].map(stat => (
                  <div key={stat.label} className="w3-card p-5 flex items-center gap-4">
                    <div className="p-3 rounded" style={{ backgroundColor:stat.bg }}>
                      <stat.icon size={22} style={{ color:stat.color }} />
                    </div>
                    <div>
                      <div className="text-2xl font-black" style={{ color:'#282A35' }}>{stat.value}</div>
                      <div className="text-xs" style={{ color:'#777' }}>{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick links */}
              <div className="w3-card p-6">
                <h3 className="font-semibold mb-4" style={{ color:'#282A35' }}>Quick Access</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label:'Browse Papers', href:'/papers',       icon:FileText, color:'#04AA6D' },
                    { label:'Study Notes',   href:'/notes',        icon:BookOpen, color:'#2196F3' },
                    { label:'Guess Papers',  href:'/guess-papers', icon:Star,     color:'#FF9800' },
                    { label:'Tools',         href:'/tools',        icon:Settings, color:'#9c27b0' },
                  ].map(item => (
                    <Link key={item.href} to={item.href}
                      className="flex flex-col items-center p-4 rounded text-center transition-all"
                      style={{ border:'1px solid #d5d5d5', backgroundColor:'#fff' }}
                      onMouseOver={e => { e.currentTarget.style.borderColor=item.color; e.currentTarget.style.backgroundColor='#f9f9f9' }}
                      onMouseOut={e => { e.currentTarget.style.borderColor='#d5d5d5'; e.currentTarget.style.backgroundColor='#fff' }}>
                      <item.icon size={20} style={{ color:item.color }} className="mb-2" />
                      <span className="text-xs font-medium" style={{ color:'#555' }}>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Recent downloads */}
              {recentDownloads.length > 0 && (
                <div className="w3-card p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2" style={{ color:'#282A35' }}>
                    <Clock size={16} style={{ color:'#04AA6D' }} /> Recent Activity
                  </h3>
                  <div className="space-y-2">
                    {recentDownloads.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded" style={{ backgroundColor:'#f9f9f9', border:'1px solid #f0f0f0' }}>
                        <div className="p-2 rounded" style={{ backgroundColor:'#e8f5f0' }}>
                          <Download size={14} style={{ color:'#04AA6D' }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate" style={{ color:'#282A35' }}>{item.title}</div>
                          <div className="text-xs" style={{ color:'#aaa' }}>{new Date(item.downloadedAt).toLocaleDateString()}</div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-xs font-semibold text-white" style={{ backgroundColor:'#04AA6D' }}>{item.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Favorites */}
          {tab === 'favorites' && (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}>
              {favorites.length === 0 ? (
                <div className="text-center py-20">
                  <Heart size={48} className="mx-auto mb-4" style={{ color:'#ddd' }} />
                  <h3 className="font-semibold mb-2" style={{ color:'#282A35' }}>No saved items yet</h3>
                  <p className="text-sm mb-4" style={{ color:'#777' }}>Save papers and notes by clicking the heart icon</p>
                  <Link to="/papers" className="btn-primary inline-flex">Browse Papers</Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {favPapers.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-4" style={{ color:'#282A35' }}>Saved Papers ({favPapers.length})</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {favPapers.map((p, i) => <PaperCard key={p.id} paper={p} index={i} />)}
                      </div>
                    </div>
                  )}
                  {favNotes.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-4" style={{ color:'#282A35' }}>Saved Notes ({favNotes.length})</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {favNotes.map((n, i) => <NoteCard key={n.id} note={n} index={i} />)}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* Downloads */}
          {tab === 'downloads' && (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}>
              {downloads.length === 0 ? (
                <div className="text-center py-20">
                  <Download size={48} className="mx-auto mb-4" style={{ color:'#ddd' }} />
                  <h3 className="font-semibold mb-2" style={{ color:'#282A35' }}>No downloads yet</h3>
                  <p className="text-sm mb-4" style={{ color:'#777' }}>Start downloading papers and notes</p>
                  <Link to="/papers" className="btn-primary inline-flex">Browse Papers</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {downloads.map((item, i) => (
                    <div key={i} className="w3-card p-4 flex items-center gap-4">
                      <div className="p-3 rounded" style={{ backgroundColor: item.type==='paper' ? '#e8f5f0' : '#e3f2fd' }}>
                        {item.type === 'paper'
                          ? <FileText size={18} style={{ color:'#04AA6D' }} />
                          : <BookOpen size={18} style={{ color:'#2196F3' }} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate" style={{ color:'#282A35' }}>{item.title}</div>
                        <div className="text-xs" style={{ color:'#aaa' }}>{item.type} · Sem {item.semester}</div>
                      </div>
                      <div className="text-xs" style={{ color:'#aaa' }}>{new Date(item.downloadedAt).toLocaleDateString()}</div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Settings */}
          {tab === 'settings' && (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="max-w-lg space-y-5">
              <div className="w3-card p-6">
                <h3 className="font-semibold mb-5" style={{ color:'#282A35' }}>Study Preferences</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs mb-2 block font-medium" style={{ color:'#555' }}>Your Branch</label>
                    <div className="relative">
                      <select value={preferences.branch} onChange={e => updatePreferences({ branch:e.target.value })} className="w3-input pr-8 appearance-none text-sm">
                        <option value="">Select Branch</option>
                        {BRANCHES.map(b => <option key={b.id} value={b.id}>{b.name} ({b.short})</option>)}
                      </select>
                      <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color:'#aaa' }} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs mb-2 block font-medium" style={{ color:'#555' }}>Current Semester</label>
                    <div className="relative">
                      <select value={preferences.semester} onChange={e => updatePreferences({ semester:e.target.value })} className="w3-input pr-8 appearance-none text-sm">
                        <option value="">Select Semester</option>
                        {SEMESTERS.map(s => <option key={s} value={s}>Semester {s}</option>)}
                      </select>
                      <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color:'#aaa' }} />
                    </div>
                  </div>
                  <button onClick={() => toast.success('Preferences saved!')} className="btn-primary w-full justify-center">
                    Save Preferences
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}
