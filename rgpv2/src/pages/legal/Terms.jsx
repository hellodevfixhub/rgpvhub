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

export default function Terms() {
  return (
    <>
      <SEOHead title="Terms & Conditions - RGPV Hub" url="/terms" />
      <div className="min-h-screen pb-24 lg:pb-8" style={{ backgroundColor:'#f1f1f1' }}>
        <div style={{ backgroundColor:'#282A35' }} className="py-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <Breadcrumb />
            <h1 className="text-3xl font-bold text-white">Terms &amp; Conditions</h1>
            <p className="text-sm mt-1" style={{ color:'rgba(255,255,255,0.5)' }}>Last updated: January 2025</p>
          </div>
        </div>
        <div className="h-1" style={{ backgroundColor:'#04AA6D' }} />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <div className="w3-card p-8 space-y-6">
            <Section title="1. Acceptance of Terms">
              By accessing and using RGPV Hub, you accept and agree to be bound by these Terms and Conditions. If you disagree with any part, you may not use our service.
            </Section>
            <Section title="2. Educational Purpose">
              All content on RGPV Hub is provided for educational purposes only. We do not claim ownership of any official RGPV materials. Content is shared under fair use for educational benefit.
            </Section>
            <Section title="3. User Accounts">
              You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account.
            </Section>
            <Section title="4. Prohibited Uses">
              You may not: use the service for any unlawful purpose, upload malicious content, attempt to gain unauthorized access, or redistribute our content for commercial purposes.
            </Section>
            <Section title="5. Disclaimer of Warranties">
              RGPV Hub is provided "as is" without any warranties. We do not guarantee the accuracy, completeness, or usefulness of any content. Always verify important information from official RGPV sources.
            </Section>
            <Section title="6. Limitation of Liability">
              RGPV Hub shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of or inability to use the service.
            </Section>
            <Section title="7. Changes to Terms">
              We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
            </Section>
            <Section title="8. Contact">
              For terms-related queries, contact us via Instagram @k.z.987 or through our Contact page.
            </Section>
          </div>
        </div>
      </div>
    </>
  )
}
