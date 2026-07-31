import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Upload, FileText, BookOpen, Rss, Users, BarChart3, TrendingUp,
  Download, Eye, Plus, Trash2, Edit, ArrowLeft, Save, X, Star,
} from 'lucide-react'
import { PAPERS, BLOG_CATEGORIES } from '../data/index.js'
import { getPosts, createPost, updatePost, deletePost } from '../lib/blogService.js'
import { uploadContent } from '../lib/uploadService.js'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../lib/firebase.js'
import SEOHead from '../components/ui/SEOHead.jsx'
import toast from 'react-hot-toast'

const TABS = [
  { id:'dashboard', icon:BarChart3, label:'Dashboard' },
  { id:'papers',    icon:FileText,  label:'Papers' },
  { id:'notes',     icon:BookOpen,  label:'Notes' },
  { id:'blog',      icon:Rss,       label:'Blog' },
  { id:'users',     icon:Users,     label:'Users' },
  { id:'upload',    icon:Upload,    label:'Upload' },
]

const CATS = BLOG_CATEGORIES.filter(c => c !== 'All')
const slugify = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const EMPTY_FORM = {
  title: '', slug: '', category: 'Study Tips', excerpt: '',
  tags: '', readTime: '5 min', featured: false, content: '',
}

function StatCard({ label, value, change, icon: Icon, color, bg }) {
  return (
    <div className="w3-card p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2.5 rounded" style={{ backgroundColor: bg }}><Icon size={20} style={{ color }} /></div>
        <span className="text-xs font-medium" style={{ color: '#4caf50' }}>+{change}%</span>
      </div>
      <div className="text-2xl font-black mb-1" style={{ color: '#282A35' }}>{value}</div>
      <div className="text-xs" style={{ color: '#777' }}>{label}</div>
    </div>
  )
}

export default function Admin() {
  const [tab, setTab] = useState('dashboard')
  const [uploadForm,     setUploadForm]     = useState({ type: 'paper', title: '', branch: '', semester: '', year: '', file: null })
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploading,      setUploading]      = useState(false)

  // ── Users state ───────────────────────────────────────
  const [siteUsers,    setSiteUsers]    = useState([])
  const [usersLoading, setUsersLoading] = useState(false)

  const loadUsers = async () => {
    setUsersLoading(true)
    try {
      const q = query(collection(db, 'users'), orderBy('lastSeen', 'desc'))
      const snap = await getDocs(q)
      setSiteUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    } catch {
      toast.error('Could not load users')
    } finally {
      setUsersLoading(false)
    }
  }

  useEffect(() => {
    if (tab === 'users') loadUsers()
  }, [tab])

  // ── Blog state ────────────────────────────────────────
  const [blogView,      setBlogView]      = useState('list')
  const [firestorePosts, setFirestorePosts] = useState([])
  const [blogLoading,   setBlogLoading]   = useState(false)
  const [blogSaving,    setBlogSaving]    = useState(false)
  const [editId,        setEditId]        = useState(null)
  const [blogForm,      setBlogForm]      = useState(EMPTY_FORM)

  // field setter — auto-slugifies title for new posts
  const setB = (field) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setBlogForm(f => ({
      ...f,
      [field]: val,
      ...(field === 'title' && !editId ? { slug: slugify(val) } : {}),
    }))
  }

  const loadPosts = async () => {
    setBlogLoading(true)
    try {
      setFirestorePosts(await getPosts())
    } catch {
      toast.error('Could not load posts — check Firestore rules')
    } finally {
      setBlogLoading(false)
    }
  }

  useEffect(() => {
    if (tab === 'blog') loadPosts()
  }, [tab])

  const openEditor = (post = null) => {
    if (post) {
      setEditId(post.id)
      setBlogForm({
        title:    post.title,
        slug:     post.slug,
        category: post.category,
        excerpt:  post.excerpt,
        tags:     Array.isArray(post.tags) ? post.tags.join(', ') : '',
        readTime: post.readTime || '5 min',
        featured: post.featured || false,
        content:  post.content || '',
      })
    } else {
      setEditId(null)
      setBlogForm(EMPTY_FORM)
    }
    setBlogView('editor')
  }

  const saveBlogPost = async () => {
    if (!blogForm.title.trim())   return toast.error('Title is required')
    if (!blogForm.excerpt.trim()) return toast.error('Excerpt is required')
    if (!blogForm.content.trim()) return toast.error('Content is required')
    setBlogSaving(true)
    try {
      const data = {
        title:    blogForm.title.trim(),
        slug:     (blogForm.slug.trim() || slugify(blogForm.title)).replace(/^-|-$/g, ''),
        category: blogForm.category,
        excerpt:  blogForm.excerpt.trim(),
        tags:     blogForm.tags.split(',').map(t => t.trim()).filter(Boolean),
        readTime: blogForm.readTime || '5 min',
        featured: blogForm.featured,
        content:  blogForm.content.trim(),
        author:   'RGPV Hub Admin',
        date:     new Date().toISOString().split('T')[0],
      }
      if (editId) {
        await updatePost(editId, data)
        toast.success('Post updated!')
      } else {
        await createPost(data)
        toast.success('Post published!')
      }
      setBlogView('list')
      loadPosts()
    } catch (err) {
      toast.error('Save failed: ' + (err.message || 'unknown error'))
    } finally {
      setBlogSaving(false)
    }
  }

  const deleteBlogPost = async (id) => {
    if (!window.confirm('Delete this post permanently?')) return
    try {
      await deletePost(id)
      setFirestorePosts(prev => prev.filter(p => p.id !== id))
      toast.success('Post deleted')
    } catch {
      toast.error('Delete failed')
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!uploadForm.file)  return toast.error('Please select a file')
    if (!uploadForm.title) return toast.error('Title is required')
    if (uploadForm.type === 'blog') { setTab('blog'); return }
    setUploading(true)
    setUploadProgress(0)
    try {
      await uploadContent(uploadForm.file, uploadForm, setUploadProgress)
      toast.success(`${uploadForm.type === 'paper' ? 'Paper' : 'Note'} uploaded successfully!`)
      setUploadForm({ type: uploadForm.type, title: '', branch: '', semester: '', year: '', file: null })
      setUploadProgress(0)
    } catch (err) {
      toast.error('Upload failed: ' + (err.message || 'Unknown error'))
    } finally {
      setUploading(false)
    }
  }

  return (
    <>
      <SEOHead title="Admin Panel - RGPV Hub" url="/admin" />

      <div className="min-h-screen pb-10" style={{ backgroundColor: '#f1f1f1' }}>
        <div style={{ backgroundColor: '#282A35' }} className="py-4 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-white font-bold">Admin Panel</h1>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Manage content and site updates</p>
            </div>
            <span className="px-3 py-1 rounded text-xs font-semibold text-white" style={{ backgroundColor: '#04AA6D' }}>Admin</span>
          </div>
        </div>
        <div className="h-1" style={{ backgroundColor: '#04AA6D' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col lg:flex-row gap-6">

            {/* Sidebar */}
            <div className="lg:w-52 flex-shrink-0">
              <div className="bg-white rounded shadow-w3 p-2 sticky top-4">
                {TABS.map(t => (
                  <button key={t.id} onClick={() => { setTab(t.id); setBlogView('list') }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium mb-0.5 transition-all text-left"
                    style={tab === t.id ? { backgroundColor: '#04AA6D', color: '#fff' } : { color: '#555' }}
                    onMouseOver={e => { if (tab !== t.id) e.currentTarget.style.backgroundColor = '#f5f5f5' }}
                    onMouseOut={e => { if (tab !== t.id) e.currentTarget.style.backgroundColor = 'transparent' }}>
                    <t.icon size={16} /> {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0">

              {/* ── Dashboard ── */}
              {tab === 'dashboard' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h2 className="font-bold text-xl" style={{ color: '#282A35' }}>Dashboard Overview</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard label="Total Downloads" value="1.5M+" change="12" icon={Download} color="#04AA6D" bg="#e8f5f0" />
                    <StatCard label="Active Users"    value="2.5L+" change="8"  icon={Users}    color="#2196F3" bg="#e3f2fd" />
                    <StatCard label="Papers"          value="5,000+" change="3" icon={FileText}  color="#FF9800" bg="#fff8e1" />
                    <StatCard label="Monthly Views"   value="4.2M"  change="15" icon={Eye}       color="#9c27b0" bg="#f3e5f5" />
                  </div>
                  <div className="w3-card p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2" style={{ color: '#282A35' }}>
                      <TrendingUp size={16} style={{ color: '#04AA6D' }} /> Recent Uploads
                    </h3>
                    <div className="space-y-1">
                      {PAPERS.slice(0, 5).map(p => (
                        <div key={p.id} className="flex items-center gap-3 p-3 rounded transition-all"
                          onMouseOver={e => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                          onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#04AA6D' }} />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate" style={{ color: '#282A35' }}>{p.title}</div>
                            <div className="text-xs" style={{ color: '#aaa' }}>{p.branch?.toUpperCase()} · Sem {p.semester} · {p.year}</div>
                          </div>
                          <div className="flex items-center gap-1 text-xs" style={{ color: '#aaa' }}>
                            <Download size={11} /> {p.downloads?.toLocaleString()}
                          </div>
                          <div className="flex gap-1">
                            <button className="p-1.5 rounded" style={{ color: '#aaa' }}
                              onMouseOver={e => e.currentTarget.style.color = '#04AA6D'}
                              onMouseOut={e => e.currentTarget.style.color = '#aaa'}><Edit size={13} /></button>
                            <button className="p-1.5 rounded" style={{ color: '#aaa' }}
                              onMouseOver={e => e.currentTarget.style.color = '#f44336'}
                              onMouseOut={e => e.currentTarget.style.color = '#aaa'}><Trash2 size={13} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── Papers ── */}
              {tab === 'papers' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-xl" style={{ color: '#282A35' }}>Manage Papers</h2>
                    <button onClick={() => setTab('upload')} className="btn-primary text-sm flex items-center gap-1"><Plus size={14} /> Upload Paper</button>
                  </div>
                  {PAPERS.map(p => (
                    <div key={p.id} className="w3-card p-4 flex items-center gap-4">
                      <div className="p-2.5 rounded" style={{ backgroundColor: '#e8f5f0' }}><FileText size={18} style={{ color: '#04AA6D' }} /></div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate" style={{ color: '#282A35' }}>{p.title}</div>
                        <div className="text-xs" style={{ color: '#aaa' }}>{p.branch?.toUpperCase()} · Sem {p.semester} · {p.year}</div>
                      </div>
                      <div className="text-xs" style={{ color: '#aaa' }}>{p.downloads?.toLocaleString()} dl</div>
                      <div className="flex gap-2">
                        <button className="p-2 rounded" style={{ color: '#aaa' }}
                          onMouseOver={e => e.currentTarget.style.color = '#04AA6D'}
                          onMouseOut={e => e.currentTarget.style.color = '#aaa'}><Edit size={14} /></button>
                        <button className="p-2 rounded" style={{ color: '#aaa' }}
                          onMouseOver={e => e.currentTarget.style.color = '#f44336'}
                          onMouseOut={e => e.currentTarget.style.color = '#aaa'}><Trash2 size={14} /></button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* ── Notes ── */}
              {tab === 'notes' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="font-bold text-xl mb-4" style={{ color: '#282A35' }}>Manage Notes</h2>
                  <div className="w3-card p-8 text-center">
                    <BookOpen size={36} className="mx-auto mb-3" style={{ color: '#ddd' }} />
                    <p style={{ color: '#777' }}>Notes management coming soon.</p>
                  </div>
                </motion.div>
              )}

              {/* ── Blog ── */}
              {tab === 'blog' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

                  {/* LIST VIEW */}
                  {blogView === 'list' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="font-bold text-xl" style={{ color: '#282A35' }}>
                          Blog Posts
                          <span className="ml-2 text-sm font-normal" style={{ color: '#aaa' }}>
                            ({firestorePosts.length} published)
                          </span>
                        </h2>
                        <button onClick={() => openEditor()} className="btn-primary text-sm flex items-center gap-1.5">
                          <Plus size={14} /> New Post
                        </button>
                      </div>

                      {blogLoading ? (
                        <div className="w3-card p-10 text-center">
                          <div className="text-sm" style={{ color: '#aaa' }}>Loading posts…</div>
                        </div>
                      ) : firestorePosts.length === 0 ? (
                        <div className="w3-card p-10 text-center">
                          <Rss size={40} className="mx-auto mb-3" style={{ color: '#ddd' }} />
                          <p className="font-medium mb-1" style={{ color: '#555' }}>No blog posts yet</p>
                          <p className="text-sm mb-4" style={{ color: '#aaa' }}>Click "New Post" to write your first article.</p>
                          <button onClick={() => openEditor()} className="btn-primary inline-flex items-center gap-1.5">
                            <Plus size={14} /> Write First Post
                          </button>
                        </div>
                      ) : (
                        firestorePosts.map(post => (
                          <div key={post.id} className="w3-card p-4 flex items-start gap-4">
                            <div className="p-2.5 rounded mt-0.5 flex-shrink-0" style={{ backgroundColor: '#e3f2fd' }}>
                              <Rss size={18} style={{ color: '#2196F3' }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-medium text-sm" style={{ color: '#282A35' }}>{post.title}</span>
                                {post.featured && <Star size={12} fill="#FF9800" style={{ color: '#FF9800' }} />}
                                <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: '#e8f5f0', color: '#04AA6D' }}>
                                  {post.category}
                                </span>
                              </div>
                              <div className="text-xs mt-0.5" style={{ color: '#aaa' }}>
                                {post.date} · {post.readTime} · by {post.author}
                              </div>
                              <p className="text-xs mt-1 line-clamp-1" style={{ color: '#777' }}>{post.excerpt}</p>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                              <button onClick={() => openEditor(post)} className="p-2 rounded" style={{ color: '#aaa' }}
                                onMouseOver={e => e.currentTarget.style.color = '#04AA6D'}
                                onMouseOut={e => e.currentTarget.style.color = '#aaa'}>
                                <Edit size={14} />
                              </button>
                              <button onClick={() => deleteBlogPost(post.id)} className="p-2 rounded" style={{ color: '#aaa' }}
                                onMouseOver={e => e.currentTarget.style.color = '#f44336'}
                                onMouseOut={e => e.currentTarget.style.color = '#aaa'}>
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* EDITOR VIEW */}
                  {blogView === 'editor' && (
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <button onClick={() => setBlogView('list')} className="p-2 rounded transition-all" style={{ color: '#555' }}
                          onMouseOver={e => e.currentTarget.style.color = '#282A35'}
                          onMouseOut={e => e.currentTarget.style.color = '#555'}>
                          <ArrowLeft size={18} />
                        </button>
                        <h2 className="font-bold text-xl" style={{ color: '#282A35' }}>
                          {editId ? 'Edit Post' : 'New Blog Post'}
                        </h2>
                      </div>

                      <div className="space-y-4">

                        {/* Title + Slug */}
                        <div className="w3-card p-5 space-y-4">
                          <div>
                            <label className="text-xs font-semibold block mb-1.5" style={{ color: '#555' }}>Title *</label>
                            <input type="text" value={blogForm.title} onChange={setB('title')}
                              placeholder="e.g. How to Score 9+ CGPA in RGPV"
                              className="w3-input text-base" />
                          </div>
                          <div>
                            <label className="text-xs font-semibold block mb-1.5" style={{ color: '#555' }}>URL Slug</label>
                            <div className="flex items-center rounded overflow-hidden" style={{ border: '1px solid #d5d5d5' }}>
                              <span className="px-3 py-2.5 text-xs border-r flex-shrink-0" style={{ backgroundColor: '#f5f5f5', color: '#aaa', borderColor: '#d5d5d5' }}>
                                /blog/
                              </span>
                              <input type="text" value={blogForm.slug} onChange={setB('slug')}
                                placeholder="url-slug-here"
                                className="flex-1 px-3 py-2.5 text-sm font-mono outline-none" style={{ border: 'none' }} />
                            </div>
                          </div>
                        </div>

                        {/* Meta row */}
                        <div className="w3-card p-5 grid sm:grid-cols-3 gap-4">
                          <div>
                            <label className="text-xs font-semibold block mb-1.5" style={{ color: '#555' }}>Category *</label>
                            <select value={blogForm.category} onChange={setB('category')} className="w3-input text-sm">
                              {CATS.map(c => <option key={c}>{c}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="text-xs font-semibold block mb-1.5" style={{ color: '#555' }}>Read Time</label>
                            <input type="text" value={blogForm.readTime} onChange={setB('readTime')}
                              placeholder="5 min" className="w3-input text-sm" />
                          </div>
                          <div>
                            <label className="text-xs font-semibold block mb-1.5" style={{ color: '#555' }}>Tags (comma separated)</label>
                            <input type="text" value={blogForm.tags} onChange={setB('tags')}
                              placeholder="rgpv, exam, tips" className="w3-input text-sm" />
                          </div>
                        </div>

                        {/* Featured */}
                        <div className="w3-card p-4 flex items-center gap-3">
                          <input type="checkbox" id="featured-chk" checked={blogForm.featured} onChange={setB('featured')}
                            className="w-4 h-4 cursor-pointer" style={{ accentColor: '#04AA6D' }} />
                          <label htmlFor="featured-chk" className="text-sm font-medium cursor-pointer" style={{ color: '#555' }}>
                            Mark as Featured post
                          </label>
                          <Star size={14} fill={blogForm.featured ? '#FF9800' : 'none'} style={{ color: blogForm.featured ? '#FF9800' : '#ddd' }} />
                        </div>

                        {/* Excerpt */}
                        <div className="w3-card p-5">
                          <label className="text-xs font-semibold block mb-1.5" style={{ color: '#555' }}>
                            Excerpt * <span className="font-normal" style={{ color: '#aaa' }}>(shown on blog listing — 2-3 sentences)</span>
                          </label>
                          <textarea value={blogForm.excerpt} onChange={setB('excerpt')} rows={3}
                            placeholder="Brief description of what this article covers..."
                            className="w3-input resize-none text-sm" />
                        </div>

                        {/* Content */}
                        <div className="w3-card p-5">
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs font-semibold" style={{ color: '#555' }}>
                              Content * <span className="font-normal" style={{ color: '#aaa' }}>(Markdown supported)</span>
                            </label>
                            <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#f5f5f5', color: '#777', fontFamily: 'monospace' }}>
                              ## H2 &nbsp;### H3 &nbsp;- list &nbsp;**bold**
                            </span>
                          </div>
                          <textarea value={blogForm.content} onChange={setB('content')} rows={22}
                            placeholder={`## Introduction\nWrite your article content here...\n\n## Section 1\nExplain the topic...\n\n- Point one\n- Point two\n- Point three\n\n## Conclusion\nSummarize here.`}
                            className="w3-input resize-y text-sm leading-relaxed"
                            style={{ fontFamily: 'monospace' }} />
                          <div className="flex justify-between mt-2">
                            <span className="text-xs" style={{ color: '#aaa' }}>
                              {blogForm.content.length} characters · {blogForm.content.split(/\s+/).filter(Boolean).length} words
                            </span>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-3 pb-4">
                          <button onClick={saveBlogPost} disabled={blogSaving}
                            className="btn-primary flex items-center gap-2 disabled:opacity-60">
                            <Save size={15} />
                            {blogSaving ? 'Saving…' : (editId ? 'Update Post' : 'Publish Post')}
                          </button>
                          <button onClick={() => setBlogView('list')}
                            className="flex items-center gap-2 px-5 py-2.5 rounded font-medium text-sm transition-all"
                            style={{ border: '1px solid #d5d5d5', color: '#555', backgroundColor: '#fff' }}
                            onMouseOver={e => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                            onMouseOut={e => e.currentTarget.style.backgroundColor = '#fff'}>
                            <X size={15} /> Cancel
                          </button>
                        </div>

                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* ── Users ── */}
              {tab === 'users' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-xl" style={{ color: '#282A35' }}>
                      Registered Users
                      <span className="ml-2 text-sm font-normal" style={{ color: '#aaa' }}>({siteUsers.length} total)</span>
                    </h2>
                    <button onClick={loadUsers} className="text-sm px-3 py-1.5 rounded transition-all"
                      style={{ border: '1px solid #d5d5d5', color: '#555' }}
                      onMouseOver={e => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                      onMouseOut={e => e.currentTarget.style.backgroundColor = '#fff'}>
                      Refresh
                    </button>
                  </div>

                  {usersLoading ? (
                    <div className="w3-card p-10 text-center">
                      <div className="text-sm" style={{ color: '#aaa' }}>Loading users…</div>
                    </div>
                  ) : siteUsers.length === 0 ? (
                    <div className="w3-card p-10 text-center">
                      <Users size={40} className="mx-auto mb-3" style={{ color: '#ddd' }} />
                      <p style={{ color: '#777' }}>No users yet. Users appear here when they sign up or log in.</p>
                    </div>
                  ) : (
                    <div className="w3-card overflow-hidden">
                      {/* Table header */}
                      <div className="grid grid-cols-12 gap-3 px-4 py-2.5 text-xs font-semibold uppercase"
                        style={{ backgroundColor: '#f5f5f5', color: '#888', borderBottom: '1px solid #e0e0e0' }}>
                        <div className="col-span-5">User</div>
                        <div className="col-span-3">Provider</div>
                        <div className="col-span-4">Joined</div>
                      </div>
                      {/* Rows */}
                      {siteUsers.map((u, i) => (
                        <div key={u.id}
                          className="grid grid-cols-12 gap-3 px-4 py-3 items-center transition-all"
                          style={{ borderBottom: i < siteUsers.length - 1 ? '1px solid #f0f0f0' : 'none' }}
                          onMouseOver={e => e.currentTarget.style.backgroundColor = '#fafafa'}
                          onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                          {/* User info */}
                          <div className="col-span-5 flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
                              style={{ backgroundColor: u.provider === 'google.com' ? '#4285F4' : '#04AA6D' }}>
                              {u.avatar?.length === 1 ? u.avatar : u.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-medium truncate" style={{ color: '#282A35' }}>{u.name}</div>
                              <div className="text-xs truncate" style={{ color: '#aaa' }}>{u.email}</div>
                            </div>
                          </div>
                          {/* Provider */}
                          <div className="col-span-3">
                            <span className="text-xs px-2 py-1 rounded font-medium"
                              style={u.provider === 'google.com'
                                ? { backgroundColor: '#e3f2fd', color: '#1976d2' }
                                : { backgroundColor: '#e8f5f0', color: '#2e7d32' }}>
                              {u.provider === 'google.com' ? 'Google' : 'Email'}
                            </span>
                          </div>
                          {/* Joined */}
                          <div className="col-span-4 text-xs" style={{ color: '#aaa' }}>
                            {u.joinedAt ? new Date(u.joinedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* ── Upload ── */}
              {tab === 'upload' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="font-bold text-xl mb-6" style={{ color: '#282A35' }}>Upload Content</h2>
                  <form onSubmit={handleUpload} className="w3-card p-6 space-y-5 max-w-lg">
                    <div>
                      <label className="text-xs mb-2 block font-medium" style={{ color: '#555' }}>Content Type</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['paper', 'note', 'blog'].map(type => (
                          <button key={type} type="button" onClick={() => setUploadForm({ ...uploadForm, type })}
                            className="py-2.5 rounded text-sm font-medium capitalize transition-all"
                            style={uploadForm.type === type
                              ? { backgroundColor: '#04AA6D', color: '#fff', border: '1px solid #04AA6D' }
                              : { border: '1px solid #d5d5d5', color: '#555' }}>
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs mb-2 block font-medium" style={{ color: '#555' }}>Title *</label>
                      <input type="text" value={uploadForm.title}
                        onChange={e => setUploadForm({ ...uploadForm, title: e.target.value })}
                        placeholder="Enter title..." className="w3-input" required />
                    </div>
                    {uploadForm.type !== 'blog' && (
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { label: 'Branch', field: 'branch', placeholder: 'CSE', type: 'text' },
                          { label: 'Semester', field: 'semester', placeholder: '1-8', type: 'number' },
                          { label: 'Year', field: 'year', placeholder: '2024', type: 'text' },
                        ].map(f => (
                          <div key={f.field}>
                            <label className="text-xs mb-2 block font-medium" style={{ color: '#555' }}>{f.label}</label>
                            <input type={f.type} min={f.type === 'number' ? 1 : undefined} max={f.type === 'number' ? 8 : undefined}
                              value={uploadForm[f.field]}
                              onChange={e => setUploadForm({ ...uploadForm, [f.field]: e.target.value })}
                              placeholder={f.placeholder} className="w3-input text-sm" />
                          </div>
                        ))}
                      </div>
                    )}
                    <div>
                      <label className="text-xs mb-2 block font-medium" style={{ color: '#555' }}>Upload File</label>
                      <div className="relative rounded p-8 text-center cursor-pointer transition-all"
                        style={{ border: '2px dashed #d5d5d5' }}
                        onMouseOver={e => e.currentTarget.style.borderColor = '#04AA6D'}
                        onMouseOut={e => e.currentTarget.style.borderColor = '#d5d5d5'}>
                        <Upload size={24} className="mx-auto mb-2" style={{ color: '#aaa' }} />
                        <p className="text-sm" style={{ color: '#777' }}>Click to upload or drag & drop</p>
                        <p className="text-xs mt-1" style={{ color: '#aaa' }}>PDF, DOC, PPT — Max 50MB</p>
                        <input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx"
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          onChange={e => setUploadForm({ ...uploadForm, file: e.target.files[0] })} />
                      </div>
                      {uploadForm.file && <p className="text-xs mt-2" style={{ color: '#04AA6D' }}>✓ {uploadForm.file.name} ({(uploadForm.file.size / 1024 / 1024).toFixed(1)} MB)</p>}
                    </div>

                    {/* Progress bar */}
                    {uploading && (
                      <div>
                        <div className="flex justify-between text-xs mb-1" style={{ color: '#555' }}>
                          <span>Uploading…</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <div className="h-2 rounded overflow-hidden" style={{ backgroundColor: '#e0e0e0' }}>
                          <div className="h-full rounded transition-all" style={{ width: `${uploadProgress}%`, backgroundColor: '#04AA6D' }} />
                        </div>
                      </div>
                    )}

                    <button type="submit" disabled={uploading}
                      className="btn-primary w-full justify-center flex items-center gap-2 disabled:opacity-60">
                      <Upload size={15} /> {uploading ? `Uploading ${uploadProgress}%…` : 'Upload Content'}
                    </button>
                  </form>
                </motion.div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
