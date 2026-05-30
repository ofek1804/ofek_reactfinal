
import React from 'react'
import { Link } from 'react-router-dom'
import { useAppConfig } from '../context/AppConfigContext.jsx'

function Home() {
  const { config } = useAppConfig()

  return (
    <div>
      <section className="hero-section">
        <div>
          <span className="hero-pretitle">BoostMe</span>
          <h1 className="hero-title">{config.heroTitle}</h1>
          <p className="hero-text">{config.heroSubtitle}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
            <Link to="/register" className="btn btn-primary">{config.heroCta}</Link>
            <Link to="/dashboard" className="btn btn-secondary">{config.heroSecondaryCta}</Link>
          </div>
        </div>
        <div className="hero-card-grid">
          <div className="hero-card">
            <h3>קורסים עסקיים</h3>
            <p>תוכן מקצועי לחיזוק הביטחון בהצגה, ניהול ושיחה.</p>
          </div>
          <div className="hero-card">
            <h3>קהילה מובילה</h3>
            <p>פורומים פרטיים, משלוח חומרים ותמיכה מקצועית.</p>
          </div>
          <div className="hero-card">
            <h3>כלים להורדה</h3>
            <p>מדריכים, צ'קליסטים ותרגילים מעשיים קריירה.</p>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 28 }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <h3 style={{ margin: 0 }}>מוכן להמשיך?</h3>
            <p style={{ margin: '8px 0 0', color: '#616161' }}>גש ישירות לדאשבורד האישי שלך והתחל במשימות המותאמות.</p>
          </div>
          <div>
            <Link to="/dashboard" className="btn btn-cta pulse" style={{ minWidth: 160, padding: '14px 20px' }}>פתח את הדאשבורד</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
