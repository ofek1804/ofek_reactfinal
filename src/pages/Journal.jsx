import React, { useState } from 'react'
import { useTasks } from '../context/TasksContext.jsx'

function Journal() {
  const [text, setText] = useState('')
  const [entries, setEntries] = useState([])
  const { tasks } = useTasks()

  const saveEntry = () => {
    if (text.trim()) {
      setEntries([{ id: Date.now(), content: text.trim(), date: new Date().toLocaleDateString('he-IL') }, ...entries])
      setText('')
    }
  }

  const completed = tasks.filter(t => t.completed).sort((a, b) => (b.completedAt || '').localeCompare(a.completedAt || ''))

  return (
    <div>
      <section className="card">
        <h2 className="section-title">יומן הצלחות</h2>
        <p className="section-subtitle">תעד נצחונות קטנים ותרגל דגש על השיפור המקצועי.</p>
        <div style={{ marginTop: 24, display: 'grid', gap: 16 }}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="מה הייתה ההישג המקצועי שלך היום?"
            style={{ width: '100%', minHeight: 180, borderRadius: 12, border: '1px solid #DDD', padding: 16 }}
          />
          <button className="btn btn-primary" type="button" onClick={saveEntry}>שמור את ההישג</button>
        </div>
      </section>

      <section className="card" style={{ marginTop: 24 }}>
        <h3>משימות שהושלמו</h3>
        {completed.length === 0 && <p style={{ color: '#616161' }}>טרם הושלמו משימות.</p>}
        <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
          {completed.map(t => (
            <div key={t.id} style={{ background: '#F9F9F9', borderRadius: 12, padding: 12, display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 700 }}>{t.title}</div>
                <div style={{ color: '#616161', fontSize: 13 }}>{t.caption}</div>
              </div>
              <div style={{ color: '#616161', fontSize: 12 }}>{t.completedAt ? new Date(t.completedAt).toLocaleString('he-IL') : ''}</div>
            </div>
          ))}
        </div>
      </section>

      {entries.length > 0 && (
        <section className="card" style={{ marginTop: 24 }}>
          <h3>רשומות אישיות</h3>
          <div style={{ display: 'grid', gap: 14, marginTop: 16 }}>
            {entries.map(entry => (
              <div key={entry.id} style={{ background: '#F9F9F9', borderRadius: 12, padding: 18 }}>
                <small style={{ color: '#616161' }}>{entry.date}</small>
                <p style={{ marginTop: 10 }}>{entry.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default Journal
