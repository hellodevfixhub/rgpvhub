import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Download, BookOpen, ArrowRight, CheckCircle } from 'lucide-react'
import { STATS } from '../../data/index.js'
import { useLang } from '../../context/LanguageContext.jsx'

const ICON_MAP = { FileText:'📄', BookOpen:'📚', Users:'👥', Download:'⬇️' }

export default function HeroSection() {
  const { t } = useLang()
  return (
    <section className="text-white overflow-hidden relative"
      style={{
        backgroundImage: 'url(/homepage.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
      {/* Dark overlay so text stays legible over the photo */}
      <div className="absolute inset-0" style={{ backgroundColor:'rgba(5,8,22,0.72)' }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <motion.div initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.6 }}>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs font-semibold mb-6 uppercase tracking-wider"
                 style={{ backgroundColor:'rgba(4,170,109,0.2)', color:'#04AA6D', border:'1px solid rgba(4,170,109,0.4)' }}>
              🏆 India's #1 RGPV Resource Platform
            </div>

            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-white leading-tight mb-5">
              {t('hero_title').split('RGPV').map((part, index, arr) => (
                <span key={index}>
                  {part}
                  {index < arr.length - 1 && <span style={{ color: '#04AA6D' }}>RGPV</span>}
                </span>
              ))}
            </h1>

            <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-6 max-w-lg">
              {t('hero_sub')}
            </p>

            {/* Feature list */}
            <div className="grid grid-cols-2 gap-2 mb-8">
              {[
                t('hero_feature_1'),
                t('hero_feature_2'),
                t('hero_feature_3'),
                t('hero_feature_4'),
                t('hero_feature_5'),
                t('hero_feature_6'),
              ].map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-white/80">
                  <CheckCircle size={14} style={{ color:'#04AA6D' }} className="flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link to="/papers" className="btn-primary text-sm">
                <Download size={16} /> {t('cta_papers')}
              </Link>
              <Link to="/notes" className="btn-outline text-sm"
                style={{ borderColor:'rgba(255,255,255,0.4)', color:'white' }}
                onMouseOver={e=>{ e.currentTarget.style.backgroundColor='rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor='white' }}
                onMouseOut={e=>{ e.currentTarget.style.backgroundColor='transparent'; e.currentTarget.style.borderColor='rgba(255,255,255,0.4)' }}>
                <BookOpen size={16} /> {t('cta_notes')}
              </Link>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STATS.map((s,i)=>(
                <motion.div key={s.label} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4+i*0.1 }}
                  className="text-center p-3 rounded" style={{ backgroundColor:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)' }}>
                  <div className="text-xl font-black" style={{ color:'#04AA6D' }}>{s.value}</div>
                  <div className="text-white/55 text-xs mt-0.5">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — visual grid */}
          <motion.div initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.6, delay:0.2 }}
            className="hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon:'📄', title:'5,000+ Papers', desc:'All branches & years', color:'#04AA6D' },
                { icon:'📚', title:'1,200+ Notes', desc:'Expert-crafted PDFs', color:'#2196F3' },
                { icon:'🎯', title:'Guess Papers', desc:'Exam-focused topics', color:'#FF9800' },
                { icon:'✅', title:'PYQ Solutions', desc:'Step-by-step answers', color:'#9c27b0' },
                { icon:'🔧', title:'Free Tools', desc:'CGPA, SGPA, Attendance', color:'#f44336' },
                { icon:'📝', title:'RGPV Blog', desc:'Updates & tips', color:'#607d8b' },
              ].map((card,i)=>(
                <motion.div key={card.title}
                  initial={{ opacity:0, scale:0.85 }} animate={{ opacity:1, scale:1 }}
                  transition={{ delay:0.3+i*0.08, type:'spring' }}
                  className="rounded p-4 hover:-translate-y-1 transition-transform cursor-pointer"
                  style={{ backgroundColor:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)' }}>
                  <div className="text-2xl mb-2">{card.icon}</div>
                  <div className="font-semibold text-white text-sm">{card.title}</div>
                  <div className="text-white/55 text-xs mt-0.5">{card.desc}</div>
                  <div className="mt-2 w-8 h-0.5 rounded" style={{ backgroundColor:card.color }} />
                </motion.div>
              ))}
            </div>

            {/* Trusted badge */}
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1 }}
              className="mt-5 flex items-center gap-3 p-3 rounded"
              style={{ backgroundColor:'rgba(4,170,109,0.15)', border:'1px solid rgba(4,170,109,0.3)' }}>
              <span className="text-2xl">⭐</span>
              <div>
                <div className="font-semibold text-white text-sm">Trusted by 2,50,000+ students</div>
                <div className="text-white/55 text-xs">4.9/5 · Free forever · No registration required</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Green bottom strip */}
      <div className="relative z-10 h-1" style={{ backgroundColor:'#04AA6D' }} />
    </section>
  )
}
