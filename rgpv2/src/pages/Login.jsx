import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { Mail, Lock, User, Eye, EyeOff, Chrome } from 'lucide-react'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { auth, googleProvider } from '../lib/firebase.js'
import SEOHead from '../components/ui/SEOHead.jsx'
import toast from 'react-hot-toast'

// Human-readable Firebase error messages
function friendlyError(code) {
  const map = {
    'auth/user-not-found':       'No account found with this email.',
    'auth/wrong-password':       'Incorrect password. Try again.',
    'auth/invalid-credential':   'Incorrect email or password.',
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/weak-password':        'Password must be at least 6 characters.',
    'auth/invalid-email':        'Please enter a valid email address.',
    'auth/too-many-requests':    'Too many attempts. Please wait a few minutes.',
    'auth/popup-closed-by-user': 'Sign-in popup was closed. Please try again.',
    'auth/network-request-failed': 'Network error. Check your connection.',
  }
  return map[code] || 'Something went wrong. Please try again.'
}

export default function Login() {
  const [tab,      setTab]      = useState('login')
  const [form,     setForm]     = useState({ name:'', email:'', password:'' })
  const [showPass, setShowPass] = useState(false)
  const [loading,  setLoading]  = useState(false)
  const navigate = useNavigate()

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  // ── Email / Password sign-in ──────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) return toast.error('Please fill all fields')
    setLoading(true)
    try {
      if (tab === 'login') {
        await signInWithEmailAndPassword(auth, form.email, form.password)
        toast.success('Welcome back!')
      } else {
        if (!form.name.trim()) return toast.error('Please enter your name')
        const cred = await createUserWithEmailAndPassword(auth, form.email, form.password)
        await updateProfile(cred.user, { displayName: form.name.trim() })
        toast.success('Account created! Welcome to RGPV Hub 🎉')
      }
      navigate('/dashboard')
    } catch (err) {
      toast.error(friendlyError(err.code))
    } finally {
      setLoading(false)
    }
  }

  // ── Google sign-in ────────────────────────────────────
  const handleGoogle = async () => {
    setLoading(true)
    try {
      await signInWithPopup(auth, googleProvider)
      toast.success('Signed in with Google!')
      navigate('/dashboard')
    } catch (err) {
      toast.error(friendlyError(err.code))
    } finally {
      setLoading(false)
    }
  }

  // ── Forgot password ───────────────────────────────────
  const handleForgotPassword = async () => {
    if (!form.email) return toast.error('Enter your email address first')
    try {
      await sendPasswordResetEmail(auth, form.email)
      toast.success('Password reset email sent! Check your inbox.')
    } catch (err) {
      toast.error(friendlyError(err.code))
    }
  }

  return (
    <>
      <SEOHead title="Login - RGPV Hub" description="Login to RGPV Hub to save papers, track downloads and personalize your experience." url="/login" />

      <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ backgroundColor:'#f1f1f1' }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          className="w-full max-w-md bg-white rounded shadow-w3 overflow-hidden">

          {/* Header */}
          <div className="py-6 px-8 text-center" style={{ backgroundColor:'#282A35' }}>
            <img src="/logo.png" alt="RGPV Hub" className="h-14 w-auto object-contain mx-auto mb-3" />
            <h1 className="text-white font-bold text-xl">Welcome to RGPV Hub</h1>
            <p className="text-sm mt-1" style={{ color:'rgba(255,255,255,0.55)' }}>Your complete academic companion</p>
          </div>

          <div className="p-8">
            {/* Tabs */}
            <div className="flex mb-6 rounded overflow-hidden" style={{ border:'1px solid #d5d5d5' }}>
              {['login','signup'].map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className="flex-1 py-2.5 text-sm font-semibold capitalize transition-all"
                  style={tab===t ? {backgroundColor:'#04AA6D',color:'#fff'} : {backgroundColor:'#fff',color:'#555'}}>
                  {t==='login' ? 'Sign In' : 'Sign Up'}
                </button>
              ))}
            </div>

            {/* Google */}
            <button onClick={handleGoogle} disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 rounded font-medium text-sm mb-4 transition-all disabled:opacity-60"
              style={{ border:'1px solid #d5d5d5', color:'#555', backgroundColor:'#fff' }}
              onMouseOver={e => { if (!loading) e.currentTarget.style.backgroundColor='#f5f5f5' }}
              onMouseOut={e => e.currentTarget.style.backgroundColor='#fff'}>
              <Chrome size={18} style={{ color:'#4285F4' }} />
              Continue with Google
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px" style={{ backgroundColor:'#e0e0e0' }} />
              <span className="text-xs" style={{ color:'#aaa' }}>or</span>
              <div className="flex-1 h-px" style={{ backgroundColor:'#e0e0e0' }} />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {tab === 'signup' && (
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color:'#aaa' }} />
                  <input type="text" value={form.name} onChange={set('name')}
                    placeholder="Full Name" className="w3-input pl-9" required />
                </div>
              )}

              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color:'#aaa' }} />
                <input type="email" value={form.email} onChange={set('email')}
                  placeholder="Email address" className="w3-input pl-9" required />
              </div>

              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color:'#aaa' }} />
                <input type={showPass ? 'text' : 'password'} value={form.password} onChange={set('password')}
                  placeholder="Password (min. 6 characters)" className="w3-input pl-9 pr-10" required minLength={6} />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color:'#aaa' }}>
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>

              {tab === 'login' && (
                <div className="flex justify-end">
                  <button type="button" onClick={handleForgotPassword}
                    className="text-xs hover:underline" style={{ color:'#04AA6D' }}>
                    Forgot password?
                  </button>
                </div>
              )}

              <button type="submit" disabled={loading}
                className="btn-primary w-full justify-center py-3 disabled:opacity-60">
                {loading
                  ? (tab==='login' ? 'Signing in…' : 'Creating account…')
                  : (tab==='login' ? 'Sign In' : 'Create Account')}
              </button>
            </form>

            <p className="text-center text-xs mt-6" style={{ color:'#aaa' }}>
              By continuing, you agree to our{' '}
              <Link to="/terms"   className="hover:underline" style={{ color:'#04AA6D' }}>Terms</Link> and{' '}
              <Link to="/privacy" className="hover:underline" style={{ color:'#04AA6D' }}>Privacy Policy</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  )
}
