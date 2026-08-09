import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Download } from 'lucide-react'
import { BRANCHES, SEMESTERS, SYLLABUS_DATA } from '../data/index.js'
import Breadcrumb from '../components/layout/Breadcrumb.jsx'
import SEOHead from '../components/ui/SEOHead.jsx'
import { downloadFile } from '../lib/downloadHelper.js'
import toast from 'react-hot-toast'

export default function Syllabus() {
  const [selectedBranch, setSelectedBranch] = useState('CSE')
  const [openSem, setOpenSem] = useState(1)

  const branchData = SYLLABUS_DATA.filter(s => s.branch === selectedBranch)
  const branchNames = [...new Set(SYLLABUS_DATA.map(s => s.branch))]

  return (
    <>
      <SEOHead title="RGPV Syllabus - Branch Wise Semester Syllabus PDF Download"
        description="Download RGPV Syllabus for all branches and semesters. B.Tech CSE, ME, CE, EE, IT and more syllabus available in PDF format."
        keywords="RGPV syllabus, RGPV B.Tech syllabus, CSE syllabus RGPV, engineering syllabus PDF"
        url="/syllabus" />

      <div className="min-h-screen pb-24 lg:pb-8">
        <div style={{ backgroundColor:'#282A35' }} className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Breadcrumb />
            <span className="inline-block mb-3 px-3 py-1 rounded text-xs font-semibold text-white" style={{ backgroundColor:'#FF9800' }}>All Branches</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">
              RGPV <span style={{ color:'#FF9800' }}>Syllabus</span>
            </h1>
            <p className="text-sm" style={{ color:'rgba(255,255,255,0.6)' }}>Branch-wise and semester-wise syllabus for all RGPV courses</p>
          </div>
        </div>
        <div className="h-1" style={{ backgroundColor:'#FF9800' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Branch selector */}
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-8">
            {branchNames.map(b => (
              <button key={b} onClick={() => setSelectedBranch(b)}
                className="px-4 py-2 rounded text-sm font-semibold whitespace-nowrap flex-shrink-0 transition-all"
                style={selectedBranch === b
                  ? { backgroundColor:'#282A35', color:'#fff' }
                  : { backgroundColor:'#f1f1f1', color:'#555', border:'1px solid #d5d5d5' }}>
                {b}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Semester accordion */}
            <div className="lg:col-span-2 space-y-3">
              {SEMESTERS.map(sem => {
                const semData = branchData.find(d => d.semester === sem)
                const isOpen = openSem === sem
                return (
                  <div key={sem} className="bg-white rounded overflow-hidden" style={{ border:'1px solid #d5d5d5' }}>
                    <button onClick={() => setOpenSem(isOpen ? -1 : sem)}
                      className="w-full flex items-center justify-between p-4 text-left transition-all"
                      style={{ backgroundColor: isOpen ? '#f9f9f9' : '#fff' }}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded flex items-center justify-center text-sm font-bold text-white"
                          style={{ backgroundColor: isOpen ? '#FF9800' : '#aaa' }}>{sem}</div>
                        <div>
                          <div className="font-semibold text-sm" style={{ color:'#282A35' }}>Semester {sem}</div>
                          <div className="text-xs" style={{ color:'#999' }}>{semData?.subjects?.length || 0} subjects</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={e => {
                        e.stopPropagation()
                        downloadFile(
                          '/sylabus/Md_Kazim_JavaDev_Resume.pdf',
                          `Sem_${sem}_Syllabus.pdf`,
                          `Downloading Sem ${sem} syllabus...`,
                          'Syllabus PDF is not available yet.'
                        )
                      }}
                          className="p-1.5 rounded transition-all text-sm"
                          style={{ color:'#aaa' }}
                          onMouseOver={e => e.currentTarget.style.color='#FF9800'}
                          onMouseOut={e => e.currentTarget.style.color='#aaa'}>
                          <Download size={15} />
                        </button>
                        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                          <ChevronDown size={18} style={{ color: isOpen ? '#FF9800' : '#aaa' }} />
                        </motion.div>
                      </div>
                    </button>
                    <AnimatePresence>
                      {isOpen && semData && (
                        <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }}>
                          <div className="px-5 pb-5" style={{ borderTop:'1px solid #f0f0f0' }}>
                            <ul className="space-y-2 mt-4">
                              {semData.subjects.map((sub, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm">
                                  <span className="w-5 h-5 rounded flex items-center justify-center text-xs font-mono font-bold text-white flex-shrink-0"
                                    style={{ backgroundColor:'#FF9800' }}>{i + 1}</span>
                                  <span style={{ color:'#555' }}>{sub}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="w3-card p-5">
                <h3 className="font-semibold mb-4" style={{ color:'#282A35' }}>Quick Download</h3>
                <div className="space-y-2">
                  {SEMESTERS.map(sem => (
                    <button key={sem} onClick={() => downloadFile(
                      '/sylabus/Md_Kazim_JavaDev_Resume.pdf',
                      `Sem_${sem}_Syllabus.pdf`,
                      `Downloading Sem ${sem} syllabus...`,
                      'Syllabus PDF is not available yet.'
                    )}
                      className="w-full flex items-center justify-between p-3 rounded transition-all text-sm"
                      style={{ border:'1px solid #e0e0e0', color:'#555', backgroundColor:'#fff' }}
                      onMouseOver={e => { e.currentTarget.style.borderColor='#FF9800'; e.currentTarget.style.color='#FF9800' }}
                      onMouseOut={e => { e.currentTarget.style.borderColor='#e0e0e0'; e.currentTarget.style.color='#555' }}>
                      <span>Semester {sem}</span>
                      <Download size={14} style={{ color:'#aaa' }} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="w3-card p-5">
                <h3 className="font-semibold mb-3" style={{ color:'#282A35' }}>Available Branches</h3>
                <div className="flex flex-wrap gap-2">
                  {BRANCHES.slice(0, 8).map(b => (
                    <button key={b.id} onClick={() => setSelectedBranch(b.short)}
                      className="px-2.5 py-1 rounded text-xs font-semibold"
                      style={{ backgroundColor:'#FF9800', color:'#fff' }}>
                      {b.short}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
