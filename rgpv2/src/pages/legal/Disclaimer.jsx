import Breadcrumb from '../../components/layout/Breadcrumb.jsx'
import SEOHead from '../../components/ui/SEOHead.jsx'
import { Shield } from 'lucide-react'

export default function Disclaimer() {
  return (
    <>
      <SEOHead title="Disclaimer - RGPV Hub" url="/disclaimer" />
      <div className="min-h-screen pb-24 lg:pb-8" style={{ backgroundColor:'#f1f1f1' }}>
        <div style={{ backgroundColor:'#282A35' }} className="py-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <Breadcrumb />
            <h1 className="text-3xl font-bold text-white">Disclaimer</h1>
            <p className="text-sm mt-1" style={{ color:'rgba(255,255,255,0.5)' }}>Last updated: January 2025</p>
          </div>
        </div>
        <div className="h-1" style={{ backgroundColor:'#FF9800' }} />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex gap-3 p-5 rounded mb-6" style={{ backgroundColor:'#fff8e1', border:'2px solid #FF9800' }}>
            <Shield size={24} style={{ color:'#f57c00' }} className="flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="font-bold mb-2" style={{ color:'#e65100' }}>Important Disclaimer</h2>
              <p className="text-sm leading-relaxed" style={{ color:'#bf360c' }}>
                RGPV Hub is an <strong>independent student-help platform</strong> and is NOT affiliated with, endorsed by, or connected to Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV), Bhopal or any government body in any way.
              </p>
            </div>
          </div>

          <div className="w3-card p-8 space-y-6">
            {[
              { title:'Not Official',     text:'RGPV Hub is a student-run educational resource platform. We are not an official RGPV website. For official information, always refer to the RGPV official website at rgpv.ac.in.' },
              { title:'Content Accuracy', text:'While we strive to keep information accurate and up-to-date, we cannot guarantee the completeness or accuracy of all content. Question papers, notes, and other materials may contain errors. Always cross-verify important information.' },
              { title:'Copyright',        text:'We respect intellectual property rights. Content is shared for educational purposes under fair use. If you believe any content violates copyright, please contact us immediately for removal.' },
              { title:'Result Accuracy',  text:'We do not host RGPV results directly. We provide links to the official RGPV portal. We are not responsible for any discrepancy in results. Always verify your results from the official RGPV website.' },
              { title:'External Links',   text:'RGPV Hub contains links to external websites. We have no control over the nature, content, and availability of those sites. Inclusion of any links does not imply a recommendation or endorsement.' },
              { title:'Exam Preparation', text:'Guess papers and important questions provided are based on trend analysis and are NOT official predictions. Always study the complete syllabus. We are not responsible for any exam outcomes.' },
            ].map(item => (
              <section key={item.title}>
                <h2 className="font-semibold text-lg mb-3" style={{ color:'#282A35' }}>{item.title}</h2>
                <p className="text-sm leading-relaxed" style={{ color:'#555' }}>{item.text}</p>
              </section>
            ))}
            <div className="pt-4" style={{ borderTop:'1px solid #e0e0e0' }}>
              <p className="text-sm leading-relaxed" style={{ color:'#555' }}>
                By using RGPV Hub, you acknowledge that you have read, understood, and agree to this disclaimer. For questions, contact us via Instagram <strong style={{ color:'#04AA6D' }}>@k.z.987</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
