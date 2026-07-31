import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Instagram, MessageCircle, Send, CheckCircle, FileText, Bug, Lightbulb, HelpCircle } from 'lucide-react'
import Breadcrumb from '../components/layout/Breadcrumb.jsx'
import SEOHead from '../components/ui/SEOHead.jsx'
import toast from 'react-hot-toast'

const CONTACT_REASONS = [
  { id:'paper',   icon:FileText,  label:'Request a Paper/Note' },
  { id:'bug',     icon:Bug,       label:'Report a Bug' },
  { id:'suggest', icon:Lightbulb, label:'Suggest a Feature' },
  { id:'other',   icon:HelpCircle,label:'General Query' },
]

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', reason:'paper', message:'' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return toast.error('Please fill all required fields')
    setSubmitted(true)
    toast.success("Your message has been sent. We'll respond within 24 hours.")
  }

  return (
    <>
      <SEOHead title="Contact RGPV Hub - Support & Requests"
        description="Reach out to RGPV Hub for paper requests, app feedback, feature suggestions, or general support. We answer most requests within 24 hours."
        url="/contact" />

      <div className="min-h-screen pb-24 lg:pb-8">
        <div style={{ backgroundColor:'#282A35' }} className="py-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <Breadcrumb />
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">
              Contact <span style={{ color:'#04AA6D' }}>RGPV Hub</span>
            </h1>
            <p className="text-sm" style={{ color:'rgba(255,255,255,0.6)' }}>
              Get support for paper requests, error reports, content feedback, and partnership inquiries.
            </p>
          </div>
        </div>
        <div className="h-1" style={{ backgroundColor:'#04AA6D' }} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="w3-card p-6">
                <h3 className="font-semibold mb-5" style={{ color:'#282A35' }}>Contact Information</h3>
                {[
                  { icon:Instagram,       label:'Instagram',       value:'@k.z.987',           href:'https://instagram.com/k.z.987', color:'#e91e8c' },
                  { icon:MessageCircle,   label:'WhatsApp Channel',value:'Join Channel',        href:'#', color:'#25D366' },
                  { icon:Mail,            label:'Email',           value:'contact@rgpvhub.in', href:'mailto:contact@rgpvhub.in', color:'#04AA6D' },
                ].map(c => (
                  <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded mb-1 transition-all"
                    style={{ border:'1px solid transparent' }}
                    onMouseOver={e => e.currentTarget.style.backgroundColor='#f9f9f9'}
                    onMouseOut={e => e.currentTarget.style.backgroundColor='transparent'}>
                    <div className="p-2 rounded" style={{ backgroundColor:`${c.color}18`, color:c.color }}>
                      <c.icon size={16} />
                    </div>
                    <div>
                      <div className="text-xs" style={{ color:'#aaa' }}>{c.label}</div>
                      <div className="text-sm font-medium" style={{ color:'#282A35' }}>{c.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="p-5 rounded" style={{ backgroundColor:'#e8f5f0', border:'1px solid #b2dfdb' }}>
                <h3 className="font-semibold mb-2" style={{ color:'#282A35' }}>Fast Support</h3>
                <p className="text-xs leading-relaxed" style={{ color:'#555' }}>
                  For the quickest response, send us a message on Instagram <span style={{ color:'#e91e8c' }}>@k.z.987</span>. Our team is usually available between 9 AM and 10 PM IST.
                </p>
              </div>

              <div className="w3-card p-5">
                <h3 className="font-semibold mb-2 text-sm" style={{ color:'#282A35' }}>Need a Paper?</h3>
                <p className="text-xs leading-relaxed" style={{ color:'#777' }}>
                  Use the form to request a specific paper or note. Include subject, semester, year and branch, and we will upload it as soon as possible.
                </p>
              </div>
            </div>

            <div className="lg:col-span-3">
              {submitted ? (
                <motion.div initial={{ scale:0.95, opacity:0 }} animate={{ scale:1, opacity:1 }}
                  className="w3-card p-10 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor:'#e8f5f0' }}>
                    <CheckCircle size={32} style={{ color:'#04AA6D' }} />
                  </div>
                  <h3 className="font-bold text-xl mb-2" style={{ color:'#282A35' }}>Message Sent!</h3>
                  <p className="text-sm mb-6" style={{ color:'#777' }}>
                    Thank you for reaching out. We will review your request and reply within 24 hours.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn-outline">Send Another Request</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="w3-card p-6 space-y-5">
                  <h3 className="font-semibold text-lg" style={{ color:'#282A35' }}>Send a Message</h3>
                  <p className="text-sm" style={{ color:'#555' }}>
                    Fill in your details and let us know how we can help. We handle site support, content requests, and feedback personally.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs mb-2 block font-medium" style={{ color:'#555' }}>Your Name *</label>
                      <input type="text" value={form.name} onChange={e => setForm({...form, name:e.target.value})}
                        placeholder="Rahul Sharma" className="w3-input" required />
                    </div>
                    <div>
                      <label className="text-xs mb-2 block font-medium" style={{ color:'#555' }}>Email Address *</label>
                      <input type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})}
                        placeholder="you@example.com" className="w3-input" required />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs mb-2 block font-medium" style={{ color:'#555' }}>Reason for Contact</label>
                    <div className="grid grid-cols-2 gap-2">
                      {CONTACT_REASONS.map(r => (
                        <button key={r.id} type="button" onClick={() => setForm({...form, reason:r.id})}
                          className="flex items-center gap-2 px-3 py-2.5 rounded text-sm font-medium transition-all"
                          style={form.reason === r.id
                            ? { backgroundColor:'#04AA6D', color:'#fff', border:'1px solid #04AA6D' }
                            : { border:'1px solid #d5d5d5', color:'#555', backgroundColor:'#fff' }}>
                          <r.icon size={14} /> {r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs mb-2 block font-medium" style={{ color:'#555' }}>Message *</label>
                    <textarea value={form.message} onChange={e => setForm({...form, message:e.target.value})}
                      placeholder="Describe your query in detail..." rows={5}
                      className="w3-input resize-none" required />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center">
                    <Send size={16} /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
