import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Download, Eye, Search, ChevronDown, X } from 'lucide-react'
import { PAPERS, BRANCHES, SEMESTERS } from '../data/index.js'
import Breadcrumb from '../components/layout/Breadcrumb.jsx'
import SEOHead from '../components/ui/SEOHead.jsx'
import toast from 'react-hot-toast'

const SOLVED_PAPERS = PAPERS.map(p => ({
  ...p,
  solved: Math.random() > 0.3,
  solutionPages: Math.floor(Math.random() * 20) + 10,
}))

export default function Solutions() {
  const [search,   setSearch]   = useState('')
  const [branch,   setBranch]   = useState('')
  const [semester, setSemester] = useState('')

  const filtered = useMemo(() => SOLVED_PAPERS.filter(p => {
    const q = search.toLowerCase()
    return (
      (!q || p.title.toLowerCase().includes(q) || p.subject.toLowerCase().includes(q)) &&
      (!branch   || p.branch === branch || p.branch === 'all') &&
      (!semester || p.semester === Number(semester)) &&
      p.solved
    )
  }), [search, branch, semester])

  return (
    <>
      <SEOHead title="RGPV PYQ Solutions - Step by Step Solved Question Papers"
        description="Download RGPV Previous Year Question Paper solutions with step-by-step explanations. Solved papers for all branches and semesters."
        keywords="RGPV PYQ solutions, solved question papers, RGPV answer key, step by step solutions"
        url="/solutions" />

      <div className="min-h-screen pb-24 lg:pb-8">
        <div style={{ backgroundColor:'#282A35' }} className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Breadcrumb />
            <span className="inline-block mb-3 px-3 py-1 rounded text-xs font-semibold text-white" style={{ backgroundColor:'#4caf50' }}>Fully Solved</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">
              PYQ <span style={{ color:'#4caf50' }}>Solutions</span>
            </h1>
            <p className="text-sm" style={{ color:'rgba(255,255,255,0.6)' }}>Step-by-step solved RGPV previous year question papers</p>
          </div>
        </div>
        <div className="h-1" style={{ backgroundColor:'#4caf50' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color:'#aaa' }}/>
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search solved papers..." className="w3-input pl-10 text-sm"/>
              {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color:'#aaa' }}><X size={14}/></button>}
            </div>
            <div className="relative">
              <select value={branch} onChange={e => setBranch(e.target.value)} className="w3-input pr-8 appearance-none text-sm">
                <option value="">All Branches</option>
                {BRANCHES.map(b => <option key={b.id} value={b.id}>{b.short}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color:'#aaa' }}/>
            </div>
            <div className="relative">
              <select value={semester} onChange={e => setSemester(e.target.value)} className="w3-input pr-8 appearance-none text-sm">
                <option value="">All Semesters</option>
                {SEMESTERS.map(s => <option key={s} value={s}>Sem {s}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color:'#aaa' }}/>
            </div>
          </div>

          <p className="text-sm mb-5" style={{ color:'#777' }}>
            <strong style={{ color:'#282A35' }}>{filtered.length}</strong> solved papers found
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {filtered.map((paper, i) => (
              <motion.div key={paper.id} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.06 }}
                className="bg-white rounded overflow-hidden" style={{ border:'1px solid #d5d5d5', borderLeft:'4px solid #4caf50', boxShadow:'0 1px 3px rgba(0,0,0,.08)' }}
                onMouseOver={e => e.currentTarget.style.boxShadow='0 4px 12px rgba(0,0,0,.12)'}
                onMouseOut={e => e.currentTarget.style.boxShadow='0 1px 3px rgba(0,0,0,.08)'}>
                <div className="p-5 flex items-start gap-4">
                  <div className="p-3 rounded flex-shrink-0" style={{ backgroundColor:'#e8f5e9', border:'1px solid #a5d6a7' }}>
                    <CheckCircle size={20} style={{ color:'#4caf50' }}/>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1" style={{ color:'#282A35' }}>
                      {paper.title} — Solution
                    </h3>
                    <div className="flex flex-wrap gap-x-3 text-xs mb-3" style={{ color:'#aaa' }}>
                      <span className="font-semibold" style={{ color:'#4caf50' }}>{paper.branch==='all'?'All Branches':paper.branch?.toUpperCase()}</span>
                      <span>Sem {paper.semester}</span>
                      <span>{paper.year}</span>
                      <span>{paper.solutionPages} pages</span>
                    </div>
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold mb-3" style={{ backgroundColor:'#e8f5e9', color:'#4caf50' }}>
                      ✓ Fully Solved · Step-by-step
                    </span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => toast.success('Opening solution preview...')}
                        className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium transition-all"
                        style={{ border:'1px solid #d5d5d5', color:'#555' }}
                        onMouseOver={e => { e.currentTarget.style.borderColor='#282A35'; e.currentTarget.style.color='#282A35' }}
                        onMouseOut={e => { e.currentTarget.style.borderColor='#d5d5d5'; e.currentTarget.style.color='#555' }}>
                        <Eye size={12}/> Preview
                      </button>
                      <button onClick={() => toast.success('Downloading solved paper PDF...')}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold text-white transition-all"
                        style={{ backgroundColor:'#4caf50' }}
                        onMouseOver={e => e.currentTarget.style.backgroundColor='#388e3c'}
                        onMouseOut={e => e.currentTarget.style.backgroundColor='#4caf50'}>
                        <Download size={12}/> Download Solution
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
