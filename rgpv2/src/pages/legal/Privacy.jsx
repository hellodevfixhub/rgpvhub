import Breadcrumb from '../../components/layout/Breadcrumb.jsx'
import SEOHead from '../../components/ui/SEOHead.jsx'

function Section({ title, children }) {
  return (
    <section>
      <h2 className="font-semibold text-lg mb-3" style={{ color:'#282A35' }}>{title}</h2>
      <p className="text-sm leading-relaxed" style={{ color:'#555' }}>{children}</p>
    </section>
  )
}

export default function Privacy() {
  return (
    <>
      <SEOHead title="Privacy Policy - RGPV Hub" url="/privacy" />
      <div className="min-h-screen pb-24 lg:pb-8" style={{ backgroundColor:'#f1f1f1' }}>
        <div style={{ backgroundColor:'#282A35' }} className="py-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <Breadcrumb />
            <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
            <p className="text-sm mt-1" style={{ color:'rgba(255,255,255,0.5)' }}>Last updated: August 2026</p>
          </div>
        </div>
        <div className="h-1" style={{ backgroundColor:'#04AA6D' }} />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <div className="w3-card p-8 space-y-6">
            <Section title="Introduction">
              RGPV Hub is committed to protecting your privacy. This policy explains what information we collect, how we use it, and your rights as a visitor to our website.
            </Section>

            <Section title="Information We Collect">
              We collect information you provide directly when you contact us or request resources, such as name and email address. We also collect technical data automatically, including browser type, device, pages visited, and interaction data.
            </Section>

            <Section title="How We Use Information">
              We use collected information to respond to your inquiries, improve the website, maintain site functionality, and provide a better user experience. We also use information to serve relevant ads through our advertising partners.
            </Section>

            <Section title="Cookies and Local Storage">
              We use cookies and local storage to remember your language, theme, and preferences, and to support site features. Cookies may also be used by third-party services such as Google to display contextual advertisements.
            </Section>

            <Section title="Google AdSense and Advertising">
              RGPV Hub uses Google AdSense to display ads. Google may collect anonymous information through cookies and similar technologies to provide personalized ads. Your interaction with these ads is governed by Google’s privacy policy.
            </Section>

            <Section title="Third-Party Links">
              Our site may include links to external websites, including RGPV’s official portal. These links are provided for convenience only. We are not responsible for the privacy practices or content of third-party websites.
            </Section>

            <Section title="Information Security">
              We use reasonable technical and organizational measures to protect your information. However, no internet transmission is completely secure, so we cannot guarantee absolute protection.
            </Section>

            <Section title="Data Retention">
              We retain personal information only as long as necessary to fulfill the purposes described in this policy, or as required by law.
            </Section>

            <Section title="Children’s Privacy">
              RGPV Hub is not intended for children under 13. We do not knowingly collect personal information from children under this age.
            </Section>

            <Section title="Changes to This Policy">
              We may update this privacy policy from time to time. The "Last updated" date at the top will reflect the latest version.
            </Section>

            <Section title="Contact Us">
              For privacy-related questions, please email us at <strong>contact@rgpvhub.in</strong> or use the Contact page on our site.
            </Section>
          </div>
        </div>
      </div>
    </>
  )
}
