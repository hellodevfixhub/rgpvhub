import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import MobileNav from './components/layout/MobileNav.jsx'
import { ScrollToTopOnNav } from './components/layout/ScrollToTop.jsx'
import ScrollToTopButton from './components/layout/ScrollToTop.jsx'

import Home from './pages/Home.jsx'
import Papers from './pages/Papers.jsx'
import Notes from './pages/Notes.jsx'
import Syllabus from './pages/Syllabus.jsx'
import Results from './pages/Results.jsx'
import TimeTable from './pages/TimeTable.jsx'
import GuessPapers from './pages/GuessPapers.jsx'
import Solutions from './pages/Solutions.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './pages/BlogPost.jsx'
import Tools from './pages/Tools.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Admin from './pages/Admin.jsx'
import Privacy from './pages/legal/Privacy.jsx'
import Terms from './pages/legal/Terms.jsx'
import Disclaimer from './pages/legal/Disclaimer.jsx'

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor:'#f1f1f1' }}>
      <div className="text-center">
        <div className="text-8xl font-black mb-4" style={{ color:'#04AA6D' }}>404</div>
        <h1 className="font-bold text-2xl mb-2" style={{ color:'#282A35' }}>Page Not Found</h1>
        <p className="mb-6" style={{ color:'#777' }}>The page you're looking for doesn't exist.</p>
        <a href="/" className="btn-primary inline-flex">Go Home</a>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <div className="min-h-screen flex flex-col" style={{ backgroundColor:'#f5f5f5' }}>
            <Header />
            <ScrollToTopOnNav />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/papers" element={<Papers />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/syllabus" element={<Syllabus />} />
                <Route path="/results" element={<Results />} />
                <Route path="/timetable" element={<TimeTable />} />
                <Route path="/guess-papers" element={<GuessPapers />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <MobileNav />
            <ScrollToTopButton />
          </div>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
