import React, { useState } from 'react'
import InputField from '../components/InputField.jsx'

function Settings() {
  const [reminderTime, setReminderTime] = useState('09:00')
  const [dailySummary, setDailySummary] = useState(true)

  return (
    <div>
      <section className="card">
        <h2 className="section-title">הגדרות אישיות</h2>
        <p className="section-subtitle">התאם את החוויה המקצועית לפי זמן ותעדוף.</p>
        <div style={{ display: 'grid', gap: 18, marginTop: 24 }}>
          <InputField label="שם תצוגה" placeholder="הכנס שם תצוגה" />
          <InputField label="כתובת מייל" placeholder="הכנס אימייל" />
          <div style={{ display: 'grid', gap: 12 }}>
            <label style={{ fontWeight: 700 }}>שעת תזכורת יומית</label>
            <input type="time" value={reminderTime} onChange={(e) => setReminderTime(e.target.value)} style={{ padding: 12, borderRadius: 12, border: '1px solid #E0E0E0' }} />
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            <label style={{ fontWeight: 700 }}>סיכום יומי</label>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className={`btn ${dailySummary ? 'btn-primary' : 'btn-secondary'}`} type="button" onClick={() => setDailySummary(true)}>פעיל</button>
              <button className={`btn ${!dailySummary ? 'btn-primary' : 'btn-secondary'}`} type="button" onClick={() => setDailySummary(false)}>כבוי</button>
            </div>
            <p style={{ margin: 0, color: '#616161' }}>קבל סיכום של ההישגים והמשימות בכל ערב.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Settings
