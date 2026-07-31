import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { FAQS } from '../../data/index.js'

export default function FAQ() {
  const [open, setOpen] = useState(0)

  const faqSchema = {
    '@context':'https://schema.org','@type':'FAQPage',
    mainEntity: FAQS.map(f=>({ '@type':'Question', name:f.q, acceptedAnswer:{'@type':'Answer',text:f.a} })),
  }

  return (
    <section className="py-14" style={{ backgroundColor:'#f1f1f1' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="mb-10 text-center">
          <h2 className="section-heading inline-block">Frequently Asked Questions</h2>
          <p className="text-[#555] mt-4 text-sm">Everything you need to know about RGPV Hub</p>
        </motion.div>

        <div className="space-y-2">
          {FAQS.map((faq,i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:i*0.05 }}
              className="bg-white rounded overflow-hidden"
              style={{ border:'1px solid #d5d5d5', boxShadow:'0 1px 2px rgba(0,0,0,.06)' }}>

              <button onClick={() => setOpen(open===i ? -1 : i)}
                className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left hover:bg-[#f9f9f9] transition-colors">
                <span className="font-semibold text-sm text-[#282A35]"
                      style={{ color: open===i ? '#04AA6D' : '#282A35' }}>
                  {faq.q}
                </span>
                <motion.div animate={{ rotate: open===i ? 180 : 0 }} transition={{ duration:0.2 }} className="flex-shrink-0 mt-0.5">
                  <ChevronDown size={18} style={{ color: open===i ? '#04AA6D' : '#aaa' }} />
                </motion.div>
              </button>

              <AnimatePresence>
                {open===i && (
                  <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }}>
                    <div className="px-5 pb-4 border-t border-[#e1e1e1]">
                      <p className="text-sm text-[#555] leading-relaxed pt-3">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          className="mt-8 text-center text-sm text-[#555]">
          Still have questions?{' '}
          <a href="/contact" style={{ color:'#04AA6D' }} className="font-semibold hover:underline">Contact us</a>{' '}
          or follow us on{' '}
          <a href="https://instagram.com/k.z.987" target="_blank" rel="noopener noreferrer"
             style={{ color:'#e91e63' }} className="font-semibold hover:underline">Instagram @k.z.987</a>
        </motion.p>
      </div>
    </section>
  )
}
