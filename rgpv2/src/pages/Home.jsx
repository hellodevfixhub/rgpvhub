import SEOHead from '../components/ui/SEOHead.jsx'
import HeroSection from '../components/home/HeroSection.jsx'
import QuickAccess from '../components/home/QuickAccess.jsx'
import PopularDownloads from '../components/home/PopularDownloads.jsx'
import LatestUploads from '../components/home/LatestUploads.jsx'
import LatestBlogs from '../components/home/LatestBlogs.jsx'
import StudentTools from '../components/home/StudentTools.jsx'
import Testimonials from '../components/home/Testimonials.jsx'
import FAQ from '../components/home/FAQ.jsx'

const homeSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'RGPV Hub',
  description: 'Complete academic resource platform for RGPV students',
  url: 'https://rgpvhub.in',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://rgpvhub.in/papers?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

export default function Home() {
  return (
    <>
      <SEOHead
        title={null}
        description="Access 5000+ RGPV Previous Year Papers, Notes, Syllabus, Results, Guess Papers & Solutions. India's largest RGPV resource platform trusted by 2.5 lakh students."
        keywords="RGPV previous year papers, RGPV notes, RGPV syllabus, RGPV results, engineering notes PDF, RGPV question papers, RGPV guess papers"
        url="/"
        schema={homeSchema}
      />
      <HeroSection />
      <QuickAccess />
      <PopularDownloads />
      <LatestUploads />
      <LatestBlogs />
      <StudentTools />
      <Testimonials />
      <FAQ />
    </>
  )
}
