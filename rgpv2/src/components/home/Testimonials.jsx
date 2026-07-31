import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useLang } from '../../context/LanguageContext.jsx'
import { TESTIMONIALS } from '../../data/index.js'

const AVATAR_COLORS = ['#04AA6D','#2196F3','#FF9800','#9c27b0','#f44336']

export default function Testimonials() {
  const { t } = useLang()
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="mb-10 text-center">
          <h2 className="section-heading inline-block">{t('testimonials')}</h2>
          <p className="text-[#555] mt-4 text-sm">{t('testimonials_sub')}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t,i) => (
            <motion.div key={t.id}
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:i*0.08 }}
              className="bg-white rounded p-6 group transition-all duration-200"
              style={{ border:'1px solid #d5d5d5', borderLeft:`4px solid ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`, boxShadow:'0 1px 3px rgba(0,0,0,.08)' }}
              onMouseOver={e=>{ e.currentTarget.style.boxShadow='0 5px 15px rgba(0,0,0,.12)'; e.currentTarget.style.transform='translateY(-3px)' }}
              onMouseOut={e=>{  e.currentTarget.style.boxShadow='0 1px 3px rgba(0,0,0,.08)'; e.currentTarget.style.transform='translateY(0)' }}>

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(t.rating)].map((_,j) => (
                  <Star key={j} size={14} fill="#FF9800" style={{ color:'#FF9800' }} />
                ))}
              </div>

              <p className="text-[#333] text-sm leading-relaxed mb-5 italic">"{t.text}"</p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                     style={{ backgroundColor: AVATAR_COLORS[i % AVATAR_COLORS.length] }}>
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm text-[#282A35]">{t.name}</div>
                  <div className="text-xs text-[#777]">{t.branch}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
