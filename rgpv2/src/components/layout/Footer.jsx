import { Link } from 'react-router-dom'
import { Instagram, MessageCircle, Mail, ExternalLink } from 'lucide-react'

const COLS = {
  'Resources': [
    ['/papers',       'Previous Year Papers'],
    ['/notes',        'Study Notes'],
    ['/syllabus',     'Syllabus'],
    ['/guess-papers', 'Guess Papers'],
    ['/solutions',    'PYQ Solutions'],
  ],
  'Quick Links': [
    ['/results',    'RGPV Results'],
    ['/timetable',  'Time Table'],
    ['/blog',       'Blog'],
    ['/tools',      'Student Tools'],
    ['/dashboard',  'My Dashboard'],
  ],
  'Tools': [
    ['/tools#cgpa',       'CGPA Calculator'],
    ['/tools#sgpa',       'SGPA Calculator'],
    ['/tools#attendance', 'Attendance Calc'],
    ['/tools#percentage', 'Percentage Calc'],
  ],
  'Company': [
    ['/about',      'About Us'],
    ['/contact',    'Contact Us'],
    ['/privacy',    'Privacy Policy'],
    ['/disclaimer', 'Disclaimer'],
    ['/terms',      'Terms & Conditions'],
  ],
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#282A35', color: '#ccc' }} className="pt-12 pb-24 lg:pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <img src="/logo.png" alt="RGPV Hub" className="h-12 w-auto object-contain" />
            </Link>
            <p className="text-sm leading-relaxed mb-5 text-white/60 max-w-xs">
              One Platform for Notes, PYQs, Results, Syllabus & Student Success. Serving 2,50,000+ RGPV students across India.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram,      href:'https://instagram.com/k.z.987', label:'Instagram' },
                { icon: MessageCircle,  href:'#',                             label:'WhatsApp' },
                { icon: Mail,           href:'mailto:contact@rgpvhub.in',      label:'Email' },
              ].map(s=>(
                <a key={s.label} href={s.href}
                   target={s.href.startsWith('http')?'_blank':undefined}
                   rel="noopener noreferrer" aria-label={s.label}
                   className="w-9 h-9 rounded border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-[#04AA6D] transition-all">
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(COLS).map(([sec,links])=>(
            <div key={sec}>
              <h4 className="text-white font-semibold text-sm mb-4" style={{ borderBottom:'2px solid #04AA6D', paddingBottom:'6px', display:'inline-block' }}>
                {sec}
              </h4>
              <ul className="space-y-2 mt-3">
                {links.map(([href,label])=>(
                  <li key={href}>
                    <Link to={href} className="text-white/55 hover:text-[#04AA6D] text-sm transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="rounded p-4 mb-6" style={{ backgroundColor:'rgba(255,152,0,0.1)', border:'1px solid rgba(255,152,0,0.3)' }}>
          <p className="text-xs leading-relaxed" style={{ color:'#FFB74D' }}>
            <strong>Disclaimer:</strong> RGPV Hub is an independent student-help platform and is NOT affiliated with, endorsed by, or connected to Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV), Bhopal. All content is provided for educational purposes only.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 border-t border-white/10 text-xs text-white/40">
          <p>© {new Date().getFullYear()} RGPV Hub · Made for RGPV students</p>
          <div className="flex items-center gap-4">
            {[['/privacy','Privacy'],['/terms','Terms'],['/disclaimer','Disclaimer']].map(([h,l])=>(
              <Link key={h} to={h} className="hover:text-[#04AA6D] transition-colors">{l}</Link>
            ))}
            <a href="https://rgpv.ac.in" target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-1 hover:text-[#04AA6D] transition-colors">
              RGPV Official <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
