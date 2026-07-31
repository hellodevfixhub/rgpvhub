import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Trash2, Calculator, RotateCcw } from 'lucide-react'
import Breadcrumb from '../components/layout/Breadcrumb.jsx'
import SEOHead from '../components/ui/SEOHead.jsx'
import { TOOLS } from '../data/index.js'

const TOOL_COLORS = { cgpa:'#04AA6D', sgpa:'#2196F3', attendance:'#FF9800', percentage:'#9c27b0' }

/* ── CGPA Calc ── */
function CGPACalc() {
  const [semesters, setSemesters] = useState([{ sgpa:'', credits:'' }])
  const [result, setResult] = useState(null)
  const calculate = () => {
    const valid = semesters.filter(s => s.sgpa && s.credits && !isNaN(s.sgpa) && !isNaN(s.credits))
    if (!valid.length) return
    const total   = valid.reduce((a,s) => a + Number(s.sgpa)*Number(s.credits), 0)
    const credits = valid.reduce((a,s) => a + Number(s.credits), 0)
    setResult((total/credits).toFixed(2))
  }
  return (
    <div className="space-y-4">
      {semesters.map((sem,i) => (
        <div key={i} className="flex gap-3 items-center">
          <span className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor:'#04AA6D' }}>{i+1}</span>
          <input type="number" step="0.01" min="0" max="10" value={sem.sgpa}
            onChange={e => { const s=[...semesters]; s[i].sgpa=e.target.value; setSemesters(s) }}
            placeholder="SGPA (e.g. 8.5)" className="w3-input flex-1 text-sm" />
          <input type="number" value={sem.credits}
            onChange={e => { const s=[...semesters]; s[i].credits=e.target.value; setSemesters(s) }}
            placeholder="Credits (e.g. 24)" className="w3-input flex-1 text-sm" />
          {semesters.length > 1 && (
            <button onClick={() => setSemesters(semesters.filter((_,j)=>j!==i))} className="p-2 rounded" style={{ color:'#f44336' }}><Trash2 size={15}/></button>
          )}
        </div>
      ))}
      <div className="flex gap-3">
        <button onClick={() => setSemesters([...semesters,{sgpa:'',credits:''}])}
          className="flex items-center gap-1.5 px-4 py-2 rounded text-sm font-medium transition-all"
          style={{ border:'1px solid #d5d5d5', color:'#555' }}
          onMouseOver={e => { e.currentTarget.style.borderColor='#04AA6D'; e.currentTarget.style.color='#04AA6D' }}
          onMouseOut={e => { e.currentTarget.style.borderColor='#d5d5d5'; e.currentTarget.style.color='#555' }}>
          <Plus size={14}/> Add Semester
        </button>
        <button onClick={() => { setSemesters([{sgpa:'',credits:''}]); setResult(null) }}
          className="p-2 rounded transition-all" style={{ border:'1px solid #d5d5d5', color:'#aaa' }}
          onMouseOver={e => e.currentTarget.style.color='#555'}
          onMouseOut={e => e.currentTarget.style.color='#aaa'}>
          <RotateCcw size={14}/>
        </button>
      </div>
      <button onClick={calculate} className="btn-primary w-full justify-center">
        <Calculator size={16}/> Calculate CGPA
      </button>
      {result && (
        <motion.div initial={{ scale:0.8,opacity:0 }} animate={{ scale:1,opacity:1 }}
          className="p-5 rounded text-center" style={{ backgroundColor:'#e8f5f0', border:'2px solid #04AA6D' }}>
          <div className="text-sm mb-1" style={{ color:'#555' }}>Your CGPA</div>
          <div className="text-5xl font-black" style={{ color:'#04AA6D' }}>{result}</div>
          <div className="text-xs mt-2" style={{ color:'#777' }}>
            {result>=9?'🏆 Outstanding!':result>=8?'⭐ Excellent!':result>=7?'✅ Good!':'📚 Keep Working!'}
          </div>
        </motion.div>
      )}
    </div>
  )
}

/* ── SGPA Calc ── */
const GRADES = [
  {grade:'O',points:10},{grade:'A+',points:9},{grade:'A',points:8},
  {grade:'B+',points:7},{grade:'B',points:6},{grade:'C',points:5},
  {grade:'D',points:4},{grade:'F',points:0},
]
function SGPACalc() {
  const [subjects, setSubjects] = useState([{name:'',credits:'',grade:'O'},{name:'',credits:'',grade:'A+'}])
  const [result, setResult] = useState(null)
  const calculate = () => {
    const valid = subjects.filter(s => s.credits && !isNaN(s.credits))
    if (!valid.length) return
    const gradeMap = Object.fromEntries(GRADES.map(g=>[g.grade,g.points]))
    const total   = valid.reduce((a,s)=>a+gradeMap[s.grade]*Number(s.credits),0)
    const credits = valid.reduce((a,s)=>a+Number(s.credits),0)
    setResult((total/credits).toFixed(2))
  }
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-12 gap-2 text-xs px-1" style={{ color:'#aaa' }}>
        <span className="col-span-5">Subject Name</span>
        <span className="col-span-3">Credits</span>
        <span className="col-span-3">Grade</span>
      </div>
      {subjects.map((sub,i) => (
        <div key={i} className="grid grid-cols-12 gap-2 items-center">
          <input className="w3-input text-sm col-span-5" placeholder={`Subject ${i+1}`} value={sub.name}
            onChange={e => { const s=[...subjects]; s[i].name=e.target.value; setSubjects(s) }}/>
          <input type="number" className="w3-input text-sm col-span-3" placeholder="Credits" value={sub.credits}
            onChange={e => { const s=[...subjects]; s[i].credits=e.target.value; setSubjects(s) }}/>
          <select className="w3-input text-sm col-span-3 appearance-none" value={sub.grade}
            onChange={e => { const s=[...subjects]; s[i].grade=e.target.value; setSubjects(s) }}>
            {GRADES.map(g=><option key={g.grade} value={g.grade}>{g.grade} ({g.points})</option>)}
          </select>
          {subjects.length>1 && (
            <button onClick={() => setSubjects(subjects.filter((_,j)=>j!==i))} className="col-span-1 p-1 rounded" style={{ color:'#f44336' }}><Trash2 size={13}/></button>
          )}
        </div>
      ))}
      <button onClick={() => setSubjects([...subjects,{name:'',credits:'',grade:'O'}])}
        className="flex items-center gap-1.5 px-4 py-2 rounded text-sm font-medium transition-all"
        style={{ border:'1px solid #d5d5d5', color:'#555' }}
        onMouseOver={e=>{ e.currentTarget.style.borderColor='#2196F3'; e.currentTarget.style.color='#2196F3' }}
        onMouseOut={e=>{ e.currentTarget.style.borderColor='#d5d5d5'; e.currentTarget.style.color='#555' }}>
        <Plus size={14}/> Add Subject
      </button>
      <button onClick={calculate} className="w-full justify-center flex items-center gap-2 py-3 rounded font-semibold text-white text-sm" style={{ backgroundColor:'#2196F3' }}>
        <Calculator size={16}/> Calculate SGPA
      </button>
      {result && (
        <motion.div initial={{ scale:0.8,opacity:0 }} animate={{ scale:1,opacity:1 }}
          className="p-5 rounded text-center" style={{ backgroundColor:'#e3f2fd', border:'2px solid #2196F3' }}>
          <div className="text-sm mb-1" style={{ color:'#555' }}>Your SGPA</div>
          <div className="text-5xl font-black" style={{ color:'#2196F3' }}>{result}</div>
          <div className="text-xs mt-2" style={{ color:'#777' }}>
            {result>=9?'🏆 Outstanding!':result>=8?'⭐ Excellent!':result>=7?'✅ Good!':'📚 Keep it up!'}
          </div>
        </motion.div>
      )}
    </div>
  )
}

/* ── Attendance Calc ── */
function AttendanceCalc() {
  const [present, setPresent] = useState('')
  const [total,   setTotal]   = useState('')
  const [result,  setResult]  = useState(null)
  const calculate = () => {
    if (!present||!total||total==0) return
    const pct = (present/total*100).toFixed(1)
    const needed75 = Math.ceil((0.75*total-present)/0.25)
    const canMiss  = Math.floor(present-0.75*total)
    setResult({ pct, needed75: needed75>0?needed75:0, canMiss: canMiss>0?canMiss:0 })
  }
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs mb-2 block font-medium" style={{ color:'#555' }}>Classes Attended</label>
          <input type="number" min="0" value={present} onChange={e=>setPresent(e.target.value)} placeholder="e.g. 65" className="w3-input"/>
        </div>
        <div>
          <label className="text-xs mb-2 block font-medium" style={{ color:'#555' }}>Total Classes</label>
          <input type="number" min="1" value={total} onChange={e=>setTotal(e.target.value)} placeholder="e.g. 80" className="w3-input"/>
        </div>
      </div>
      <button onClick={calculate} className="w-full justify-center flex items-center gap-2 py-3 rounded font-semibold text-white text-sm" style={{ backgroundColor:'#FF9800' }}>
        <Calculator size={16}/> Calculate Attendance
      </button>
      {result && (
        <motion.div initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} className="space-y-3">
          <div className="p-5 rounded text-center" style={{
            backgroundColor: Number(result.pct)>=75?'#e8f5e9':'#ffebee',
            border: `2px solid ${Number(result.pct)>=75?'#4caf50':'#ef5350'}`
          }}>
            <div className="text-5xl font-black" style={{ color: Number(result.pct)>=75?'#4caf50':'#ef5350' }}>{result.pct}%</div>
            <div className="text-sm mt-1" style={{ color: Number(result.pct)>=75?'#4caf50':'#ef5350' }}>
              {Number(result.pct)>=75?'✅ Eligible for exam':'❌ Below 75% — Attendance shortage'}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded text-center" style={{ backgroundColor:'#fff8e1', border:'1px solid #ffe082' }}>
              <div className="text-lg font-bold" style={{ color:'#FF9800' }}>{result.needed75}</div>
              <div className="text-xs" style={{ color:'#777' }}>More classes needed (75%)</div>
            </div>
            <div className="p-3 rounded text-center" style={{ backgroundColor:'#e8f5f0', border:'1px solid #a5d6a7' }}>
              <div className="text-lg font-bold" style={{ color:'#04AA6D' }}>{result.canMiss}</div>
              <div className="text-xs" style={{ color:'#777' }}>Classes you can still miss</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

/* ── Percentage Calc ── */
function PercentageCalc() {
  const [marks, setMarks] = useState('')
  const [total, setTotal] = useState('')
  const [result,setResult]= useState(null)
  const calculate = () => {
    if (!marks||!total||total==0) return
    setResult((marks/total*100).toFixed(2))
  }
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs mb-2 block font-medium" style={{ color:'#555' }}>Marks Obtained</label>
          <input type="number" value={marks} onChange={e=>setMarks(e.target.value)} placeholder="e.g. 450" className="w3-input"/>
        </div>
        <div>
          <label className="text-xs mb-2 block font-medium" style={{ color:'#555' }}>Total Marks</label>
          <input type="number" value={total} onChange={e=>setTotal(e.target.value)} placeholder="e.g. 600" className="w3-input"/>
        </div>
      </div>
      <button onClick={calculate} className="w-full justify-center flex items-center gap-2 py-3 rounded font-semibold text-white text-sm" style={{ backgroundColor:'#9c27b0' }}>
        <Calculator size={16}/> Calculate Percentage
      </button>
      {result && (
        <motion.div initial={{ scale:0.8,opacity:0 }} animate={{ scale:1,opacity:1 }}
          className="p-5 rounded text-center" style={{ backgroundColor:'#f3e5f5', border:'2px solid #9c27b0' }}>
          <div className="text-sm mb-1" style={{ color:'#555' }}>Your Percentage</div>
          <div className="text-5xl font-black" style={{ color:'#9c27b0' }}>{result}%</div>
          <div className="text-xs mt-2" style={{ color:'#777' }}>
            {result>=90?'🥇 Distinction':result>=75?'🥈 First Class':result>=60?'🥉 Second Class':result>=45?'✅ Pass':'❌ Fail'}
          </div>
        </motion.div>
      )}
    </div>
  )
}

const CALC_COMPONENTS = { cgpa:CGPACalc, sgpa:SGPACalc, attendance:AttendanceCalc, percentage:PercentageCalc }

export default function Tools() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(location.hash?.slice(1)||'cgpa')
  useEffect(() => {
    if (location.hash) { const id=location.hash.slice(1); if (CALC_COMPONENTS[id]) setActiveTab(id) }
  }, [location.hash])
  const ActiveCalc = CALC_COMPONENTS[activeTab]||CGPACalc
  const activeTool = TOOLS.find(t=>t.id===activeTab)
  const color = TOOL_COLORS[activeTab]||'#04AA6D'

  return (
    <>
      <SEOHead title="RGPV Student Tools - CGPA, SGPA, Attendance, Percentage Calculator"
        description="Free online calculators for RGPV students. Calculate CGPA, SGPA, attendance percentage and exam percentage."
        keywords="CGPA calculator, SGPA calculator, attendance calculator, percentage calculator, RGPV tools"
        url="/tools"/>

      <div className="min-h-screen pb-24 lg:pb-8">
        <div style={{ backgroundColor:'#282A35' }} className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Breadcrumb />
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">
              Student <span style={{ color:'#04AA6D' }}>Tools</span>
            </h1>
            <p className="text-sm" style={{ color:'rgba(255,255,255,0.6)' }}>Free calculators designed for RGPV students</p>
          </div>
        </div>
        <div className="h-1" style={{ backgroundColor:'#04AA6D' }} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          {/* Tool selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {TOOLS.map(tool => {
              const tc = TOOL_COLORS[tool.id]||'#04AA6D'
              const isActive = activeTab===tool.id
              return (
                <button key={tool.id} onClick={() => setActiveTab(tool.id)}
                  className="p-4 rounded text-center transition-all"
                  style={isActive
                    ? { border:`2px solid ${tc}`, backgroundColor:`${tc}12`, color:tc }
                    : { border:'1px solid #d5d5d5', color:'#777', backgroundColor:'#fff' }}
                  onMouseOver={e => { if (!isActive) { e.currentTarget.style.borderColor=tc; e.currentTarget.style.color=tc } }}
                  onMouseOut={e => { if (!isActive) { e.currentTarget.style.borderColor='#d5d5d5'; e.currentTarget.style.color='#777' } }}>
                  <div className="text-2xl mb-2">{tool.icon}</div>
                  <div className="text-sm font-semibold">{tool.name}</div>
                </button>
              )
            })}
          </div>

          {/* Calculator card */}
          <motion.div key={activeTab} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
            className="bg-white rounded shadow-w3 overflow-hidden">
            <div className="py-4 px-6 flex items-center gap-3" style={{ borderBottom:`3px solid ${color}` }}>
              <span className="text-3xl">{activeTool?.icon}</span>
              <div>
                <h2 className="font-bold text-xl" style={{ color:'#282A35' }}>{activeTool?.name}</h2>
                <p className="text-sm" style={{ color:'#777' }}>{activeTool?.desc}</p>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <ActiveCalc />
            </div>
          </motion.div>

          {/* Grade reference for SGPA */}
          {activeTab === 'sgpa' && (
            <div className="w3-card p-6 mt-6">
              <h3 className="font-semibold mb-4" style={{ color:'#282A35' }}>RGPV Grade Points Reference</h3>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {GRADES.map(g => (
                  <div key={g.grade} className="text-center p-2 rounded" style={{ backgroundColor:'#f1f1f1', border:'1px solid #d5d5d5' }}>
                    <div className="font-bold" style={{ color:'#2196F3' }}>{g.grade}</div>
                    <div className="text-xs" style={{ color:'#777' }}>{g.points}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
