import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, X, ChevronDown } from 'lucide-react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../lib/firebase.js'
import { BRANCHES, SEMESTERS, YEARS, COURSES } from '../data/index.js'
import PaperCard from '../components/ui/PaperCard.jsx'
import Breadcrumb from '../components/layout/Breadcrumb.jsx'
import SEOHead from '../components/ui/SEOHead.jsx'

const pyqSchema = {
  '@context':'https://schema.org','@type':'CollectionPage',
  name:'RGPV Previous Year Question Papers',
  description:'Download 5000+ RGPV Previous Year Question Papers',
  url:'https://rgpvhub.in/papers',
}

export default function Papers() {
  const [searchParams] = useSearchParams()
  const [search,   setSearch]   = useState(searchParams.get('q') || '')
  const [branch,   setBranch]   = useState('')
  const [semester, setSemester] = useState('')
  const [year,     setYear]     = useState('')
  const [course,   setCourse]   = useState('')

  // ── Live papers from Firestore ─────────────────────────
  const [papers,  setPapers]  = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPapers() {
      setLoading(true)
      try {
        const q = query(collection(db, 'papers'), orderBy('createdAt', 'desc'))
        const snap = await getDocs(q)
        setPapers(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      } catch (err) {
        console.error('Failed to load papers:', err)
      } finally {
        setLoading(false)
      }
    }
    loadPapers()
  }, [])

  const filtered = useMemo(() => papers.filter(p => {
    const q = search.toLowerCase()
    const title = (p.title || '').toLowerCase()
    const subject = (p.subject || '').toLowerCase() // may be empty for now, see note below
    return (
      (!q || title.includes(q) || subject.includes(q)) &&
      (!branch   || p.branch === branch) &&
      (!semester || p.semester === Number(semester)) &&
      (!year     || p.year === year) &&
      (!course   || p.course === course)
    )
  }), [papers, search, branch, semester, year, course])

  const clear = () => { setSearch(''); setBranch(''); setSemester(''); setYear(''); setCourse('') }
  const hasFilters = search||branch||semester||year||course

  return (
    <>
      <SEOHead title="RGPV Previous Year Question Papers - Download Free PDF"
        description="Download 5000+ RGPV Previous Year Question Papers for all branches, semesters and years."
        keywords="RGPV previous year papers, RGPV question papers, RGPV PYQ"
        url="/papers" schema={pyqSchema} />

      <div className="min-h-screen pb-24 lg:pb-8">
        {/* Page header */}
        <div style={{ backgroundColor:'#282A35' }} className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Breadcrumb />
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div>
                <span className="w3-badge-green mb-3 inline-block">{papers.length}+ Papers</span>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">
                  Previous Year <span style={{ color:'#04AA6D' }}>Question Papers</span>
                </h1>
                <p className="text-white/60 text-sm">RGPV B.Tech, M.Tech, MBA, MCA & Diploma papers — all years & branches</p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-1" style={{ backgroundColor:'#04AA6D' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Search bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color:'#aaa' }} />
              <input type="text" value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="Search papers by title, subject, or branch..."
                className="w3-input pl-10 py-3" />
              {search && <button onClick={()=>setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaa] hover:text-[#333]"><X size={14}/></button>}
            </div>
            {hasFilters && <button onClick={clear} className="px-4 py-3 rounded text-sm font-medium" style={{ border:'1px solid #d5d5d5', color:'#f44336', backgroundColor:'#fff' }}><X size={13} className="inline-block mr-1"/>Clear</button>}
          </div>

          {/* Filter panel */}
          <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }}
            className="p-4 rounded mb-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3"
            style={{ border:'1px solid #d5d5d5', backgroundColor:'#f9f9f9' }}>
            {[
              { label:'All Courses',   val:course,   set:setCourse,   opts:COURSES.map(c=>({value:c.id,label:c.name})) },
              { label:'All Branches',  val:branch,   set:setBranch,   opts:BRANCHES.map(b=>({value:b.id,label:b.short})) },
              { label:'All Semesters', val:semester, set:setSemester, opts:SEMESTERS.map(s=>({value:String(s),label:`Semester ${s}`})) },
              { label:'All Years',     val:year,     set:setYear,     opts:YEARS.map(y=>({value:y,label:y})) },
            ].map(({label,val,set,opts})=>(
              <div key={label} className="relative">
                <label className="text-[11px] font-semibold mb-1.5 block" style={{ color:'#555' }}>{label}</label>
                <select value={val} onChange={e=>set(e.target.value)} className="w3-input pr-7 appearance-none text-sm cursor-pointer">
                  <option value="">{label}</option>
                  {opts.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-2.5 top-[36px] -translate-y-1/2 pointer-events-none" style={{ color:'#aaa' }} />
              </div>
            ))}
          </motion.div>

          {loading ? (
            <p className="text-sm py-10 text-center" style={{ color:'#777' }}>Loading papers…</p>
          ) : (
            <>
              <p className="text-sm mb-5" style={{ color:'#777' }}>
                Showing <strong style={{ color:'#282A35' }}>{filtered.length}</strong> papers
              </p>

              {filtered.length===0 ? (
                <div className="text-center py-20">
                  <div className="text-5xl mb-4">😕</div>
                  <h3 className="font-bold text-[#282A35] text-lg mb-2">No papers found</h3>
                  <p className="text-[#777] text-sm mb-4">Try adjusting your filters</p>
                  <button onClick={clear} className="btn-outline">Clear Filters</button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {filtered.map((p,i) => <PaperCard key={p.id} paper={p} index={i} />)}
                </div>
              )}
            </>
          )}

          {/* SEO block */}
          <div className="mt-14 p-6 rounded" style={{ border:'1px solid #d5d5d5', backgroundColor:'#f9f9f9' }}>
            <h2 className="font-bold text-[#282A35] text-lg mb-3">RGPV Previous Year Question Papers — Download Free</h2>
            <p className="text-sm text-[#555] leading-relaxed mb-3">
              RGPV Hub provides the most comprehensive collection of <strong>RGPV Previous Year Question Papers</strong> for all undergraduate and postgraduate courses including B.Tech (CSE, IT, ME, CE, EE, EC, AI, AIML, AIDS), M.Tech, MBA, MCA, and Diploma programmes.
            </p>
            <p className="text-sm text-[#555] leading-relaxed">
              All question papers are available in <strong>PDF format</strong> and can be downloaded for free. Papers are available for all semesters (1st to 8th) and years (2015–2024).
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
