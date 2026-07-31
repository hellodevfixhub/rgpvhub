import { motion } from 'framer-motion'
import { Instagram, Mail, Target, Shield } from 'lucide-react'
import Breadcrumb from '../components/layout/Breadcrumb.jsx'
import SEOHead from '../components/ui/SEOHead.jsx'
import { STATS } from '../data/index.js'

export default function About() {
  return (
    <>
      <SEOHead title="About RGPV Hub - Trusted RGPV Academic Support"
        description="RGPV Hub is a student-first academic platform offering free notes, PYQs, solutions, and exam guidance for RGPV students. Learn about our experienced team and mission."
        url="/about" />

      <div className="min-h-screen pb-24 lg:pb-8">
        <div style={{ backgroundColor:'#282A35' }} className="py-16 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <Breadcrumb />
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
              <img src="/logo.png" alt="RGPV Hub" className="h-20 w-auto object-contain mx-auto mb-5" />
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
                About <span style={{ color:'#04AA6D' }}>RGPV Hub</span>
              </h1>
              <p className="text-lg max-w-2xl mx-auto" style={{ color:'rgba(255,255,255,0.7)' }}>
                The most reliable free education platform built for RGPV students, with exam-ready notes, previous year papers, and expert guidance.
              </p>
            </motion.div>
          </div>
        </div>
        <div className="h-1" style={{ backgroundColor:'#04AA6D' }} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="w3-card p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded" style={{ backgroundColor:'#e8f5f0' }}>
                <Target size={22} style={{ color:'#04AA6D' }} />
              </div>
              <h2 className="font-bold text-xl" style={{ color:'#282A35' }}>Our Mission</h2>
            </div>
            <p className="leading-relaxed mb-4" style={{ color:'#555' }}>
              RGPV Hub exists to serve RGPV students with high-quality academic resources, guidance, and exam support. We make important study materials easy to find, understand, and download.
            </p>
            <p className="leading-relaxed" style={{ color:'#555' }}>
              Our focus is on accuracy, clarity, and value: dependable question papers, concise notes, verified syllabus content, and practical tips for exam success.
            </p>
          </motion.div>

          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="w3-card p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded" style={{ backgroundColor:'#e8f5f0' }}>
                <Shield size={22} style={{ color:'#04AA6D' }} />
              </div>
              <h2 className="font-bold text-xl" style={{ color:'#282A35' }}>Why Students Trust Us</h2>
            </div>
            <p className="leading-relaxed mb-4" style={{ color:'#555' }}>
              We are an independent education platform with a clear disclaimer: RGPV Hub is not affiliated with Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV). Our role is to support students with practical, syllabus-aligned study resources.
            </p>
            <p className="leading-relaxed" style={{ color:'#555' }}>
              Our content is built around direct student needs: exam papers, notes, result guidance, syllabus summaries, and time-saving tools for every semester.
            </p>
          </motion.div>

          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="w3-card p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded" style={{ backgroundColor:'#e8f5f0' }}>
                <Mail size={22} style={{ color:'#04AA6D' }} />
              </div>
              <h2 className="font-bold text-xl" style={{ color:'#282A35' }}>Our Team</h2>
            </div>
            <p className="leading-relaxed mb-4" style={{ color:'#555' }}>
              The RGPV Hub team includes experienced engineers and Masters professionals from Computer Science & Engineering, with more than 7 years of experience in academics, exam preparation, and content development.
            </p>
            <p className="leading-relaxed" style={{ color:'#555' }}>
              Our authors write for clarity and exam relevance, while our editors verify every guide against the latest RGPV syllabus and question patterns.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              {[
                { title:'7+ Years RGPV Experience', desc:'Trusted exam guidance from educators and mentors', icon:'🧠' },
                { title:'CSE & Masters Experts', desc:'Technical authors with academic and practical expertise', icon:'🎓' },
                { title:'Student-first Content', desc:'Clear notes, solved PYQs, and study planning tips', icon:'📘' },
                { title:'Free & Accessible', desc:'All major resources available without paywalls', icon:'🤝' },
              ].map(item => (
                <div key={item.title} className="p-4 rounded" style={{ backgroundColor:'#f9f9f9', border:'1px solid #e0e0e0' }}>
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="font-semibold text-sm mb-1" style={{ color:'#282A35' }}>{item.title}</div>
                  <div className="text-xs" style={{ color:'#777' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="w3-card p-8">
            <h2 className="font-bold text-xl mb-6" style={{ color:'#282A35' }}>What We Provide</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon:'📄', title:'Paper Library', desc:'Full collection of RGPV previous year papers', color:'#04AA6D' },
                { icon:'📚', title:'Study Notes', desc:'Concise, exam-focused notes for all subjects', color:'#2196F3' },
                { icon:'🎯', title:'Exam Tips', desc:'Practical strategies to improve RGPV scores', color:'#FF9800' },
                { icon:'🔍', title:'Syllabus Help', desc:'Easy-to-use syllabus and exam pattern guides', color:'#9c27b0' },
              ].map(item => (
                <div key={item.title} className="flex items-start gap-3 p-4 rounded"
                  style={{ backgroundColor:'#f9f9f9', border:'1px solid #e0e0e0', borderLeft:`4px solid ${item.color}` }}>
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="font-semibold text-sm" style={{ color:'#282A35' }}>{item.title}</div>
                    <div className="text-xs mt-1" style={{ color:'#777' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="p-5 rounded" style={{ backgroundColor:'#fff8e1', border:'1px solid #ffe082' }}>
            <div className="flex items-start gap-3">
              <Shield size={20} style={{ color:'#f57c00' }} className="flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-2" style={{ color:'#e65100' }}>Important Disclaimer</h3>
                <p className="text-sm leading-relaxed" style={{ color:'#bf360c' }}>
                  RGPV Hub is an independent student-help platform and is NOT affiliated with, endorsed by, or connected to Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV), Bhopal in any way. All content is provided for educational purposes only. For official announcements and updates, please visit rgpv.ac.in.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="p-8 rounded text-center" style={{ backgroundColor:'#282A35' }}>
            <h2 className="font-bold text-xl mb-2 text-white">Need Help?</h2>
            <p className="text-sm mb-6" style={{ color:'rgba(255,255,255,0.6)' }}>
              For paper requests, content feedback or partnership inquiries, reach out through our contact page or Instagram.
            </p>
            <div className="flex items-center justify-center gap-4">
              <a href="https://instagram.com/k.z.987" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded font-medium text-sm"
                style={{ border:'1px solid rgba(255,105,180,0.4)', color:'#ff69b4' }}>
                <Instagram size={16} /> @k.z.987
              </a>
              <a href="/contact" className="btn-primary flex items-center gap-2">
                <Mail size={16} /> Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
