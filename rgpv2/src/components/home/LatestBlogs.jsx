import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Rss } from 'lucide-react'
import { useLang } from '../../context/LanguageContext.jsx'
import { BLOG_POSTS } from '../../data/index.js'
import BlogCard from '../ui/BlogCard.jsx'

export default function LatestBlogs() {
  const { t } = useLang()
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          className="flex items-end justify-between mb-10">
          <div>
            <h2 className="section-heading">
              <span className="flex items-center gap-2">
                <Rss size={22} style={{ color:'#04AA6D' }} /> {t('latest_articles')}
              </span>
            </h2>
            <p className="text-[#555] mt-3 text-sm">{t('latest_articles_sub')}</p>
          </div>
          <Link to="/blog" className="hidden sm:flex items-center gap-1 text-sm font-semibold hover:underline" style={{ color:'#04AA6D' }}>
            {t('all_articles')} <ArrowRight size={15} />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BLOG_POSTS.slice(0,4).map((p,i) => <BlogCard key={p.id} post={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}
