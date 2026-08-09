import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Target, Download, Star, Flame, AlertTriangle, ChevronDown } from 'lucide-react'
import { BRANCHES, SEMESTERS } from '../data/index.js'
import Breadcrumb from '../components/layout/Breadcrumb.jsx'
import SEOHead from '../components/ui/SEOHead.jsx'
import { downloadFile } from '../lib/downloadHelper.js'
import toast from 'react-hot-toast'

const GUESS_PAPERS = [
  { id:1, subject:'Data Structures & Algorithms',    branch:'cse',  semester:3, difficulty:'High',   importance:5, topics:['Arrays & Strings','Trees & Graphs','Dynamic Programming','Sorting Algorithms','Recursion'], year:'2024', fileUrl:'/guess papers/Data Structures & Algorithms.pdf' },
  { id:2, subject:'Engineering Mathematics I',        branch:'all',  semester:1, difficulty:'Medium', importance:5, topics:['Differential Calculus','Integral Calculus','Matrices','Differential Equations','Fourier Series'], year:'2024' },
  { id:3, subject:'Database Management Systems',      branch:'cse',  semester:4, difficulty:'Medium', importance:4, topics:['SQL Queries','Normalization','ER Diagrams','Transaction Management','Indexing'], year:'2024' },
  { id:4, subject:'Computer Networks',                branch:'cse',  semester:6, difficulty:'High',   importance:4, topics:['OSI Model','TCP/IP','Routing Algorithms','Network Security','HTTP/DNS'], year:'2024' },
  { id:5, subject:'Operating Systems',                branch:'cse',  semester:5, difficulty:'High',   importance:5, topics:['Process Scheduling','Deadlock','Memory Management','File Systems','Synchronization'], year:'2024' },
  { id:6, subject:'Machine Learning',                 branch:'aiml', semester:6, difficulty:'High',   importance:5, topics:['Regression','Classification','Neural Networks','SVM','Clustering'], year:'2024' },
]

const DIFF_STYLE = {
  Low:    { color:'#4caf50', bg:'#e8f5e9' },
  Medium: { color:'#FF9800', bg:'#fff8e1' },
  High:   { color:'#f44336', bg:'#ffebee' },
}

export default function GuessPapers() {
  const [branch, setBranch] = useState('')
  const [semester, setSemester] = useState('')

  const filtered = useMemo(() => GUESS_PAPERS.filter(p =>
    (!branch || p.branch === branch || p.branch === 'all') &&
    (!semester || p.semester === Number(semester))
  ), [branch, semester])

  return (
    <>
      <SEOHead title="RGPV Guess Papers 2024 - Important Questions & Topics"
        description="RGPV Guess Papers with most important topics and questions for all branches. Prepared by experts based on previous year trends."
        keywords="RGPV guess papers, important questions RGPV, RGPV expected questions, exam prediction"
        url="/guess-papers" />

      <div className="min-h-screen pb-24 lg:pb-8">
        <div style={{ backgroundColor:'#282A35' }} className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Breadcrumb />
            <span className="inline-block mb-3 px-3 py-1 rounded text-xs font-semibold text-white" style={{ backgroundColor:'#f44336' }}>Expert Prepared</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">
              Guess <span style={{ color:'#FF9800' }}>Papers</span>
            </h1>
            <p className="text-sm" style={{ color:'rgba(255,255,255,0.6)' }}>Important topics and expected questions for RGPV exams</p>
          </div>
        </div>
        <div className="h-1" style={{ backgroundColor:'#FF9800' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
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
                {SEMESTERS.map(s => <option key={s} value={s}>Semester {s}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color:'#aaa' }}/>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex gap-3 p-4 rounded mb-8" style={{ backgroundColor:'#fff8e1', border:'1px solid #ffe082' }}>
            <AlertTriangle size={20} style={{ color:'#f57c00' }} className="flex-shrink-0 mt-0.5"/>
            <p className="text-xs leading-relaxed" style={{ color:'#bf360c' }}>
              Guess papers are based on analysis of previous year papers and current trends. They are NOT official RGPV papers. Always study the complete syllabus.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {filtered.map((paper, i) => {
              const ds = DIFF_STYLE[paper.difficulty]
              return (
                <motion.div key={paper.id} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.08 }}
                  className="bg-white rounded overflow-hidden" style={{ border:'1px solid #d5d5d5', borderLeft:'4px solid #FF9800', boxShadow:'0 1px 3px rgba(0,0,0,.08)' }}
                  onMouseOver={e => e.currentTarget.style.boxShadow='0 4px 12px rgba(0,0,0,.12)'}
                  onMouseOut={e => e.currentTarget.style.boxShadow='0 1px 3px rgba(0,0,0,.08)'}>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded" style={{ backgroundColor:'#fff0e0', border:'1px solid #ffe0b2' }}>
                          <Target size={20} style={{ color:'#FF9800' }}/>
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm leading-snug" style={{ color:'#282A35' }}>{paper.subject}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-semibold" style={{ color:'#FF9800' }}>{paper.branch === 'all' ? 'All Branches' : paper.branch.toUpperCase()}</span>
                            <span style={{ color:'#ddd' }}>·</span>
                            <span className="text-xs" style={{ color:'#aaa' }}>Sem {paper.semester}</span>
                          </div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-0.5"
                        style={{ backgroundColor:ds.bg, color:ds.color }}>
                        {paper.difficulty === 'High' && <Flame size={10}/>}
                        {paper.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      <span className="text-xs mr-1" style={{ color:'#aaa' }}>Importance:</span>
                      {[...Array(5)].map((_,j) => (
                        <Star key={j} size={12} style={{ color: j<paper.importance ? '#FF9800' : '#ddd', fill: j<paper.importance ? '#FF9800' : 'none' }}/>
                      ))}
                    </div>

                    <div className="mb-4">
                      <p className="text-xs mb-2" style={{ color:'#aaa' }}>Important Topics:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {paper.topics.map(topic => (
                          <span key={topic} className="px-2 py-0.5 rounded text-[10px] font-medium"
                            style={{ backgroundColor:'#fff8e1', border:'1px solid #ffe082', color:'#f57c00' }}>{topic}</span>
                        ))}
                      </div>
                    </div>

                    <button onClick={() => downloadFile(
                      paper.fileUrl,
                      `${paper.subject.replace(/\s+/g, '_')}_Guess_Paper.pdf`,
                      'Downloading guess paper PDF...',
                      'Guess paper file is not available yet.'
                    )}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded font-semibold text-sm transition-all text-white"
                      style={{ backgroundColor:'#FF9800' }}
                      onMouseOver={e => e.currentTarget.style.backgroundColor='#e65100'}
                      onMouseOut={e => e.currentTarget.style.backgroundColor='#FF9800'}>
                      <Download size={14}/> Download Guess Paper
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
