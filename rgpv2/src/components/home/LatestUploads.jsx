import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLang } from '../../context/LanguageContext.jsx'
import { PAPERS, NOTES } from '../../data/index.js'
import PaperCard from '../ui/PaperCard.jsx'
import NoteCard from '../ui/NoteCard.jsx'
import { useState } from 'react'

export default function LatestUploads() {
  const { t } = useLang()
  const [tab, setTab] = useState('papers')
  return (
    <section className="py-14" style={{ backgroundColor:'#f1f1f1' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          className="flex items-end justify-between mb-8">
          <div>
            <h2 className="section-heading">{t('latest_uploads')}</h2>
            <p className="text-[#555] mt-3 text-sm">{t('latest_uploads_sub')}</p>
          </div>
          <Link to={tab==='papers'?'/papers':'/notes'}
            className="hidden sm:flex items-center gap-1 text-sm font-semibold hover:underline"
            style={{ color:'#04AA6D' }}>
            {t('view_all')} <ArrowRight size={15} />
          </Link>
        </motion.div>

        {/* Tabs — W3Schools style */}
        <div className="flex mb-6 border-b border-[#d5d5d5]">
          {['papers','notes'].map(key => (
            <button key={key} onClick={() => setTab(key)}
              className="px-6 py-2.5 text-sm font-semibold capitalize transition-all -mb-px border-b-2"
              style={tab===key
                ? { color:'#04AA6D', borderBottomColor:'#04AA6D', backgroundColor:'white' }
                : { color:'#555', borderBottomColor:'transparent', backgroundColor:'transparent' }}
              onMouseOver={e=>{ if(tab!==key) e.currentTarget.style.color='#04AA6D' }}
              onMouseOut={e=>{  if(tab!==key) e.currentTarget.style.color='#555' }}>
              {t(key)}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tab==='papers'
            ? PAPERS.slice(0,6).map((p,i) => <PaperCard key={p.id} paper={p} index={i} />)
            : NOTES.slice(0,6).map((n,i)  => <NoteCard  key={n.id} note={n} index={i} />)
          }
        </div>
      </div>
    </section>
  )
}
