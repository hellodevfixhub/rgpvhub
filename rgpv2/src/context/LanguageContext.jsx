import { createContext, useContext, useState } from 'react'
import { LANGUAGES } from '../data/index.js'

const translations = {
  en: {
    home: 'Home', papers: 'Papers', notes: 'Notes', syllabus: 'Syllabus',
    results: 'Results', timetable: 'Time Table', guess: 'Guess Papers',
    solutions: 'Solutions', blog: 'Blog', tools: 'Tools', about: 'About', contact: 'Contact',
    search: 'Search papers, notes, subjects...', download: 'Download', preview: 'Preview',
    trending: 'Trending', latest: 'Latest Uploads', popular: 'Popular Downloads',
    hero_title: 'Your Complete RGPV Academic Companion',
    hero_sub: 'Access PYQs, Notes, Results, Syllabus, Guess Papers & Solutions',
    cta_papers: 'Download Papers', cta_notes: 'Explore Notes',
    quick_access: 'Quick Access', quick_access_sub: 'Navigate to any resource in one click',
    latest_uploads: 'Latest Uploads', latest_uploads_sub: 'Fresh content added recently',
    popular_downloads: 'Popular Downloads', popular_downloads_sub: 'Most downloaded question papers this month',
    tools_section: 'Student Tools', tools_section_sub: 'Free calculators built for RGPV students',
    testimonials: 'What Students Say', testimonials_sub: 'Join 2,50,000+ satisfied RGPV students',
    hero_feature_1: 'Previous Year Papers',
    hero_feature_2: 'Study Notes',
    hero_feature_3: 'RGPV Syllabus',
    hero_feature_4: 'Exam Results',
    hero_feature_5: 'Guess Papers',
    hero_feature_6: 'Student Tools',
    view_all: 'View All',
    latest_articles: 'Latest Articles',
    latest_articles_sub: 'Exam updates, study tips & career guidance',
    all_articles: 'All Articles',
    blog_title: 'RGPV Hub Blog',
    blog_sub: 'Exam updates, study tips, career guidance and more',
    search_articles: 'Search articles...',
    no_articles_found: 'No articles found',
    try_different_search: 'Try a different category or search term',
    article_not_found: 'Article Not Found',
    back_to_blog: 'Back to Blog',
    loading_article: 'Loading article…',
    content_coming_soon: 'Full article content coming soon. Follow us on Instagram for updates!',
    follow_instagram: 'Follow @k.z.987',
    found_helpful: 'Found this helpful? Share with your friends!',
    share_article: 'Share Article',
    related_articles: 'Related Articles',
  },
  hi: {
    home: 'होम', papers: 'पेपर', notes: 'नोट्स', syllabus: 'पाठ्यक्रम',
    results: 'परिणाम', timetable: 'समय-सारणी', guess: 'गेस पेपर',
    solutions: 'समाधान', blog: 'ब्लॉग', tools: 'टूल्स', about: 'हमारे बारे में', contact: 'संपर्क',
    search: 'पेपर, नोट्स, विषय खोजें...', download: 'डाउनलोड', preview: 'प्रीव्यू',
    trending: 'ट्रेंडिंग', latest: 'नवीनतम अपलोड', popular: 'लोकप्रिय डाउनलोड',
    hero_title: 'आपका संपूर्ण RGPV अकादमिक साथी',
    hero_sub: 'PYQ, नोट्स, परिणाम, पाठ्यक्रम, गेस पेपर और समाधान एक्सेस करें',
    cta_papers: 'पेपर डाउनलोड करें', cta_notes: 'नोट्स देखें',
    quick_access: 'त्वरित पहुंच', quick_access_sub: 'किसी भी संसाधन तक एक क्लिक में पहुंचें',
    latest_uploads: 'नवीनतम अपलोड', latest_uploads_sub: 'हाल ही में जोड़ी गई ताज़ा सामग्री',
    popular_downloads: 'लोकप्रिय डाउनलोड', popular_downloads_sub: 'इस महीने सबसे अधिक डाउनलोड किए गए प्रश्न पत्र',
    tools_section: 'छात्र टूल्स', tools_section_sub: 'RGPV छात्रों के लिए मुफ्त कैलकुलेटर',
    testimonials: 'छात्र क्या कहते हैं', testimonials_sub: '2,50,000+ संतुष्ट RGPV छात्रों में शामिल हों',
    hero_feature_1: 'पिछले वर्ष के पेपर',
    hero_feature_2: 'स्टडी नोट्स',
    hero_feature_3: 'RGPV पाठ्यक्रम',
    hero_feature_4: 'परीक्षा परिणाम',
    hero_feature_5: 'गेस पेपर',
    hero_feature_6: 'छात्र टूल्स',
    view_all: 'सभी देखें',
    latest_articles: 'नवीनतम लेख',
    latest_articles_sub: 'परीक्षा अपडेट, अध्ययन सुझाव और करियर मार्गदर्शन',
    all_articles: 'सभी लेख',
    blog_title: 'RGPV हब ब्लॉग',
    blog_sub: 'परीक्षा अपडेट, अध्ययन सुझाव, करियर मार्गदर्शन और अधिक',
    search_articles: 'लेख खोजें...',
    no_articles_found: 'कोई लेख नहीं मिला',
    try_different_search: 'एक अलग श्रेणी या खोज शब्द आज़माएँ',
    article_not_found: 'लेख नहीं मिला',
    back_to_blog: 'ब्लॉग पर वापस जाएं',
    loading_article: 'लेख लोड हो रहा है…',
    content_coming_soon: 'पूरा लेख जल्द ही आ रहा है। नवीनतम जानकारी के लिए हमें इंस्टाग्राम पर फॉलो करें!',
    follow_instagram: 'Follow @k.z.987',
    found_helpful: 'क्या यह उपयोगी लगा? अपने दोस्तों के साथ साझा करें!',
    share_article: 'लेख साझा करें',
    related_articles: 'संबंधित लेख',
  },
}

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('rgpv-lang') || 'en')

  const t = (key) => {
    const dict = translations[lang] || translations.en
    return dict[key] || translations.en[key] || key
  }

  const changeLang = (code) => {
    setLang(code)
    localStorage.setItem('rgpv-lang', code)
  }

  const currentLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0]

  return (
    <LanguageContext.Provider value={{ lang, t, changeLang, currentLang, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
