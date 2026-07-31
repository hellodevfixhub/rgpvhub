import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { BLOG_POSTS, BLOG_CATEGORIES } from '../data/index.js'
import { getPosts } from '../lib/blogService.js'
import BlogCard from '../components/ui/BlogCard.jsx'
import Breadcrumb from '../components/layout/Breadcrumb.jsx'
import SEOHead from '../components/ui/SEOHead.jsx'
import { useLang } from '../context/LanguageContext.jsx'

export default function Blog() {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [firestorePosts, setFirestorePosts] = useState([])
  const { t } = useLang()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPosts()
      .then(setFirestorePosts)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // Merge: Firestore posts first, then static posts (skip duplicates by slug)
  const allPosts = useMemo(() => {
    const firestoreSlugs = new Set(firestorePosts.map(p => p.slug))
    const staticFiltered = BLOG_POSTS.filter(p => !firestoreSlugs.has(p.slug))
    return [...firestorePosts, ...staticFiltered]
  }, [firestorePosts])

  const filtered = useMemo(() => allPosts.filter(p => {
    const matchCat = category === 'All' || p.category === category
    const q = search.toLowerCase()
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
    return matchCat && matchSearch
  }), [allPosts, category, search])

  return (
    <>
      <SEOHead title="RGPV Blog - Exam Updates, Study Tips, Career Guidance"
        description="Stay updated with latest RGPV exam updates, study tips, career guidance, results information and more on the RGPV Hub blog."
        keywords="RGPV blog, RGPV exam updates, engineering career guidance, RGPV revaluation, admit card"
        url="/blog" />

      <div className="min-h-screen pb-24 lg:pb-8">
        <div style={{ backgroundColor: '#282A35' }} className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Breadcrumb />
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">
              RGPV Hub <span style={{ color: '#04AA6D' }}>{t('blog')}</span>
            </h1>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{t('blog_sub')}</p>
          </div>
        </div>
        <div className="h-1" style={{ backgroundColor: '#04AA6D' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Search */}
          <div className="relative mb-6 max-w-lg">
            <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#aaa' }} />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder={t('search_articles')} className="w3-input pl-10 py-3" />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#aaa' }}>
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-8">
            {BLOG_CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className="px-4 py-1.5 rounded text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-all"
                style={category === cat
                  ? { backgroundColor: '#282A35', color: '#fff' }
                  : { backgroundColor: '#f1f1f1', color: '#555', border: '1px solid #d5d5d5' }}>
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w3-card h-52 animate-pulse" style={{ backgroundColor: '#e8e8e8' }} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="font-semibold text-lg mb-2" style={{ color: '#282A35' }}>{t('no_articles_found')}</h3>
              <p className="text-sm" style={{ color: '#777' }}>{t('try_different_search')}</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold" style={{ color: '#282A35' }}>
                  {category === 'All' ? t('all_articles') : category}
                  <span className="font-normal text-sm ml-2" style={{ color: '#aaa' }}>({filtered.length})</span>
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((post, i) => <BlogCard key={post.id} post={post} index={i} />)}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
