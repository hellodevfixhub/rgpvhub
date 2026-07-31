import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TrendingUp, ArrowRight } from 'lucide-react'
import { PAPERS } from '../../data/index.js'
import PaperCard from '../ui/PaperCard.jsx'

export default function PopularDownloads() {
  const trending = PAPERS.filter(p => p.trending).slice(0, 4)
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          className="flex items-end justify-between mb-10">
          <div>
            <h2 className="section-heading">
              <span className="flex items-center gap-2">
                <TrendingUp size={24} style={{ color:'#04AA6D' }} /> Popular Downloads
              </span>
            </h2>
            <p className="text-[#555] mt-3 text-sm">Most downloaded question papers this month</p>
          </div>
          <Link to="/papers"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold hover:underline"
            style={{ color:'#04AA6D' }}>
            View All <ArrowRight size={15} />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {trending.map((p,i) => <PaperCard key={p.id} paper={p} index={i} />)}
        </div>

        <div className="text-center mt-8">
          <Link to="/papers" className="btn-primary">
            Browse All Papers <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
