import { motion } from 'framer-motion'
import { Calendar, Download, Clock, AlertCircle, ExternalLink } from 'lucide-react'
import Breadcrumb from '../components/layout/Breadcrumb.jsx'
import SEOHead from '../components/ui/SEOHead.jsx'
import { downloadFile } from '../lib/downloadHelper.js'
import toast from 'react-hot-toast'

const EXAM_SCHEDULE = [
  { course:'B.Tech', semester:'Even Semester (4th, 6th, 8th)',      month:'May – June',          status:'Upcoming', fileUrl:'/time table/B.Tech — Even Semester (4th, 6th, 8th).pdf' },
  { course:'B.Tech', semester:'Odd Semester (1st, 3rd, 5th, 7th)',  month:'Nov – Dec',           status:'Upcoming', fileUrl:'/time table/B.Tech — Even Semester (4th, 6th, 8th).pdf' },
  { course:'M.Tech', semester:'Even Semester',                       month:'May – June',          status:'Upcoming', fileUrl:'/time table/B.Tech — Even Semester (4th, 6th, 8th).pdf' },
  { course:'MBA',    semester:'All Semesters',                       month:'May – June / Nov – Dec', status:'Upcoming', fileUrl:'/time table/B.Tech — Even Semester (4th, 6th, 8th).pdf' },
  { course:'MCA',    semester:'All Semesters',                       month:'May – June / Nov – Dec', status:'Upcoming', fileUrl:'/time table/B.Tech — Even Semester (4th, 6th, 8th).pdf' },
]

export default function TimeTable() {
  return (
    <>
      <SEOHead title="RGPV Exam Time Table 2024 - Download Exam Schedule PDF"
        description="Download RGPV exam time table for B.Tech, M.Tech, MBA, MCA, Diploma. Get the complete exam schedule and date sheet."
        keywords="RGPV time table, RGPV exam schedule, RGPV date sheet, B.Tech exam timetable"
        url="/timetable" />

      <div className="min-h-screen pb-24 lg:pb-8">
        <div style={{ backgroundColor:'#282A35' }} className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Breadcrumb />
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">
              Exam <span style={{ color:'#04AA6D' }}>Time Table</span>
            </h1>
            <p className="text-sm" style={{ color:'rgba(255,255,255,0.6)' }}>RGPV examination schedule for all courses</p>
          </div>
        </div>
        <div className="h-1" style={{ backgroundColor:'#04AA6D' }} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          {/* Notice */}
          <div className="flex gap-3 p-4 rounded mb-8" style={{ backgroundColor:'#e3f2fd', border:'1px solid #90caf9' }}>
            <AlertCircle size={20} style={{ color:'#1976d2' }} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm mb-1" style={{ color:'#1565c0' }}>Important</p>
              <p className="text-xs leading-relaxed" style={{ color:'#1976d2' }}>
                Time tables are released by RGPV usually 3–4 weeks before exams. Check the official RGPV website for the latest time table.
                Follow us on Instagram <a href="https://instagram.com/k.z.987" className="underline">@k.z.987</a> for instant notifications.
              </p>
            </div>
          </div>

          {/* Exam calendar */}
          <div className="w3-card p-6 mb-6">
            <h2 className="font-bold text-lg mb-5 flex items-center gap-2" style={{ color:'#282A35' }}>
              <Calendar size={20} style={{ color:'#04AA6D' }} /> Exam Calendar 2024–25
            </h2>
            <div className="space-y-3">
              {EXAM_SCHEDULE.map((exam, i) => (
                <motion.div key={i} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.08 }}
                  className="flex items-center justify-between p-4 rounded transition-all"
                  style={{ border:'1px solid #e0e0e0' }}
                  onMouseOver={e => { e.currentTarget.style.borderColor='#04AA6D'; e.currentTarget.style.backgroundColor='#f0faf5' }}
                  onMouseOut={e => { e.currentTarget.style.borderColor='#e0e0e0'; e.currentTarget.style.backgroundColor='transparent' }}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded flex items-center justify-center text-sm font-bold text-white"
                      style={{ backgroundColor:'#04AA6D' }}>
                      {exam.course.slice(0,2)}
                    </div>
                    <div>
                      <div className="font-medium text-sm" style={{ color:'#282A35' }}>{exam.course} — {exam.semester}</div>
                      <div className="text-xs flex items-center gap-1 mt-0.5" style={{ color:'#aaa' }}>
                        <Clock size={10}/> {exam.month}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded text-xs font-semibold text-white" style={{ backgroundColor:'#04AA6D' }}>{exam.status}</span>
                    <button onClick={() => downloadFile(
                      exam.fileUrl,
                      `${exam.course.replace(/\s+/g, '_')}_Time_Table.pdf`,
                      'Downloading time table PDF...',
                      'Time table PDF will be uploaded when available. Follow Instagram for updates!'
                    )}
                      className="p-2 rounded transition-all" style={{ color:'#aaa' }}
                      onMouseOver={e => e.currentTarget.style.color='#04AA6D'}
                      onMouseOut={e => e.currentTarget.style.color='#aaa'}>
                      <Download size={15}/>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Download cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {title:'B.Tech Time Table', desc:'All semesters exam schedule', icon:'🎓'},
              {title:'M.Tech Time Table', desc:'Postgraduate exam schedule',  icon:'🔬'},
              {title:'MBA Time Table',    desc:'Management program schedule', icon:'💼'},
              {title:'Diploma Time Table',desc:'Polytechnic exam schedule',   icon:'📜'},
            ].map((item,i) => (
              <div key={i} className="w3-card p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="font-medium text-sm" style={{ color:'#282A35' }}>{item.title}</div>
                    <div className="text-xs" style={{ color:'#aaa' }}>{item.desc}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toast.success('Opening RGPV official site...')}
                    className="p-2 rounded transition-all" style={{ color:'#aaa' }}
                    onMouseOver={e => e.currentTarget.style.color='#2196F3'}
                    onMouseOut={e => e.currentTarget.style.color='#aaa'}>
                    <ExternalLink size={15}/>
                  </button>
                  <button onClick={() => downloadFile(
                    item.fileUrl,
                    `${item.title.replace(/\s+/g, '_')}.pdf`,
                    'Downloading time table PDF...',
                    'Time table will be uploaded once released!'
                  )}
                    className="p-2 rounded transition-all" style={{ color:'#aaa' }}
                    onMouseOver={e => e.currentTarget.style.color='#04AA6D'}
                    onMouseOut={e => e.currentTarget.style.color='#aaa'}>
                    <Download size={15}/>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Notification CTA */}
          <div className="p-6 mt-6 text-center rounded" style={{ backgroundColor:'#282A35' }}>
            <div className="text-3xl mb-3">🔔</div>
            <h3 className="font-bold text-lg mb-2 text-white">Get Instant Notifications</h3>
            <p className="text-sm mb-5" style={{ color:'rgba(255,255,255,0.6)' }}>
              Get notified the moment RGPV releases new time tables, results, and important announcements.
            </p>
            <a href="https://instagram.com/k.z.987" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex">
              Follow on Instagram
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
