import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Eye, Calendar, ArrowLeft, Tag, Share2 } from 'lucide-react'
import { BLOG_POSTS } from '../data/index.js'
import { getPostBySlug, getPosts } from '../lib/blogService.js'
import BlogCard from '../components/ui/BlogCard.jsx'
import Breadcrumb from '../components/layout/Breadcrumb.jsx'
import SEOHead from '../components/ui/SEOHead.jsx'
import { useLang } from '../context/LanguageContext.jsx'
import toast from 'react-hot-toast'

const BLOG_CONTENT = {
  'how-to-fill-rgpv-revaluation-form': `
## What is RGPV Revaluation?
RGPV revaluation (also known as re-checking or re-totaling) is a process where students can get their answer sheets re-evaluated if they are not satisfied with their marks.

## When to Apply for Revaluation?
You should apply for revaluation if:
- You score significantly lower than expected
- You believe your answer sheet was not evaluated correctly
- You want to ensure all questions were marked

## Step-by-Step Process

### Step 1: Check Your Result
First, check your result on the official RGPV portal at rgpv.ac.in. Note down the subjects you want to apply for revaluation.

### Step 2: Visit RGPV Portal
Go to **www.rgpv.ac.in** and navigate to the Student Corner section.

### Step 3: Find Revaluation Form
Look for "Revaluation / Re-checking" option in the examination section. The link is typically available within 15-20 days of result declaration.

### Step 4: Fill the Form
- Enter your enrollment number
- Select the examination year and semester
- Choose the subjects for revaluation
- Upload required documents (result copy)

### Step 5: Pay the Fee
The revaluation fee is typically ₹300-500 per subject. Pay through online mode (credit/debit card, net banking, UPI).

### Step 6: Submit and Keep Receipt
Submit the form and download the payment receipt. Keep it safe for future reference.

## Important Deadlines
- Revaluation forms are typically available for 15-20 days after result declaration
- Do not miss the deadline as late applications are not accepted

## Fee Structure
| Service | Fee |
|---------|-----|
| Re-checking | ₹200/subject |
| Revaluation | ₹500/subject |
| Photocopy of Answer Sheet | ₹300/subject |

## Tips for Revaluation
1. Apply only if you genuinely believe there's been an error
2. Compare your answers with the solution key
3. Consult your professor before applying
4. Keep all documents handy

## Contact Information
For revaluation related queries, contact the RGPV examination department directly at the university.
  `,
  'how-to-get-admission-in-rgpv-approved-colleges': `
## How to Get Admission in RGPV Approved Colleges: Complete Admission Process (2026 Guide)
Choosing the right engineering, pharmacy, management, or polytechnic college is one of the most important decisions in a student's academic journey. If you are planning to study in Madhya Pradesh, colleges affiliated with **Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV)** are among the most preferred options.

However, many students are confused about questions such as:
- How can I get admission to an RGPV-approved college?
- Is there an entrance exam?
- What documents are required?
- Can I get admission without JEE Main?
- What is the counselling process?
This detailed guide explains the complete admission process for RGPV-approved colleges in simple language. Whether you are applying for B.Tech, M.Tech, MBA, MCA, Pharmacy, Diploma, or other professional courses, this article will help you understand every step.

## What is RGPV?
Rajiv Gandhi Proudyogiki Vishwavidyalaya ([RGPV](https://www.rgpv.ac.in/)), also known as the State Technological University of Madhya Pradesh, is located in Bhopal. It is one of the largest technical universities in India and is recognised by the University Grants Commission (UGC).

Thousands of students study in RGPV-affiliated colleges every year in various professional programmes, including:
- B.Tech (Bachelor of Technology)
- M.Tech (Master of Technology)
- B.Pharmacy
- M.Pharmacy
- MBA
- MCA
- Polytechnic Diploma
- Architecture
- Hotel Management
- Applied Sciences
RGPV does not usually conduct admissions directly. Instead, admissions are carried out through the state counselling process or according to government admission guidelines.

## Who Can Take Admission in an RGPV-Approved College?
Students who have completed the required qualifying examination can apply.

### For B.Tech
You should have:
- Passed Class 12 (10+2)
- Physics and Mathematics as compulsory subjects
- Chemistry/Biology/Biotechnology/Technical Vocational Subject as applicable
- Minimum qualifying marks as prescribed by the admission authority

### For Diploma (Polytechnic)
You should have:
- Passed Class 10
- Required minimum percentage according to current admission rules

### For MBA
You should have:
- Graduation from a recognised university
- Eligibility as per the admission authority

### For MCA
You should have:
- Bachelor's degree
- Mathematics at 10+2 or graduation level (as applicable)
- Required qualifying marks

### For Pharmacy
Eligibility depends upon the course:
- B.Pharm – Class 12 with PCB or PCM
- M.Pharm – B.Pharm degree

## Admission Process for RGPV-Approved Colleges
The admission process generally follows these steps.

### Step 1: Check Eligibility
Before applying, ensure that you meet the eligibility criteria for your chosen course.

Verify:
- Educational qualification
- Required subjects
- Minimum marks
- Age criteria (if applicable)

### Step 2: Register for Counselling
Most admissions are conducted through the Directorate of Technical Education (DTE), Madhya Pradesh.

Students need to:
- Complete online registration
- Fill in personal details
- Upload required documents
- Pay the registration fee (if applicable)
Always use the official counselling portal for registration.

### Step 3: Document Verification
After registration, your documents are verified.

Common documents include:
- Class 10 marksheet
- Class 12 marksheet
- Transfer Certificate
- Character Certificate
- Aadhaar Card
- Passport-size photographs
- Category certificate (if applicable)
- Income certificate (if applicable)
- Domicile certificate (if required)
- Migration certificate (where applicable)
Make sure all documents are clear and accurate to avoid delays.

### Step 4: Choice Filling
This is one of the most important stages.

Students can select:
- Preferred colleges
- Preferred branches
- Order of preference
For example:
1. Computer Science Engineering
2. Artificial Intelligence
3. Information Technology
4. Electronics and Communication
5. Mechanical Engineering
Choose carefully because seat allotment depends on your preferences and merit.

### Step 5: Seat Allotment
Seats are allotted based on several factors, including:
- Merit
- Entrance examination score (where applicable)
- Reservation category
- Availability of seats
- Choices filled by the candidate
If you are allotted a seat, you can proceed with admission.

### Step 6: Seat Confirmation
To confirm the allotted seat, students generally need to:
- Accept the seat
- Pay the required admission fee
- Download the allotment letter
Failure to complete these steps within the prescribed timeline may result in cancellation of the allotted seat.

### Step 7: Reporting to the College
Finally, report to the allotted college with your original documents.

The college will:
- Verify original certificates
- Complete admission formalities
- Collect remaining fees
- Confirm your enrolment
Once completed, you officially become a student of the RGPV-affiliated college.

## Is JEE Main Mandatory for Admission?
This is one of the most frequently asked questions.

The answer depends on the current admission policy.

For many B.Tech admissions, JEE Main scores are considered during counselling. However, if seats remain vacant after the counselling rounds, admissions may also be offered according to the rules prescribed by the competent admission authority.

Since admission policies can change from year to year, students should always refer to the latest official notification before applying.

## Can Students from Other States Apply?
Yes.

Many RGPV-affiliated colleges also admit students from outside Madhya Pradesh.

However:
- Seat availability may differ.
- Eligibility rules may vary.
- Reservation benefits applicable to Madhya Pradesh candidates may not apply in all cases.
Students should carefully read the latest admission guidelines before applying.

## Important Documents Required
Keep both original documents and photocopies ready.

Typical document checklist:
- Class 10 Marksheet
- Class 12 Marksheet
- Graduation Marksheet (for PG courses)
- Transfer Certificate
- Migration Certificate
- Aadhaar Card
- Passport-size photographs
- Category Certificate
- Domicile Certificate
- Income Certificate
- Gap Certificate (if applicable)
Preparing these documents in advance can save time during counselling and admission.

## How to Choose the Right RGPV College
Do not select a college based only on advertisements.

Consider the following factors:
- AICTE approval (where applicable)
- RGPV affiliation
- Faculty quality
- Placement record
- Laboratory facilities
- Infrastructure
- Industry collaborations
- Campus environment
- Hostel facilities
- Location
- Student reviews
- Previous academic performance
Research thoroughly before finalising your choice.

## Common Mistakes Students Should Avoid
Many students make avoidable errors during admission.

Some of the most common mistakes include:
- Waiting until the last date to register
- Uploading unclear documents
- Filling incorrect personal details
- Choosing colleges without proper research
- Missing counselling deadlines
- Ignoring official notifications
- Not keeping original documents ready
- Entering incorrect marks during registration
Being careful during each step can help prevent unnecessary problems.

## Tips to Improve Your Chances of Getting Admission
Here are some practical suggestions:
- Apply as soon as the registration window opens.
- Keep scanned copies of all required documents ready.
- Fill in your choices thoughtfully.
- Stay updated with counselling schedules.
- Verify every detail before submitting your application.
- Attend every counselling round if eligible.
- Keep checking official announcements regularly.

## Frequently Asked Questions (FAQs)

### 1. Does RGPV conduct admissions directly?
No. Admissions are generally conducted through the competent state admission authority or according to the applicable admission guidelines for the respective course.

### 2. Can I get admission without JEE Main?
Depending on the course and prevailing admission rules, admissions may be possible through counselling procedures if seats remain available. Always verify the latest official admission notification.

### 3. Are RGPV degrees recognised?
Yes. Degrees awarded through RGPV-affiliated institutions are recognised, provided the college is duly affiliated with RGPV and has the required regulatory approvals for the programme.

### 4. Can students from other states apply?
Yes. Students from other states can apply, subject to eligibility and the applicable admission rules.

### 5. How many counselling rounds are conducted?
The number of counselling rounds may vary each year depending on seat availability and the admission schedule announced by the competent authority.

## Final Thoughts
Getting admission to an RGPV-approved college is a straightforward process if you understand the admission procedure and complete each step on time. The key is to verify your eligibility, register through the official counselling process, prepare your documents in advance, carefully fill your college preferences, and stay informed about important deadlines.

Whether you are planning to pursue Engineering, Pharmacy, MBA, MCA, Diploma, or another professional course, choosing a recognised RGPV-affiliated college can provide quality education and open up valuable career opportunities.

Before making your final decision, always verify that the college is currently affiliated with RGPV and approved by the relevant regulatory authorities. Keeping yourself updated with the latest admission notifications will help ensure a smooth and successful admission experience.
  `,
  'top-10-tips-to-score-9-plus-cgpa': `
## Introduction
Scoring 9+ CGPA in RGPV engineering is achievable with the right strategy. Here are proven tips from toppers.

## 1. Understand the Examination Pattern
RGPV follows CBCS (Choice Based Credit System). Understanding the marking scheme, question paper pattern and unit weightage is crucial.

## 2. Focus on Previous Year Papers
**This is the most important tip.** RGPV exams are highly predictable. Download previous year papers from RGPV Hub and solve at least 5-7 years of papers for each subject.

## 3. Prepare Unit-wise Notes
Create concise notes for each unit. Focus on:
- Key definitions
- Important formulas
- Diagrams and flowcharts
- Examples and derivations

## 4. Attend All Classes
Attendance matters for:
- Understanding concepts from professors
- Getting important topics highlighted
- Internal assessment marks (which are 30-40% of total marks)

## 5. Master Internal Marks
Internal marks (assignments, sessionals, lab work) can boost your SGPA significantly. Never skip:
- Assignment submissions
- Lab reports
- Class tests/sessionals

## 6. Create a Study Timetable
Allocate time for each subject based on:
- Credit hours
- Difficulty level
- Your weak areas

## 7. Use Quality Study Resources
- RGPV Hub notes and study materials
- Standard textbooks recommended in syllabus
- Online resources (YouTube, NPTEL)
- Previous year solutions

## 8. Practice Diagrams and Derivations
For technical subjects, practice:
- Circuit diagrams
- Mathematical derivations
- Flowcharts and algorithms
- Block diagrams

## 9. Group Study
Study with fellow toppers:
- Discuss difficult concepts
- Solve previous year papers together
- Quiz each other
- Share notes and resources

## 10. Stay Healthy During Exams
- Sleep 7-8 hours daily
- Eat well and stay hydrated
- Take short breaks during study
- Exercise regularly
- Avoid last-minute cramming

## Bonus Tip: Use RGPV Hub Tools
Use our SGPA and CGPA calculators to track your academic performance and plan your studies accordingly.
  `,
}

// Simple markdown renderer (headings, lists, paragraphs, bold, links)
function renderContent(content) {
  if (!content) return null
  return content.trim().split('\n').map((line, i) => {
    if (line.startsWith('## '))  return <h2 key={i} className="font-bold text-xl mt-8 mb-3" style={{ color:'#282A35' }}>{line.slice(3)}</h2>
    if (line.startsWith('### ')) return <h3 key={i} className="font-semibold text-base mt-6 mb-2" style={{ color:'#04AA6D' }}>{line.slice(4)}</h3>
    if (line.startsWith('- '))   return <li key={i} className="ml-5 list-disc" style={{ color:'#555' }}>{line.slice(2)}</li>
    if (line.trim() === '')      return <div key={i} className="h-2" />
    if (line.startsWith('|'))    return <code key={i} className="block text-xs font-mono p-1 my-0.5" style={{ backgroundColor:'#f5f5f5', color:'#555' }}>{line}</code>

    const inlineParts = []
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g
    let lastIndex = 0
    let match

    while ((match = linkRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        inlineParts.push(line.slice(lastIndex, match.index))
      }
      inlineParts.push({ text: match[1], href: match[2] })
      lastIndex = match.index + match[0].length
    }

    if (lastIndex < line.length) {
      inlineParts.push(line.slice(lastIndex))
    }

    return (
      <p key={i} style={{ color:'#555' }}>
        {inlineParts.map((part, j) => {
          if (typeof part === 'string') {
            return part.split(/(\*\*[^*]+\*\*)/).map((segment, k) =>
              segment.startsWith('**') && segment.endsWith('**')
                ? <strong key={`${j}-${k}`} style={{ color:'#282A35' }}>{segment.slice(2,-2)}</strong>
                : segment
            )
          }
          return (
            <a key={j} href={part.href} target="_blank" rel="noopener noreferrer"
              style={{ color:'#1D4ED8', textDecoration:'underline' }}>
              {part.text}
            </a>
          )
        })}
      </p>
    )
  })
}

export default function BlogPost() {
  const { slug } = useParams()
  const { t } = useLang()
  const [post,    setPost]    = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        // Try Firestore first
        const fsPost = await getPostBySlug(slug)
        if (fsPost) {
          setPost(fsPost)
          const allFs = await getPosts()
          setRelated(allFs.filter(p => p.id !== fsPost.id && p.category === fsPost.category).slice(0, 3))
        } else {
          // Fall back to static data
          const staticPost = BLOG_POSTS.find(p => p.slug === slug) || null
          setPost(staticPost ? { ...staticPost, _static: true } : null)
          if (staticPost) {
            setRelated(BLOG_POSTS.filter(p => p.slug !== slug && p.category === staticPost.category).slice(0, 3))
          }
        }
      } catch {
        const staticPost = BLOG_POSTS.find(p => p.slug === slug) || null
        setPost(staticPost ? { ...staticPost, _static: true } : null)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  const handleShare = async () => {
    try {
      await navigator.share({ title: post.title, url: window.location.href })
    } catch {
      await navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor:'#f1f1f1' }}>
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border-4 border-t-transparent mx-auto mb-3 animate-spin" style={{ borderColor:'#04AA6D', borderTopColor:'transparent' }} />
          <p className="text-sm" style={{ color:'#aaa' }}>{t('loading_article')}</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor:'#f1f1f1' }}>
        <div className="text-center">
          <div className="text-5xl mb-4">📝</div>
          <h2 className="font-bold text-xl mb-2" style={{ color:'#282A35' }}>{t('article_not_found')}</h2>
          <Link to="/blog" className="btn-primary mt-4 inline-flex">{t('back_to_blog')}</Link>
        </div>
      </div>
    )
  }

  // For static posts: try BLOG_CONTENT fallback; for Firestore posts: use post.content
  const content = post._static ? BLOG_CONTENT[slug] : post.content
  const tags = Array.isArray(post.tags) ? post.tags : []

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Organization', name: 'RGPV Hub' },
    publisher: { '@type': 'Organization', name: 'RGPV Hub', url: 'https://rgpvhub.in' },
    datePublished: post.date,
    dateModified: post.date,
    url: `https://rgpvhub.in/blog/${post.slug}`,
  }

  const EMOJI = { 'Study Tips':'📚','Revaluation':'📝','Admit Card':'🎫','Exam Form':'📋','Career Guidance':'🎯','Results':'🏆','Exam Updates':'📢','Placement':'💼' }

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.excerpt}
        keywords={tags.join(', ')}
        url={`/blog/${post.slug}`}
        type="article"
        schema={articleSchema}
      />

      <div className="min-h-screen pb-24 lg:pb-8" style={{ backgroundColor:'#f1f1f1' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <Breadcrumb extra={[{ label:'Blog', href:'/blog' }, { label:post.title.slice(0,40)+'…' }]} />

          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
            <div className="bg-white rounded shadow-w3 p-6 sm:p-8 mb-6">
              <span className="inline-block px-3 py-1 rounded text-xs font-semibold text-white mb-4"
                style={{ backgroundColor:'#04AA6D' }}>{post.category}</span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-5" style={{ color:'#282A35' }}>
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 pb-5 mb-5" style={{ borderBottom:'1px solid #f0f0f0' }}>
                <Link to="/about" className="flex items-center gap-2 group" style={{ textDecoration:'none' }}>
                  <div className="w-8 h-8 rounded flex items-center justify-center font-bold text-xs text-white" style={{ backgroundColor:'#04AA6D' }}>{post.author?.split(' ').map(word => word[0]).join('').slice(0,2).toUpperCase()}</div>
                  <div>
                    <div className="text-sm" style={{ color:'#555' }}>{post.author || 'RGPV Hub Team'}</div>
                    <div className="text-[10px] uppercase tracking-[0.16em] text-[#777]">Author Info</div>
                  </div>
                </Link>
                <span className="flex items-center gap-1 text-sm" style={{ color:'#aaa' }}>
                  <Calendar size={13}/> {new Date(post.date).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}
                </span>
                <span className="flex items-center gap-1 text-sm" style={{ color:'#aaa' }}>
                  <Clock size={13}/> {post.readTime} read
                </span>
                {post.views > 0 && (
                  <span className="flex items-center gap-1 text-sm" style={{ color:'#aaa' }}>
                    <Eye size={13}/> {post.views?.toLocaleString()} views
                  </span>
                )}
                <div className="ml-auto">
                  <button onClick={handleShare} className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-all"
                    style={{ border:'1px solid #d5d5d5', color:'#555' }}
                    onMouseOver={e=>{ e.currentTarget.style.borderColor='#04AA6D'; e.currentTarget.style.color='#04AA6D' }}
                    onMouseOut={e=>{ e.currentTarget.style.borderColor='#d5d5d5'; e.currentTarget.style.color='#555' }}>
                    <Share2 size={13}/> Share
                  </button>
                </div>
              </div>


              {/* Thumbnail */}
              <div className="h-56 sm:h-72 rounded flex items-center justify-center mb-6"
                style={{ backgroundColor:'#f9f9f9', border:'1px solid #e0e0e0' }}>
                <div className="text-8xl">{EMOJI[post.category] || '📰'}</div>
              </div>

              {/* Excerpt */}
              <p className="text-base leading-relaxed mb-6" style={{ color:'#555' }}>{post.excerpt}</p>

              {/* Content */}
              {content ? (
                <div className="space-y-2 text-sm leading-relaxed">
                  {renderContent(content)}
                </div>
              ) : (
                <div className="p-8 text-center rounded" style={{ backgroundColor:'#f9f9f9', border:'1px solid #e0e0e0' }}>
                  <div className="text-3xl mb-3">📖</div>
                  <p style={{ color:'#777' }}>{t('content_coming_soon')}</p>
                  <a href="https://instagram.com/k.z.987" target="_blank" rel="noopener noreferrer" className="btn-primary mt-4 inline-flex">
                    {t('follow_instagram')}
                  </a>
                </div>
              )}

              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-8 pt-6" style={{ borderTop:'1px solid #f0f0f0' }}>
                  {tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1 px-3 py-1 rounded text-xs font-medium"
                      style={{ backgroundColor:'#f1f1f1', border:'1px solid #d5d5d5', color:'#555' }}>
                      <Tag size={10}/> #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Share CTA */}
            <div className="p-6 rounded text-center mb-8" style={{ backgroundColor:'#282A35' }}>
              <p className="font-semibold mb-4 text-white">{t('found_helpful')}</p>
              <div className="flex items-center justify-center gap-3">
                <button onClick={handleShare} className="btn-primary flex items-center gap-2">
                  <Share2 size={15}/> {t('share_article')}
                </button>
                <a href="https://instagram.com/k.z.987" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded font-medium text-sm"
                  style={{ border:'1px solid rgba(255,105,180,0.4)', color:'#ff69b4' }}>
                  Follow on Instagram
                </a>
              </div>
            </div>
          </motion.div>

          {/* Related articles */}
          {related.length > 0 && (
            <div className="mt-4">
              <h2 className="font-bold text-xl mb-5" style={{ color:'#282A35' }}>{t('related_articles')}</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {related.map((p,i) => <BlogCard key={p.id} post={p} index={i} />)}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
