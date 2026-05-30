import React, { useEffect, useState } from 'react'
import { useAppConfig } from '../context/AppConfigContext.jsx'

function Admin() {
  const { config, updateConfig } = useAppConfig()
  const [heroTitle, setHeroTitle] = useState(config.heroTitle)
  const [heroSubtitle, setHeroSubtitle] = useState(config.heroSubtitle)
  const [heroCta, setHeroCta] = useState(config.heroCta)
  const [heroSecondaryCta, setHeroSecondaryCta] = useState(config.heroSecondaryCta)
  const [articles, setArticles] = useState(config.articles)
  const [courses, setCourses] = useState(config.courses)
  const [status, setStatus] = useState('')

  useEffect(() => {
    setHeroTitle(config.heroTitle)
    setHeroSubtitle(config.heroSubtitle)
    setHeroCta(config.heroCta)
    setHeroSecondaryCta(config.heroSecondaryCta)
    setArticles(config.articles)
    setCourses(config.courses)
  }, [config])

  const handleSave = () => {
    updateConfig({ heroTitle, heroSubtitle, heroCta, heroSecondaryCta, articles, courses })
    setStatus('השינויים נשמרו בהצלחה')
    setTimeout(() => setStatus(''), 3000)
  }

  const updateArticle = (index, field, value) => {
    setArticles((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  const updateCourse = (index, field, value) => {
    setCourses((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  return (
    <div>
      <section className="card">
        <h2 className="section-title">מרכז ניהול</h2>
        <p className="section-subtitle">ערוך את התוכן שמופיע בדף הבית והעבר עדכונים לכל המשתמשים.</p>
        <div style={{ marginTop: 24, display: 'grid', gap: 22 }}>
          <div className="card" style={{ padding: 22 }}>
            <h3>עריכת תוכן ראשית</h3>
            <label style={{ display: 'grid', gap: 8, marginTop: 16 }}>
              כותרת ראשית
              <input value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid #E0E0E0' }} />
            </label>
            <label style={{ display: 'grid', gap: 8, marginTop: 16 }}>
              תת-כותרת
              <textarea value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} rows={4} style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid #E0E0E0' }} />
            </label>
            <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
              <label>
                כפתור קריאה לפעולה ראשי
                <input value={heroCta} onChange={(e) => setHeroCta(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid #E0E0E0' }} />
              </label>
              <label>
                כפתור משני
                <input value={heroSecondaryCta} onChange={(e) => setHeroSecondaryCta(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid #E0E0E0' }} />
              </label>
            </div>
          </div>

          <div className="card" style={{ padding: 22 }}>
            <h3>עריכת מאמרים</h3>
            {articles.map((article, index) => (
              <div key={article.id} style={{ display: 'grid', gap: 10, marginBottom: 16, padding: 14, borderRadius: 14, background: '#FCFCFC' }}>
                <label>
                  כותרת
                  <input value={article.title} onChange={(e) => updateArticle(index, 'title', e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid #E0E0E0' }} />
                </label>
                <label>
                  תיאור
                  <textarea value={article.description} onChange={(e) => updateArticle(index, 'description', e.target.value)} rows={3} style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid #E0E0E0' }} />
                </label>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: 22 }}>
            <h3>עריכת קורסים</h3>
            {courses.map((course, index) => (
              <div key={course.id} style={{ display: 'grid', gap: 10, marginBottom: 16, padding: 14, borderRadius: 14, background: '#FCFCFC' }}>
                <label>
                  כותרת קורס
                  <input value={course.title} onChange={(e) => updateCourse(index, 'title', e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid #E0E0E0' }} />
                </label>
                <label>
                  תיאור
                  <textarea value={course.description} onChange={(e) => updateCourse(index, 'description', e.target.value)} rows={3} style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid #E0E0E0' }} />
                </label>
                <label>
                  מחיר
                  <input value={course.price} onChange={(e) => updateCourse(index, 'price', e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid #E0E0E0' }} />
                </label>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button className="btn btn-primary" type="button" onClick={handleSave}>שמור שינויים</button>
            {status && <span style={{ color: '#388E3C', fontWeight: 700 }}>{status}</span>}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Admin
