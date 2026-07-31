import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLang } from '../../context/LanguageContext.jsx'
import { QUICK_LINKS } from '../../data/index.js'
import { FileText, BookOpen, ClipboardList, Award, Calendar, Target, CheckCircle, Rss } from 'lucide-react'

const ICON_MAP = { FileText, BookOpen, ClipboardList, Award, Calendar, Target, CheckCircle, Rss }

const CARD_COLORS = [
  { bg:'#e8f5f0', border:'#04AA6D', icon:'#04AA6D' },
  { bg:'#e8f0fb', border:'#2196F3', icon:'#2196F3' },
  { bg:'#fff3e0', border:'#FF9800', icon:'#FF9800' },
  { bg:'#fce4ec', border:'#e91e63', icon:'#e91e63' },
  { bg:'#e8eaf6', border:'#3F51B5', icon:'#3F51B5' },
  { bg:'#fce4ec', border:'#f44336', icon:'#f44336' },
  { bg:'#e0f2f1', border:'#009688', icon:'#009688' },
  { bg:'#f3e5f5', border:'#9c27b0', icon:'#9c27b0' },
]

export default function QuickAccess() {
  const { t } = useLang()
  return (
    <section className="py-14" style={{ backgroundColor:'#f1f1f1' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="mb-10">
          <h2 className="section-heading">{t('quick_access')}</h2>
          <p className="text-[#555] mt-4 text-sm">{t('quick_access_sub')}</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {QUICK_LINKS.map((item, i) => {
            const Icon = ICON_MAP[item.icon] || FileText
            const clr  = CARD_COLORS[i % CARD_COLORS.length]
            return (
              <motion.div key={item.href}
                initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay: i*0.05 }}>
                <Link to={item.href}
                  className="flex flex-col items-center text-center p-6 rounded bg-white hover:-translate-y-1 transition-all duration-200 group"
                  style={{ border:`1px solid #d5d5d5`, borderTop:`3px solid ${clr.border}`, boxShadow:'0 1px 3px rgba(0,0,0,.08)' }}
                  onMouseOver={e=>{ e.currentTarget.style.boxShadow='0 4px 12px rgba(0,0,0,.12)'; e.currentTarget.style.transform='translateY(-3px)' }}
                  onMouseOut={e=>{  e.currentTarget.style.boxShadow='0 1px 3px rgba(0,0,0,.08)'; e.currentTarget.style.transform='translateY(0)' }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                       style={{ backgroundColor: clr.bg }}>
                    <Icon size={26} style={{ color: clr.icon }} />
                  </div>
                  <h3 className="font-semibold text-sm text-[#282A35] mb-1">{item.label}</h3>
                  <p className="text-xs text-[#777]">{item.desc}</p>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
