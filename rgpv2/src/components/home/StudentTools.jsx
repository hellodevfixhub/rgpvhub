import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLang } from '../../context/LanguageContext.jsx'
import { TOOLS } from '../../data/index.js'

const TOOL_COLORS = ['#04AA6D','#2196F3','#FF9800','#9c27b0']

export default function StudentTools() {
  const { t } = useLang()
  return (
    <section className="py-14" style={{ backgroundColor:'#f1f1f1' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="mb-10">
          <h2 className="section-heading">{t('tools_section')}</h2>
          <p className="text-[#555] mt-3 text-sm">{t('tools_section_sub')}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TOOLS.map((tool,i) => (
            <motion.div key={tool.id}
              initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:i*0.1 }}>
              <Link to={`/tools#${tool.id}`}
                className="flex flex-col h-full p-6 bg-white rounded group transition-all duration-200"
                style={{ border:'1px solid #d5d5d5', borderTop:`4px solid ${TOOL_COLORS[i]}`, boxShadow:'0 1px 3px rgba(0,0,0,.08)' }}
                onMouseOver={e=>{ e.currentTarget.style.boxShadow='0 5px 15px rgba(0,0,0,.12)'; e.currentTarget.style.transform='translateY(-3px)' }}
                onMouseOut={e=>{  e.currentTarget.style.boxShadow='0 1px 3px rgba(0,0,0,.08)'; e.currentTarget.style.transform='translateY(0)' }}>
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{tool.icon}</div>
                <h3 className="font-bold text-[#282A35] text-base mb-2">{tool.name}</h3>
                <p className="text-[#555] text-sm leading-relaxed flex-1">{tool.desc}</p>
                <div className="mt-5 flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all"
                     style={{ color: TOOL_COLORS[i] }}>
                  Open Tool <ArrowRight size={14} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/tools" className="btn-dark">View All Tools <ArrowRight size={15} /></Link>
        </div>
      </div>
    </section>
  )
}
