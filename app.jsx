import React, { useEffect, useState } from 'react'
import {
  Layout,
  Target,
  CheckCircle2,
  Plus,
  User,
  Settings,
  LogOut,
  X,
  Trash2,
  Edit2,
  Sparkles
} from 'lucide-react'

const defaultTasks = [
  { id: 1, title: 'לדבר עם מישהו חדש', desc: 'קח יוזמה ושאל שאלה קצרה.', completed: false, points: 10 },
  { id: 2, title: 'לכתוב רעיון חדש', desc: 'תעד רעיון לפרויקט או דיבור.', completed: false, points: 20 },
  { id: 3, title: 'להציג נקודה בשיעור', desc: 'הבע דעה קטנה באופן ברור.', completed: true, points: 30 }
]

const affirmationsList = [
  'אני מתקרב/ת בכל יום לאני הכי אמיתי שלי.',
  'האני שלי ראוי להצלחה ולאושר.',
  'אני בוחר/ת לראות הזדמנויות במקום מכשולים.',
  'כל צעד קטן מקרב אותי למטרה הגדולה.',
  'העוצמה שלי מתחילה במחשבה חיובית.'
]

const focusAreasList = [
  { key: 'emotional', title: 'רגשי', description: 'תרגילים לחיזוק הביטחון העצמי והרוגע.', icon: '💖' },
  { key: 'social', title: 'חברתי', description: 'שיפור מיומנויות שיחה והתחברות לאחרים.', icon: '🧑‍🤝‍🧑' },
  { key: 'physical', title: 'גופני', description: 'פעולות להגברת הנוכחות והתחושה הטובה.', icon: '🧘' },
  { key: 'professional', title: 'מקצועי', description: 'תרגילים לפיתוח ביטחון בעבודה ובקריירה.', icon: '💼' }
]

const businessArticles = [
  { title: 'להוביל מצגות וביטחון בפני קהל', description: 'טיפים לבניית מסר ברור, שליטה בקול ונוכחות מרשימה.', tag: 'מצגות' },
  { title: 'לנהל משא ומתן עם ראש שקט', description: 'כלים לשמירה על עוצמה, גמישות ויצירת אמון מקצועי.', tag: 'משא ומתן' },
  { title: 'להעצים צוות ולהשפיע נכון', description: 'איך להגדיר גבולות, לתת משוב וליצור תרבות ביטחון.', tag: 'ניהול צוות' },
  { title: 'לייצר רשת עסקית משכנעת', description: 'גישה אמפתית ובונה לקשרים מקצועיים אמיתיים.', tag: 'רשתות' }
]

const businessCourses = [
  { title: 'דיבור בפני קהל משכנע', price: '₪299', description: 'קורס דיגיטלי לפיתוח נוכחות ומסרים חדים.', icon: '🎤' },
  { title: 'מנהיגות עם חשיבה אסטרטגית', price: '₪349', description: 'קורס לחיזוק הכריזמה והנהגה מקצועית.', icon: '🧭' },
  { title: 'נוכחות עסקית יומיומית', price: '₪259', description: 'תרגילים להקרנה אמינה בכל פגישה ומפגש.', icon: '🕴️' }
]

const mediaStories = [
  { title: 'ראיון עם מנכ"ל שברא את עצמו מחדש', platform: 'פודקאסט', highlight: 'מתי לקחת סיכון ולהוביל מתוך ביטחון.' },
  { title: 'סיפור על מהפך מקצועי', platform: 'וידאו', highlight: 'הדרך להפוך נובח מקצועי לשותף משפיע.' },
  { title: 'איך לייצר קריירה עם נוכחות', platform: 'פודקאסט', highlight: 'כללים לשיחה במהירות ברשתות מקצועיות.' }
]

const resourceDownloads = [
  { title: 'מדריך מצגות עסקיות', type: 'PDF', description: 'מבנה, קטע פתיחה וסגירת מסרים.', icon: '📄' },
  { title: 'קליסט משא ומתן', type: '✔️', description: 'שלבים מוכחים לפני פגישה עם לקוח או ספק.', icon: '✅' },
  { title: 'תרגיל נוכחות ביום עבודה', type: '📝', description: 'תירגל הבעה, שפת גוף ופתיחות מקצועית.', icon: '🎯' }
]

const testimonials = [
  { name: 'אייל', role: 'יזם טכנולוגי', quote: 'הקורס חיזק אותי להנחות מצגות מול ממשקיעים ולנהל צוות בביטחון.' },
  { name: 'חן', role: 'מנהלת משאבי אנוש', quote: 'הכלים לעמידה מול קבוצות שדרגו את ההשפעה שלי בפגישות.', highlight: 'תמיכה אמינה ושפה מקצועית.' },
  { name: 'דני', role: 'מנהל שיווק', quote: 'הקהילה נתנה לי השראה ורשת תמיכה ממשית בעולם העסקי.' }
]

const challengesList = [
  { title: 'שיחה משמעותית', subtitle: 'אתגר יומי', reward: '15 נקודות' },
  { title: 'אתגר חיוך', subtitle: 'אתגר יומי', reward: '10 נקודות' },
  { title: 'פרויקט אישי', subtitle: 'אתגר שבועי', reward: '30 נקודות' },
  { title: 'שיתוף הצלחה', subtitle: 'אתגר שבועי', reward: '40 נקודות' }
]

const weeklyProgressDefault = [72, 78, 82, 86, 91, 94, 98]

function App() {
  const [persona, setPersona] = useState(() => {
    try {
      return localStorage.getItem('boostme-persona') || 'student'
    } catch {
      return 'student'
    }
  })
  const [currentPage, setCurrentPage] = useState('home')
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('boostme-tasks')
      return saved ? JSON.parse(saved) : defaultTasks
    } catch {
      return defaultTasks
    }
  })
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem('boostme-theme') === 'dark'
    } catch {
      return false
    }
  })
  const [userName, setUserName] = useState(() => {
    try {
      return localStorage.getItem('boostme-user-name') || ''
    } catch {
      return ''
    }
  })
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    try {
      return localStorage.getItem('boostme-notifications-enabled') !== 'false'
    } catch {
      return true
    }
  })
  const [reminderTime, setReminderTime] = useState(() => {
    try {
      return localStorage.getItem('boostme-reminder-time') || '20:00'
    } catch {
      return '20:00'
    }
  })
  const [started, setStarted] = useState(() => {
    try {
      return localStorage.getItem('boostme-started') === 'true'
    } catch {
      return false
    }
  })
  const [onboardingStep, setOnboardingStep] = useState(1)
  const [focusAreas, setFocusAreas] = useState(() => {
    try {
      const saved = localStorage.getItem('boostme-focus-areas')
      return saved ? JSON.parse(saved) : ['emotional', 'social']
    } catch {
      return ['emotional', 'social']
    }
  })
  const [journalEntries, setJournalEntries] = useState(() => {
    try {
      const saved = localStorage.getItem('boostme-journal')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [journalText, setJournalText] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showPersonaModal, setShowPersonaModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ title: '', desc: '', points: 10 })
  const [affirmation, setAffirmation] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem('boostme-tasks', JSON.stringify(tasks))
    } catch {}
  }, [tasks])

  useEffect(() => {
    try {
      localStorage.setItem('boostme-persona', persona)
    } catch {}
  }, [persona])

  useEffect(() => {
    try {
      localStorage.setItem('boostme-theme', darkMode ? 'dark' : 'light')
    } catch {}
    document.body.dataset.theme = darkMode ? 'dark' : 'light'
  }, [darkMode])

  useEffect(() => {
    try {
      localStorage.setItem('boostme-user-name', userName)
    } catch {}
  }, [userName])

  useEffect(() => {
    try {
      localStorage.setItem('boostme-started', started ? 'true' : 'false')
    } catch {}
  }, [started])

  useEffect(() => {
    try {
      localStorage.setItem('boostme-notifications-enabled', notificationsEnabled ? 'true' : 'false')
    } catch {}
  }, [notificationsEnabled])

  useEffect(() => {
    try {
      localStorage.setItem('boostme-reminder-time', reminderTime)
    } catch {}
  }, [reminderTime])

  useEffect(() => {
    try {
      localStorage.setItem('boostme-focus-areas', JSON.stringify(focusAreas))
    } catch {}
  }, [focusAreas])

  useEffect(() => {
    try {
      localStorage.setItem('boostme-journal', JSON.stringify(journalEntries))
    } catch {}
  }, [journalEntries])

  const focusAreaToggle = (areaKey) => {
    setFocusAreas(prev => prev.includes(areaKey) ? prev.filter(key => key !== areaKey) : [...prev, areaKey])
  }

  const generateAffirmation = () => {
    const next = affirmationsList[Math.floor(Math.random() * affirmationsList.length)]
    setAffirmation(next)
  }

  const addJournalEntry = () => {
    if (journalText.trim()) {
      const entry = { id: Date.now(), text: journalText.trim(), date: new Date().toLocaleDateString('he-IL') }
      setJournalEntries(prev => [entry, ...prev])
      setJournalText('')
    }
  }

  const subscribeNewsletter = () => {
    if (newsletterEmail.trim()) {
      setSubscribed(true)
      setNewsletterEmail('')
    }
  }

  const startOnboarding = () => {
    setOnboardingStep(1)
    setStarted(false)
  }

  const completeOnboarding = () => {
    setStarted(true)
    setCurrentPage('home')
  }

  const dailyStreak = Math.max(3, Math.round(journalEntries.length / 2))
  const weeklyProgress = weeklyProgressDefault

  const toggleTask = (id) => {
    setTasks(prev => prev.map(task => task.id === id ? { ...task, completed: !task.completed } : task))
  }

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const addTask = () => {
    if (formData.title.trim()) {
      if (editingId) {
        setTasks(prev => prev.map(task => task.id === editingId ? { ...task, title: formData.title, desc: formData.desc, points: formData.points } : task))
        setEditingId(null)
      } else {
        setTasks(prev => [...prev, { id: Date.now(), title: formData.title, desc: formData.desc, completed: false, points: formData.points }])
      }
      setFormData({ title: '', desc: '', points: 10 })
      setShowModal(false)
    }
  }

  const openEditModal = (task) => {
    setFormData({ title: task.title, desc: task.desc, points: task.points })
    setEditingId(task.id)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingId(null)
    setFormData({ title: '', desc: '', points: 10 })
  }

  const completedCount = tasks.filter(task => task.completed).length
  const totalCount = tasks.length

  const renderWelcome = () => (
    <div className="welcome-screen">
      <div className="welcome-card">
        <span className="welcome-label">BoostMe</span>
        <h1>מסע ביטחון עצמי שמותאם אליך</h1>
        <p>התחל חוויה שמביאה אותך לרגש, לקשר, לגוף ולמקצוע.</p>
        <button className="btn btn-add btn-welcome" onClick={() => setOnboardingStep(2)}>
          להתחיל את האונבורדינג
        </button>
      </div>
    </div>
  )

  const renderOnboarding = () => (
    <div className="onboarding-screen">
      <div className="onboarding-card">
        <h1>בחר את התחומים החשובים לך</h1>
        <p>עזור לנו להתאים את המשימות והאתגרים לחוויה האישית שלך.</p>
        <div className="onboarding-cards">
          {focusAreasList.map(area => (
            <button
              key={area.key}
              type="button"
              className={`onboarding-option ${focusAreas.includes(area.key) ? 'active' : ''}`}
              onClick={() => focusAreaToggle(area.key)}
            >
              <div className="area-icon">{area.icon}</div>
              <strong>{area.title}</strong>
              <span>{area.description}</span>
            </button>
          ))}
        </div>
        <div className="onboarding-actions">
          <button className="btn btn-secondary" onClick={() => setOnboardingStep(1)}>
            חזור
          </button>
          <button className="btn btn-primary" onClick={completeOnboarding}>
            סיימתי והתחלתי
          </button>
        </div>
      </div>
    </div>
  )

  const renderHome = () => (
    <div className="dashboard-page">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="hero-label">BoostMe</span>
          <h1>תוביל בביטחון, תשיג תוצאות</h1>
          <p>אסטרטגיה מקצועית לחיזוק נוכחות בעבודה, תקשורת מול צוותים, ומשא ומתן שמשאיר רושם של סמכות.</p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => setCurrentPage('courses')}>הצטרף לקורס מוביל</button>
            <button className="btn btn-secondary" onClick={() => setCurrentPage('about')}>קרא עוד עלינו</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card hero-card-main">
            <h3>המסלול המהיר לעמידה מול קהל</h3>
            <p>פיתוח ביטחון שמרגיש טבעי ומוביל לתוצאות מקצועיות.</p>
          </div>
          <div className="hero-card hero-card-mini">
            <strong>45+</strong>
            <span>קורסים דיגיטליים מקצועיים</span>
          </div>
          <div className="hero-card hero-card-mini">
            <strong>120+</strong>
            <span>עדויות מהעולם העסקי</span>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-header">
          <div>
            <h2>מאמרים וטיפים מקצועיים</h2>
            <p>כלים לחיזוק הביטחון העצמי בקריירה, מצגות, ניהול צוות ובניית רשת קשרים.</p>
          </div>
        </div>
        <div className="content-grid">
          {businessArticles.map(article => (
            <article key={article.title} className="feature-card">
              <span className="feature-tag">{article.tag}</span>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block darker-block">
        <div className="section-header">
          <div>
            <h2>קורסים דיגיטליים בתשלום</h2>
            <p>הלכה למעשה: דיבור בפני קהל, מנהיגות ונוכחות מקצועית.</p>
          </div>
        </div>
        <div className="courses-grid">
          {businessCourses.map(course => (
            <article key={course.title} className="course-card">
              <div className="course-icon">{course.icon}</div>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="course-footer">
                <strong>{course.price}</strong>
                <button className="btn btn-secondary" onClick={() => setCurrentPage('courses')}>לפרטים</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-header">
          <div>
            <h2>פודקאסטים ווידאו</h2>
            <p>ראיונות עם אנשי עסקים מצליחים שעברו פריצת דרך בביטחון העצמי.</p>
          </div>
        </div>
        <div className="media-grid">
          {mediaStories.map(item => (
            <article key={item.title} className="media-card">
              <div className="media-type">{item.platform}</div>
              <h3>{item.title}</h3>
              <p>{item.highlight}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-header">
          <div>
            <h2>חומרי הורדה ממוקדי קריירה</h2>
            <p>מדריכים, צ'קליסטים ותרגילים ליישום מיידי במשרד ובפגישות.</p>
          </div>
        </div>
        <div className="resource-grid">
          {resourceDownloads.map(item => (
            <article key={item.title} className="resource-card">
              <div className="resource-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span>{item.type}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block newsletter-block">
        <div className="newsletter-content">
          <div>
            <h2>קבל תוכן שבועי ישירות למייל</h2>
            <p>טיפים לחיזוק ביטחון מקצועי, הבטחות עסקיות ותובנות ליצירת רושם של סמכות.</p>
          </div>
          <div className="newsletter-form">
            <input
              type="email"
              value={newsletterEmail}
              placeholder="הזן את המייל שלך"
              onChange={(e) => setNewsletterEmail(e.target.value)}
            />
            <button className="btn btn-primary" onClick={subscribeNewsletter}>הירשם לניוזלטר</button>
          </div>
          {subscribed && <p className="newsletter-confirm">תודה! המייל נרשם בהצלחה.</p>}
        </div>
      </section>
    </div>
  )

  const renderCourses = () => (
    <div className="dashboard-page">
      <header className="page-header">
        <div>
          <h1>קורסים דיגיטליים</h1>
          <p>השקעה מקצועית בביטחון העצמי שלך בעבודה ובעסקים.</p>
        </div>
      </header>
      <div className="courses-grid-full">
        {businessCourses.map(course => (
          <article key={course.title} className="course-card course-card-large">
            <div className="course-icon">{course.icon}</div>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <div className="course-footer">
              <strong>{course.price}</strong>
              <button className="btn btn-primary">הרשמה</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )

  const renderMedia = () => (
    <div className="dashboard-page">
      <header className="page-header">
        <div>
          <h1>פודקאסטים ווידאו</h1>
          <p>השראה מהסיפורים של מנהיגים ואנשי עסקים שצמחו בביטחון העצמי.</p>
        </div>
      </header>
      <div className="media-grid-full">
        {mediaStories.map(item => (
          <article key={item.title} className="media-card media-card-large">
            <div className="media-type">{item.platform}</div>
            <h3>{item.title}</h3>
            <p>{item.highlight}</p>
            <button className="btn btn-secondary">צפה עכשיו</button>
          </article>
        ))}
      </div>
    </div>
  )

  const renderCommunity = () => (
    <div className="dashboard-page">
      <header className="page-header">
        <div>
          <h1>קהילה פרטית לחברי מובילים</h1>
          <p>חיבור בין אנשי עסקים, תמיכה הדדית וחילופי תובנות מקצועיות.</p>
        </div>
      </header>
      <div className="community-card">
        <h2>כאן בונים אמון ומשפיעים יחד</h2>
        <p>חדרים מקצועיים, שיתוף הצלחות, ואתגרים שבועיים שמגיעים עם תמיכה אמיתית.</p>
        <ul>
          <li>פורומים פרטיים לפי מקצוע</li>
          <li>חלוקת תובנות לשוק ולניהול צוות</li>
          <li>מפגשי פגישות אורחים חיוניים</li>
        </ul>
        <button className="btn btn-primary">הצטרף לקהילה</button>
      </div>
    </div>
  )

  const renderAbout = () => (
    <div className="dashboard-page">
      <header className="page-header">
        <div>
          <h1>עלינו</h1>
          <p>הסיפור שמאחורי הפלטפורמה לביטחון העצמי העסקי.</p>
        </div>
      </header>
      <div className="about-content">
        <p>BoostMe נבנית מתוך ניסיון אישי ועסקי של שנים בניהול צוותים, מצגות ומו"מ. מתוך מצבים של חוסר ביטחון ומתח מול קהל נוצרה השאיפה להפוך את הידע לזמין לכל איש מקצוע.</p>
        <p>המערכת משלבת כלים מעשיים, קורסים דיגיטליים, חומרים להורדה ותמיכה קהילתית, כדי שתוכל לפתח ביטחון מקצועי אמיתי ולהשיג תוצאות עסקיות משמעותיות.</p>
        <p>מטרתנו היא ליצור מקום שבו קבלת החלטות נבונה, נוכחות משדרת סמכות והאחריות לעובדים נלווית בביטחון.</p>
      </div>
    </div>
  )

  const renderTestimonials = () => (
    <div className="dashboard-page">
      <header className="page-header">
        <div>
          <h1>המלצות לקוחות</h1>
          <p>עדויות אמיתיות מלקוחות עסקיים שחוו שינוי מקצועי.</p>
        </div>
      </header>
      <div className="testimonials-grid">
        {testimonials.map(item => (
          <article key={item.name} className="testimonial-card">
            <p>“{item.quote}”</p>
            <strong>{item.name}</strong>
            <span>{item.role}</span>
          </article>
        ))}
      </div>
    </div>
  )

  if (!started) {
    return (
      <div className="app app-fullscreen">
        {onboardingStep === 1 ? renderWelcome() : renderOnboarding()}
      </div>
    )
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>BoostMe</h1>
          <p>{userName ? `שלום ${userName}` : 'אפליקציית ביטחון עצמי'}</p>
          <div className="persona-badge" onClick={() => setShowPersonaModal(true)}>
            {persona === 'student' ? '🎓 תלמיד' : '💼 מקצועי'}
          </div>
        </div>
        <nav className="nav">
          <button className={`nav-item ${currentPage === 'home' ? 'active' : ''}`} onClick={() => setCurrentPage('home')}>
            <Layout size={18} /> בית
          </button>
          <button className={`nav-item ${currentPage === 'courses' ? 'active' : ''}`} onClick={() => setCurrentPage('courses')}>
            <Target size={18} /> קורסים
          </button>
          <button className={`nav-item ${currentPage === 'media' ? 'active' : ''}`} onClick={() => setCurrentPage('media')}>
            <Sparkles size={18} /> מדיה
          </button>
          <button className={`nav-item ${currentPage === 'community' ? 'active' : ''}`} onClick={() => setCurrentPage('community')}>
            <User size={18} /> קהילה
          </button>
          <button className={`nav-item ${currentPage === 'about' ? 'active' : ''}`} onClick={() => setCurrentPage('about')}>
            <Settings size={18} /> אודות
          </button>
          <button className={`nav-item ${currentPage === 'testimonials' ? 'active' : ''}`} onClick={() => setCurrentPage('testimonials')}>
            <CheckCircle2 size={18} /> המלצות
          </button>
          <button className={`nav-item ${currentPage === 'settings' ? 'active' : ''}`} onClick={() => setCurrentPage('settings')}>
            <Settings size={18} /> הגדרות
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item switch-persona" onClick={() => setShowPersonaModal(true)}>
            <LogOut size={18} /> החלף פרסונה
          </button>
        </div>
      </aside>

      <main className="main-content">
        {currentPage === 'home' && renderHome()}
        {currentPage === 'courses' && renderCourses()}
        {currentPage === 'media' && renderMedia()}
        {currentPage === 'community' && renderCommunity()}
        {currentPage === 'about' && renderAbout()}
        {currentPage === 'testimonials' && renderTestimonials()}
        {currentPage === 'settings' && (
          <div className="dashboard-page">
            <header className="page-header">
              <div>
                <h1>⚙️ הגדרות</h1>
                <p>התאם את האפליקציה בדיוק כפי שאתה רוצה.</p>
              </div>
            </header>
            <div className="settings-grid">
              <div className="settings-card">
                <h3>🎨 עיצוב</h3>
                <p>בחר עיצוב שמתאים לך</p>
                <button className="btn btn-add" onClick={() => setDarkMode(prev => !prev)}>
                  {darkMode ? 'כבה Dark Mode' : 'הפעל Dark Mode'}
                </button>
              </div>
              <div className="settings-card">
                <h3>👤 שם משתמש</h3>
                <p>שמור את השם שלך להצגה אישית</p>
                <input
                  className="settings-input"
                  type="text"
                  value={userName}
                  placeholder="הכנס את השם שלך"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="settings-card">
                <h3>🔔 תזכורות יומיות</h3>
                <p>קבל התראה על משימה חדשה או רישום יומן תודה.</p>
                <div className="settings-toggle">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={notificationsEnabled}
                      onChange={() => setNotificationsEnabled(prev => !prev)}
                    />
                    <span className="slider" />
                  </label>
                  <span>{notificationsEnabled ? 'פעיל' : 'כבוי'}</span>
                </div>
                <label className="reminder-label">שעת תזכורת</label>
                <input
                  className="settings-input"
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {showPersonaModal && (
        <div className="modal-overlay" onClick={() => setShowPersonaModal(false)}>
          <div className="modal persona-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>🎭 בחר פרסונה</h2>
              <button className="btn-close" onClick={() => setShowPersonaModal(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body persona-options">
              <button 
                className={`persona-option ${persona === 'student' ? 'active' : ''}`}
                onClick={() => { setPersona('student'); setShowPersonaModal(false); }}
              >
                <div className="persona-icon">🎓</div>
                <h3>תלמיד</h3>
                <p>עבודה על ביטחון עצמי ומיומנויות חברתיות בשיעור</p>
              </button>
              <button 
                className={`persona-option ${persona === 'professional' ? 'active' : ''}`}
                onClick={() => { setPersona('professional'); setShowPersonaModal(false); }}
              >
                <div className="persona-icon">💼</div>
                <h3>מקצועי</h3>
                <p>שיפור כישורים במקום העבודה והעלאת ביטחון</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? '✏️ עריכת משימה' : '✨ משימה חדשה'}</h2>
              <button className="btn-close" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>כותרת המשימה</label>
                <input
                  type="text"
                  placeholder="למשל: ללמוד מתמטיקה..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  onKeyPress={(e) => e.key === 'Enter' && addTask()}
                />
              </div>
              <div className="form-group">
                <label>תיאור (אופציונלי)</label>
                <textarea
                  placeholder="הוסף פרטים על המשימה..."
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>נקודות</label>
                <input
                  type="number"
                  min="5"
                  max="100"
                  step="5"
                  value={formData.points}
                  onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeModal}>ביטול</button>
              <button className="btn btn-primary" onClick={addTask}>
                {editingId ? '💾 שמור' : '➕ הוסף'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
