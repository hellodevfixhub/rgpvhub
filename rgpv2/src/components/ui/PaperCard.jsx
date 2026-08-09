import { motion } from 'framer-motion'
import { FileText, Download, Eye, Share2, Heart, TrendingUp } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import { downloadFile } from '../../lib/downloadHelper.js'
import toast from 'react-hot-toast'

export default function PaperCard({ paper, index = 0 }) {
  const { isFavorite, toggleFavorite, addDownload } = useAuth()
  const fav = isFavorite(paper.id, 'paper')

  const handleDownload = () => {
    if (paper.fileUrl) {
      addDownload({ ...paper, type:'paper' })
    }
    downloadFile(
      paper.fileUrl,
      `${paper.title.replace(/\s+/g, '_')}.pdf`,
      'Download started!',
      'Download file is not available yet.'
    )
  }
  const handleShare = async () => {
    try { await navigator.share({ title:paper.title, url:window.location.href }) }
    catch { await navigator.clipboard.writeText(window.location.href); toast.success('Link copied!') }
  }
  const handleFav = () => {
    toggleFavorite({ ...paper, type:'paper' })
    toast.success(fav ? 'Removed from saved' : 'Saved!')
  }

  return (
    <motion.div
      initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
      transition={{ duration:0.3, delay:index*0.05 }}
      className="bg-white rounded group transition-all duration-200"
      style={{ border:'1px solid #d5d5d5', borderLeft:'4px solid #04AA6D', boxShadow:'0 1px 3px rgba(0,0,0,.08)' }}
      onMouseOver={e=>{ e.currentTarget.style.boxShadow='0 4px 12px rgba(0,0,0,.12)'; e.currentTarget.style.transform='translateY(-2px)' }}
      onMouseOut={e=>{  e.currentTarget.style.boxShadow='0 1px 3px rgba(0,0,0,.08)'; e.currentTarget.style.transform='translateY(0)' }}>

      <div className="p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0"
               style={{ backgroundColor:'#e8f5f0' }}>
            <FileText size={20} style={{ color:'#04AA6D' }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-sm text-[#282A35] leading-snug line-clamp-2 group-hover:text-[#04AA6D] transition-colors">
                {paper.title}
              </h3>
              {paper.trending && (
                <span className="flex-shrink-0 flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold text-white"
                      style={{ backgroundColor:'#FF9800' }}>
                  <TrendingUp size={10} /> Hot
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1.5 text-xs text-[#777]">
              <span className="font-semibold" style={{ color:'#04AA6D' }}>
                {paper.branch==='all' ? 'All Branches' : paper.branch?.toUpperCase()}
              </span>
              <span>Sem {paper.semester}</span>
              <span>{paper.year}</span>
              <span>{paper.fileSize}</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-2">
              {paper.tags?.slice(0,3).map(t=>(
                <span key={t} className="px-2 py-0.5 rounded text-[10px] font-medium"
                      style={{ backgroundColor:'#f1f1f1', color:'#555', border:'1px solid #d5d5d5' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop:'1px solid #ebebeb' }}>
          <div className="flex items-center gap-3 text-xs text-[#999]">
            <span className="flex items-center gap-1"><Download size={11} /> {paper.downloads?.toLocaleString()}</span>
            <span className="flex items-center gap-1"><Eye size={11} /> {paper.views?.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={handleFav}
              className="p-1.5 rounded transition-colors"
              style={{ color: fav ? '#f44336' : '#aaa' }}
              onMouseOver={e=>e.currentTarget.style.color='#f44336'}
              onMouseOut={e=>e.currentTarget.style.color= fav ? '#f44336' : '#aaa'}>
              <Heart size={15} fill={fav ? 'currentColor' : 'none'} />
            </button>
            <button onClick={handleShare}
              className="p-1.5 rounded text-[#aaa] hover:text-[#555] transition-colors">
              <Share2 size={15} />
            </button>
            <button onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold text-white transition-all"
              style={{ backgroundColor:'#04AA6D' }}
              onMouseOver={e=>e.currentTarget.style.backgroundColor='#038a57'}
              onMouseOut={e=>e.currentTarget.style.backgroundColor='#04AA6D'}>
              <Download size={13} /> Download
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
