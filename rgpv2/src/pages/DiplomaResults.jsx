import { useState } from 'react'
import { ExternalLink, AlertCircle, CheckCircle } from 'lucide-react'
import Breadcrumb from '../components/layout/Breadcrumb.jsx'
import SEOHead from '../components/ui/SEOHead.jsx'

const DIPLOMA_OPTIONS = [
  { label: 'DIPLOMA (3 YEAR)', description: 'Regular diploma result for full-time students.', value: 'diploma-3-year' },
  { label: 'DIPLOMA (4 YEAR)', description: 'Regular 4-year diploma result.', value: 'diploma-4-year' },
  { label: 'DIPLOMA (4 YEAR PTDC)', description: 'Part-time diploma course result.', value: 'diploma-4-year-ptdc' },
  { label: 'Diploma 2 Year', description: 'Two-year diploma programme result.', value: 'diploma-2-year' },
  { label: 'Vocational Diploma 3 Year', description: 'Vocational diploma exam result.', value: 'vocational-diploma-3-year' },
  { label: 'Diploma MPECS', description: 'MPECS diploma exam result.', value: 'diploma-mpecs' },
]

const PHARMACY_OPTIONS = [
  { label: 'Diploma Pharmacy', description: 'Diploma Pharmacy examination result.', value: 'diploma-pharmacy' },
]

const REVALUATION_OPTIONS = [
  { label: 'Diploma Engg. Examination', description: 'Revaluation or challenge result for diploma engineering.', value: 'diploma-revaluation' },
]

export default function DiplomaResults() {
  const [selected, setSelected] = useState(DIPLOMA_OPTIONS[0].value)

  const goToPortal = () => {
    window.open('https://www.rgpv.ac.in', '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <SEOHead
        title="RGPV Diploma Result Options"
        description="Choose your RGPV Diploma result type and follow the official portal guidance to check your result."
        keywords="RGPV Diploma result, Polytechnic result, Diploma exam result"
        url="/results/diploma"
      />

      <div className="min-h-screen pb-24 lg:pb-8">
        <div style={{ backgroundColor: '#282A35' }} className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Breadcrumb extra={[{ label: 'Diploma Result' }]} />
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">
              RGPV <span style={{ color: '#04AA6D' }}>Diploma Result</span>
            </h1>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Choose your Polytechnic or Diploma result type before heading to the official RGPV portal.
            </p>
          </div>
        </div>
        <div className="h-1" style={{ backgroundColor: '#04AA6D' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex gap-3 p-4 rounded mb-6" style={{ backgroundColor: '#fff8e1', border: '1px solid #ffe082' }}>
            <AlertCircle size={20} style={{ color: '#f57c00' }} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm mb-1" style={{ color: '#e65100' }}>Important Notice</p>
              <p className="text-xs leading-relaxed" style={{ color: '#bf360c' }}>
                RGPV Hub does not host results directly. Select the correct diploma result type below and then open the official RGPV website to check your result.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-5">
              <div className="w3-card p-6">
                <h2 className="font-bold text-lg mb-5" style={{ color: '#282A35' }}>Diploma Result</h2>
                <div className="space-y-3">
                  {DIPLOMA_OPTIONS.map(option => (
                    <label key={option.value}
                      className="flex items-start gap-3 p-4 rounded cursor-pointer transition-all"
                      style={{
                        border: selected === option.value ? '2px solid #04AA6D' : '1px solid #e5e7eb',
                        backgroundColor: selected === option.value ? '#f0fdf4' : '#fff',
                      }}>
                      <input
                        type="radio"
                        name="diploma-result"
                        value={option.value}
                        checked={selected === option.value}
                        onChange={() => setSelected(option.value)}
                        className="mt-1.5"
                      />
                      <div>
                        <div className="font-semibold" style={{ color: '#282A35' }}>{option.label}</div>
                        <p className="text-xs leading-relaxed" style={{ color: '#555' }}>{option.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="w3-card p-6">
                <h2 className="font-bold text-lg mb-5" style={{ color: '#282A35' }}>Diploma Pharmacy Examination</h2>
                <div className="p-4 rounded border border-[#e5e7eb] bg-white">
                  {PHARMACY_OPTIONS.map(option => (
                    <label key={option.value} className="flex items-start gap-3 cursor-pointer">
                      <input type="radio" name="diploma-pharmacy" className="mt-1.5" />
                      <div>
                        <div className="font-semibold" style={{ color: '#282A35' }}>{option.label}</div>
                        <p className="text-xs leading-relaxed" style={{ color: '#555' }}>{option.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="w3-card p-6">
                <h2 className="font-bold text-lg mb-5" style={{ color: '#282A35' }}>Revaluation / Challenge Result</h2>
                <div className="p-4 rounded border border-[#e5e7eb] bg-white">
                  {REVALUATION_OPTIONS.map(option => (
                    <label key={option.value} className="flex items-start gap-3 cursor-pointer">
                      <input type="radio" name="diploma-revaluation" className="mt-1.5" />
                      <div>
                        <div className="font-semibold" style={{ color: '#282A35' }}>{option.label}</div>
                        <p className="text-xs leading-relaxed" style={{ color: '#555' }}>{option.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="w3-card p-5">
                <h3 className="font-semibold mb-3" style={{ color: '#282A35' }}>Next Step</h3>
                <p className="text-xs mb-4" style={{ color: '#555' }}>
                  We’ve highlighted the diploma result type you selected. Click the button below to visit the official result portal and choose the same exam type there.
                </p>
                <button onClick={goToPortal} className="btn-primary w-full justify-center text-sm">
                  Open Official RGPV Result Portal
                  <ExternalLink size={14} />
                </button>
              </div>

              <div className="p-5 rounded" style={{ backgroundColor: '#e8f5e9', border: '1px solid #c8e6c9' }}>
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle size={20} style={{ color: '#2e7d32' }} />
                  <h3 className="font-semibold" style={{ color: '#282A35' }}>Tip</h3>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: '#555' }}>
                  If you don’t see your exact option immediately on the RGPV portal, choose the closest diploma category and confirm your course details on the official site.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
