import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, X, ChevronDown } from 'lucide-react'
import { NOTES, BRANCHES, SEMESTERS } from '../data/index.js'
import NoteCard from '../components/ui/NoteCard.jsx'
import Breadcrumb from '../components/layout/Breadcrumb.jsx'
import SEOHead from '../components/ui/SEOHead.jsx'

export default function Notes() {
  const [search, setSearch] = useState('')
  const [branch, setBranch] = useState('')
  const [semester, setSemester] = useState('')

  const filtered = useMemo(() => NOTES.filter(n => {
    const q = search.toLowerCase()
    return (
      (!q || n.title.toLowerCase().includes(q) || n.subject.toLowerCase().includes(q)) &&
      (!branch || n.branch === branch || n.branch === 'all') &&
      (!semester || n.semester === Number(semester))
    )
  }), [search, branch, semester])

  const clear = () => { setSearch(''); setBranch(''); setSemester('') }

  return (
    <>
      <SEOHead title="RGPV Study Notes - Download Free PDF Notes for All Branches"
        description="Download comprehensive RGPV study notes for all branches and semesters. Handwritten and typed notes in PDF format."
        keywords="RGPV notes, engineering notes PDF, RGPV study material, B.Tech notes"
        url="/notes" />

      <div className="min-h-screen pb-24 lg:pb-8">
        <div style={{ backgroundColor:'#282A35' }} className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Breadcrumb />
            <span className="inline-block mb-3 px-3 py-1 rounded text-xs font-semibold text-white" style={{ backgroundColor:'#2196F3' }}>1,200+ Notes</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">
              Study <span style={{ color:'#2196F3' }}>Notes</span>
            </h1>
            <p className="text-sm" style={{ color:'rgba(255,255,255,0.6)' }}>Comprehensive notes for all RGPV branches and semesters</p>
          </div>
        </div>
        <div className="h-1" style={{ backgroundColor:'#2196F3' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Search + filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color:'#aaa' }} />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search notes by subject or title..." className="w3-input pl-10 py-3" />
              {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color:'#aaa' }}><X size={14} /></button>}
            </div>
            <div className="relative">
              <select value={branch} onChange={e => setBranch(e.target.value)} className="w3-input pr-8 appearance-none text-sm">
                <option value="">All Branches</option>
                {BRANCHES.map(b => <option key={b.id} value={b.id}>{b.short} — {b.name}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color:'#aaa' }} />
            </div>
            <div className="relative">
              <select value={semester} onChange={e => setSemester(e.target.value)} className="w3-input pr-8 appearance-none text-sm">
                <option value="">All Semesters</option>
                {SEMESTERS.map(s => <option key={s} value={s}>Semester {s}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color:'#aaa' }} />
            </div>
          </div>

          {/* Branch pills */}
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-6">
            <button onClick={() => setBranch('')} className="px-3 py-1 rounded text-xs font-semibold whitespace-nowrap flex-shrink-0"
              style={!branch ? { backgroundColor:'#2196F3', color:'#fff' } : { backgroundColor:'#f1f1f1', color:'#555', border:'1px solid #d5d5d5' }}>All</button>
            {BRANCHES.map(b => (
              <button key={b.id} onClick={() => setBranch(b.id)}
                className="flex items-center gap-1 px-3 py-1 rounded text-xs font-semibold whitespace-nowrap flex-shrink-0"
                style={branch === b.id ? { backgroundColor:'#2196F3', color:'#fff' } : { backgroundColor:'#f1f1f1', color:'#555', border:'1px solid #d5d5d5' }}>
                {b.icon} {b.short}
              </button>
            ))}
          </div>

          <p className="text-sm mb-5" style={{ color:'#777' }}>
            Showing <strong style={{ color:'#282A35' }}>{filtered.length}</strong> notes
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="font-bold text-lg mb-2" style={{ color:'#282A35' }}>No notes found</h3>
              <p className="text-sm mb-4" style={{ color:'#777' }}>Try a different branch or subject</p>
              <button onClick={clear} className="px-5 py-2 rounded font-semibold text-sm" style={{ border:'2px solid #2196F3', color:'#2196F3', backgroundColor:'transparent' }}>Clear Filters</button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((note, i) => <NoteCard key={note.id} note={note} index={i} />)}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
