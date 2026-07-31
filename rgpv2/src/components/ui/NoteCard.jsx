import { motion } from 'framer-motion'
import { BookOpen, Download, Star, Heart } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import toast from 'react-hot-toast'

export default function NoteCard({ note, index = 0 }) {
  const { isFavorite, toggleFavorite, addDownload } = useAuth()
  const fav = isFavorite(note.id, 'note')

  const handleDownload = () => { addDownload({ ...note, type:'note' }); toast.success('Downloading...') }
  const handleFav = () => { toggleFavorite({ ...note, type:'note' }); toast.success(fav ? 'Removed' : 'Saved!') }

  return (
    <motion.div
      initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
      transition={{ duration:0.3, delay:index*0.05 }}
      className="bg-white rounded group transition-all duration-200"
      style={{ border:'1px solid #d5d5d5', borderLeft:'4px solid #2196F3', boxShadow:'0 1px 3px rgba(0,0,0,.08)' }}
      onMouseOver={e=>{ e.currentTarget.style.boxShadow='0 4px 12px rgba(0,0,0,.12)'; e.currentTarget.style.transform='translateY(-2px)' }}
      onMouseOut={e=>{  e.currentTarget.style.boxShadow='0 1px 3px rgba(0,0,0,.08)'; e.currentTarget.style.transform='translateY(0)' }}>

      <div className="p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0"
               style={{ backgroundColor:'#e8f0fb' }}>
            <BookOpen size={20} style={{ color:'#2196F3' }} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-[#282A35] leading-snug line-clamp-2 group-hover:text-[#2196F3] transition-colors">
              {note.title}
            </h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1.5 text-xs text-[#777]">
              <span className="font-semibold" style={{ color:'#2196F3' }}>
                {note.branch==='all' ? 'All Branches' : note.branch?.toUpperCase()}
              </span>
              <span>Sem {note.semester}</span>
              <span>{note.pages} pages</span>
              <span>{note.fileSize}</span>
            </div>
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_,j)=>(
                <Star key={j} size={11} fill={j < Math.floor(note.rating) ? '#FF9800' : 'none'}
                      style={{ color: j < Math.floor(note.rating) ? '#FF9800' : '#ccc' }} />
              ))}
              <span className="text-xs text-[#777] ml-1">{note.rating}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop:'1px solid #ebebeb' }}>
          <div className="flex items-center gap-1 text-xs text-[#999]">
            <Download size={11} /> {note.downloads?.toLocaleString()} downloads
          </div>
          <div className="flex items-center gap-1">
            <button onClick={handleFav} className="p-1.5 rounded transition-colors"
              style={{ color: fav ? '#f44336' : '#aaa' }}
              onMouseOver={e=>e.currentTarget.style.color='#f44336'}
              onMouseOut={e=>e.currentTarget.style.color= fav ? '#f44336' : '#aaa'}>
              <Heart size={15} fill={fav ? 'currentColor' : 'none'} />
            </button>
            <button onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold text-white transition-all"
              style={{ backgroundColor:'#2196F3' }}
              onMouseOver={e=>e.currentTarget.style.backgroundColor='#1976D2'}
              onMouseOut={e=>e.currentTarget.style.backgroundColor='#2196F3'}>
              <Download size={13} /> Download
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
