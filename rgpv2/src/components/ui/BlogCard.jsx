import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Eye, ArrowRight } from 'lucide-react'

const CAT_COLORS = {
  'Revaluation':    '#FF9800',
  'Admit Card':     '#2196F3',
  'Exam Form':      '#9c27b0',
  'Study Tips':     '#04AA6D',
  'Career Guidance':'#3F51B5',
  'Results':        '#f44336',
  'Exam Updates':   '#009688',
  'Placement':      '#607d8b',
}

const CAT_EMOJI = {
  'Study Tips':'📚','Revaluation':'📝','Admit Card':'🎫','Exam Form':'📋',
  'Career Guidance':'🎯','Results':'🏆','Exam Updates':'📢','Placement':'💼',
}

export default function BlogCard({ post, index = 0 }) {
  const color = CAT_COLORS[post.category] || '#04AA6D'
  const emoji = CAT_EMOJI[post.category] || '📰'

  return (
    <motion.article
      initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
      transition={{ duration:0.3, delay:index*0.06 }}
      className="bg-white rounded overflow-hidden group transition-all duration-200"
      style={{ border:'1px solid #d5d5d5', boxShadow:'0 1px 3px rgba(0,0,0,.08)' }}
      onMouseOver={e=>{ e.currentTarget.style.boxShadow='0 5px 15px rgba(0,0,0,.12)'; e.currentTarget.style.transform='translateY(-3px)' }}
      onMouseOut={e=>{  e.currentTarget.style.boxShadow='0 1px 3px rgba(0,0,0,.08)'; e.currentTarget.style.transform='translateY(0)' }}>

      {/* Thumbnail */}
      <div className="h-36 flex items-center justify-center relative overflow-hidden"
           style={{ backgroundColor: color + '12', borderBottom:`3px solid ${color}` }}>
        <span className="text-5xl opacity-40 select-none">{emoji}</span>
        <div className="absolute top-2.5 left-2.5">
          <span className="px-2 py-0.5 rounded text-xs font-semibold text-white"
                style={{ backgroundColor: color }}>{post.category}</span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-3 text-xs text-[#999] mb-2">
          <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
          <span className="flex items-center gap-1"><Eye size={11} /> {post.views?.toLocaleString()}</span>
          <span>{new Date(post.date).toLocaleDateString('en-IN',{day:'numeric',month:'short'})}</span>
        </div>

        <Link to={`/blog/${post.slug}`}>
          <h3 className="font-semibold text-sm text-[#282A35] leading-snug line-clamp-2 mb-2"
              style={{ ':hover':{ color } }}>
            {post.title}
          </h3>
        </Link>

        <p className="text-xs text-[#777] leading-relaxed line-clamp-2 mb-3">{post.excerpt}</p>

        <Link to={`/blog/${post.slug}`}
          className="flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all"
          style={{ color }}>
          Read More <ArrowRight size={12} />
        </Link>
      </div>
    </motion.article>
  )
}
