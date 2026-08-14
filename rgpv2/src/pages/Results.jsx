import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Award, Info, AlertCircle, HelpCircle, Send, CheckCircle } from 'lucide-react'
import { RESULT_LINKS } from '../data/index.js'
import Breadcrumb from '../components/layout/Breadcrumb.jsx'
import SEOHead from '../components/ui/SEOHead.jsx'
import toast from 'react-hot-toast'

const STEPS = [
  'Visit the official RGPV result portal at rgpv.ac.in',
  'Click on "Student Corner" → "Exam Results"',
  'Select your course (B.Tech / M.Tech / MBA / MCA / Diploma)',
  'Select your semester and examination year',
  'Enter your enrollment number and click "Submit"',
  'Download or take a screenshot of your result',
]

const RESULT_FAQS = [
  { q: 'When are RGPV results declared?', a: 'RGPV typically declares results within 45–60 days after the examination. Results are announced on the official website rgpv.ac.in.' },
  { q: 'How to apply for revaluation if unsatisfied with result?', a: 'Visit the RGPV website and look for the revaluation form link. You can also visit our blog for a step-by-step guide on filling the revaluation form.' },
  { q: 'What is the passing criteria in RGPV?', a: 'Students need to score at least 40% marks in each subject (36% in B.Tech as per CBCS scheme) to pass.' },
  { q: 'How to get marksheet from RGPV?', a: 'Original marksheets are distributed through respective colleges. You can apply for a duplicate marksheet at the RGPV examination department.' },
]

export default function Results() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    course: 'B.Tech',
    semester: '',
    enrollment: '',
    year: '2024',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.name || !form.email || !form.semester || !form.enrollment || !form.year) {
      return toast.error('Please fill your name, email, semester, enrollment number and year.')
    }

    const payload = {
      ...form,
      submittedAt: new Date().toISOString(),
    }

    const existing = JSON.parse(localStorage.getItem('rgpv-result-requests') || '[]')
    localStorage.setItem('rgpv-result-requests', JSON.stringify([payload, ...existing].slice(0, 25)))

    const subject = encodeURIComponent(`Result request received from ${form.name}`)
    const body = encodeURIComponent(
      `Hello RGPV Hub,\n\nA student has requested result guidance.\n\nName: ${form.name}\nEmail: ${form.email}\nCourse: ${form.course}\nSemester: ${form.semester}\nEnrollment Number: ${form.enrollment}\nYear: ${form.year}\nMessage: ${form.message || '—'}\n\nPlease go to https://rgpv.ac.in and check your result. Best of luck!`
    )

    window.location.href = `mailto:contact@rgpvhub.in?subject=${subject}&body=${body}`
    setSubmitted(true)
    toast.success('Your result request has been received. Please check your email client to send the details to us.')
  }

  return (
    <>
      <SEOHead title="RGPV Results 2024 - Check Semester Exam Results Online"
        description="Check RGPV exam results online. Step-by-step guide to check B.Tech, M.Tech, MBA, MCA results on rgpv.ac.in."
        keywords="RGPV results, RGPV result 2024, check RGPV result, B.Tech result RGPV"
        url="/results" />

      <div className="min-h-screen pb-24 lg:pb-8">
        <div style={{ backgroundColor:'#282A35' }} className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Breadcrumb />
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">
              RGPV <span style={{ color:'#04AA6D' }}>Results</span>
            </h1>
            <p className="text-sm" style={{ color:'rgba(255,255,255,0.6)' }}>Check your RGPV semester examination results</p>
          </div>
        </div>
        <div className="h-1" style={{ backgroundColor:'#04AA6D' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Important notice */}
          <div className="flex gap-3 p-4 rounded mb-6" style={{ backgroundColor:'#fff8e1', border:'1px solid #ffe082' }}>
            <AlertCircle size={20} style={{ color:'#f57c00' }} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm mb-1" style={{ color:'#e65100' }}>Important Notice</p>
              <p className="text-xs leading-relaxed" style={{ color:'#bf360c' }}>
                RGPV Hub does not host results directly. We provide guidance and direct links to the official RGPV portal. Always check results on the official rgpv.ac.in website.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-5">
              {/* Official Links */}
              <div className="w3-card p-6">
                <h2 className="font-bold text-lg mb-5 flex items-center gap-2" style={{ color:'#282A35' }}>
                  <Award size={20} style={{ color:'#04AA6D' }} /> Official Result Links
                </h2>
                <div className="space-y-2">
                  {RESULT_LINKS.map((link, i) => (
                    <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 rounded transition-all"
                      style={{ border:'1px solid #d5d5d5', backgroundColor:'#fff' }}
                      onMouseOver={e => { e.currentTarget.style.borderColor='#04AA6D'; e.currentTarget.style.backgroundColor='#f0faf5' }}
                      onMouseOut={e => { e.currentTarget.style.borderColor='#d5d5d5'; e.currentTarget.style.backgroundColor='#fff' }}>
                      <div>
                        <div className="font-medium text-sm" style={{ color:'#282A35' }}>{link.name}</div>
                        <div className="text-xs mt-0.5" style={{ color:'#777' }}>{link.desc}</div>
                      </div>
                      <ExternalLink size={16} style={{ color:'#aaa' }} />
                    </a>
                  ))}
                </div>
              </div>

              {/* How to check */}
              <div className="w3-card p-6">
                <h2 className="font-bold text-lg mb-5 flex items-center gap-2" style={{ color:'#282A35' }}>
                  <Info size={20} style={{ color:'#2196F3' }} /> How to Check RGPV Result
                </h2>
                <ol className="space-y-3">
                  {STEPS.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5"
                        style={{ backgroundColor:'#04AA6D' }}>{i + 1}</span>
                      <span className="text-sm leading-relaxed" style={{ color:'#555' }}>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* FAQs */}
              <div className="w3-card p-6">
                <h2 className="font-bold text-lg mb-5 flex items-center gap-2" style={{ color:'#282A35' }}>
                  <HelpCircle size={20} style={{ color:'#FF9800' }} /> Result FAQs
                </h2>
                <div className="space-y-4">
                  {RESULT_FAQS.map((faq, i) => (
                    <div key={i} className="pb-4 last:pb-0" style={{ borderBottom: i < RESULT_FAQS.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                      <h3 className="font-semibold text-sm mb-2" style={{ color:'#282A35' }}>{faq.q}</h3>
                      <p className="text-xs leading-relaxed" style={{ color:'#777' }}>{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="w3-card p-5">
                <h3 className="font-semibold mb-4" style={{ color:'#282A35' }}>Quick Links</h3>
                <div className="space-y-2">
                  {['B.Tech','M.Tech','MBA','MCA'].map(course => (
                    <a key={course} href="https://rgpv.ac.in" target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded transition-all text-sm"
                      style={{ border:'1px solid #e0e0e0', color:'#555' }}
                      onMouseOver={e => { e.currentTarget.style.color='#04AA6D'; e.currentTarget.style.borderColor='#04AA6D' }}
                      onMouseOut={e => { e.currentTarget.style.color='#555'; e.currentTarget.style.borderColor='#e0e0e0' }}>
                      <span>Check {course} Result</span>
                      <ExternalLink size={12} style={{ color:'#aaa' }} />
                    </a>
                  ))}
                  <a href="/results/diploma"
                    className="flex items-center justify-between p-3 rounded transition-all text-sm"
                    style={{ border:'1px solid #e0e0e0', color:'#555' }}
                    onMouseOver={e => { e.currentTarget.style.color='#04AA6D'; e.currentTarget.style.borderColor='#04AA6D' }}
                    onMouseOut={e => { e.currentTarget.style.color='#555'; e.currentTarget.style.borderColor='#e0e0e0' }}>
                    <span>Check Diploma Result</span>
                    <ExternalLink size={12} style={{ color:'#aaa' }} />
                  </a>
                </div>
              </div>

              <div className="w3-card p-5">
                <h3 className="font-semibold mb-3" style={{ color:'#282A35' }}>Result Request Form</h3>
                <p className="text-xs mb-4" style={{ color:'#555' }}>Fill in your details and we’ll help you with your result request.</p>

                {submitted ? (
                  <motion.div initial={{ opacity:0, scale:0.98 }} animate={{ opacity:1, scale:1 }} className="text-center">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor:'#e8f5f0' }}>
                      <CheckCircle size={28} style={{ color:'#04AA6D' }} />
                    </div>
                    <p className="text-sm font-semibold mb-2" style={{ color:'#282A35' }}>Request Received</p>
                    <p className="text-xs leading-relaxed" style={{ color:'#555' }}>
                      Your details have been saved. Please open your email app to send the request, then visit the official RGPV result portal and check your result. Best of luck!
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name" className="w3-input text-sm" required />
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="Email address" className="w3-input text-sm" required />
                    <select value={form.course} onChange={e => setForm({ ...form, course: e.target.value })} className="w3-input text-sm">
                      {['B.Tech', 'M.Tech', 'MBA', 'MCA', 'Diploma'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="number" min="1" max="8" value={form.semester} onChange={e => setForm({ ...form, semester: e.target.value })}
                        placeholder="Semester" className="w3-input text-sm" required />
                      <input type="text" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })}
                        placeholder="Year" className="w3-input text-sm" required />
                    </div>
                    <input type="text" value={form.enrollment} onChange={e => setForm({ ...form, enrollment: e.target.value })}
                      placeholder="Enrollment number" className="w3-input text-sm" required />
                    <textarea rows="3" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Optional note" className="w3-input resize-none text-sm" />
                    <button type="submit" className="btn-primary w-full justify-center text-sm">
                      <Send size={14} /> Send Result Request
                    </button>
                  </form>
                )}
              </div>

              <div className="p-5 rounded" style={{ backgroundColor:'#e8f5f0', border:'1px solid #b2dfdb' }}>
                <h3 className="font-semibold mb-2" style={{ color:'#282A35' }}>Get Result Notifications</h3>
                <p className="text-xs mb-4" style={{ color:'#555' }}>Get instant alerts when RGPV declares new results</p>
                <a href="https://instagram.com/k.z.987" target="_blank" rel="noopener noreferrer"
                  className="btn-primary text-sm w-full justify-center">Follow on Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
