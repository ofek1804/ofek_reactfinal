import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function Landing() {
  const { user } = useAuth()

  return (
    <div style={{ maxWidth: 980, margin: '40px auto' }}>
      <section className="card hero-section" style={{ padding: 32 }}>
        <div>
          <span className="hero-pretitle">BoostMe</span>
          <h1 className="hero-title">הכנס לעולם של ביטחון מקצועי</h1>
          <p className="hero-text">פלטפורמה לעסקים ולמנהלים עם כלים פרקטיים לחיזוק נוכחות, שיפור תקשורת וקידום קריירה.</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
            <Link to={user ? '/dashboard' : '/login'} className="btn btn-primary">
              {user ? 'עבור לדאשבורד' : 'התחבר'}
            </Link>
            {!user && (
              <Link to="/register" className="btn btn-secondary">הרשמה</Link>
            )}
          </div>
        </div>
        <div className="hero-card" style={{ padding: 20 }}>
          <h3>מה תקבל</h3>
          <ul>
            <li>אתגרים ממוקדים להעלאת הביטחון</li>
            <li>קורסים עסקיים וניהוליים</li>
            <li>קהילה מקצועית ותמיכה</li>
          </ul>
        </div>
      </section>

      <section style={{ marginTop: 24 }}>
        <div className="card" style={{ padding: 20 }}>
          <h3>למה BoostMe?</h3>
          <p style={{ color: '#616161' }}>כלים מדידים, הדרכה ממוקדת, וקהילה שמבינה מנהיגות — התחבר, למד והשתפר.</p>
        </div>
      </section>
    </div>
  )
}

export default Landing
