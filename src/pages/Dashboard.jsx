import React, { useState } from 'react'
import StatsCard from '../components/StatsCard.jsx'
import ActivityItem from '../components/ActivityItem.jsx'
import MetroCard from '../components/MetroCard.jsx'
import { useTasks } from '../context/TasksContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

function Dashboard() {
  const { tasks, completedTasks, activeTasks, taskProgress, addTask, deleteTask, toggleTask, updateTaskProof } = useTasks()
  const { user } = useAuth()
  const [title, setTitle] = useState('')
  const [caption, setCaption] = useState('')
  const [difficulty, setDifficulty] = useState('קל')
  const [proofType, setProofType] = useState('checklist')

  const handleAdd = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    addTask({ title: title.trim(), caption: caption.trim(), difficulty, proofType })
    setTitle('')
    setCaption('')
    setProofType('checklist')
  }

  return (
    <div>
      <section className="card">
        <h2 className="section-title">דאשבורד אישי</h2>
        <p className="section-subtitle">כל הכלים לעשייה מקצועית והתמקצעות בביטחון עצמי.</p>
        {user && (
          <div style={{ marginTop: 12, padding: 16, borderRadius: 16, background: '#F4F9F8' }}>
            <strong style={{ display: 'block', marginBottom: 6 }}>שלום, {user.name}</strong>
            <span style={{ color: '#616161' }}>{user.title} ב-{user.company}</span>
          </div>
        )}
        <div className="grid-2" style={{ marginTop: 24 }}>
          <StatsCard label="משימות יומיות" value={tasks.length} />
          <StatsCard label="משימות הושלמו" value={completedTasks} />
          <StatsCard label="משימות נשארו" value={activeTasks} />
          <StatsCard label="התקדמות" value={`${taskProgress}%`} />
        </div>
      </section>

      <section className="card" style={{ marginTop: 24 }}>
        <h3>אתגר היום</h3>
        <p style={{ color: '#616161' }}>המשימות מסומנות לפי סוג ביצוע: תוצר להעלאה/קישור או checklist אישי.</p>
        <div style={{ display: 'grid', gap: 18, marginTop: 24 }}>
          <div style={{ background: '#F5F9F9', borderRadius: 12, padding: 22 }}>
            <strong>התקדמות השבועית:</strong>
            <p style={{ margin: '12px 0 0', color: '#616161' }}>השלמת {completedTasks} מתוך {tasks.length} משימות.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 18, boxShadow: '0 12px 26px rgba(0,0,0,0.04)' }}>
              <h4 style={{ margin: 0 }}>משימה עם תוצר</h4>
              <p style={{ margin: '12px 0 0', color: '#616161' }}>כאשר נדרש קובץ או קישור, המשתמש רואה שדה ייעודי לפני סימון השלמה.</p>
            </div>
            <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 18, boxShadow: '0 12px 26px rgba(0,0,0,0.04)' }}>
              <h4 style={{ margin: 0 }}>משימה עצמית</h4>
              <p style={{ margin: '12px 0 0', color: '#616161' }}>כאשר המשימה היא פעולה אישית, מוצג טקסט מנחה קצר לסימון עצמי.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="card" style={{ marginTop: 24 }}>
        <h3>משימות</h3>
        <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 150px 190px auto', gap: 8, marginTop: 12 }}>
          <input placeholder="כותרת משימה" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input placeholder="תיאור קצר (אופציונלי)" value={caption} onChange={(e) => setCaption(e.target.value)} />
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option>קל</option>
            <option>בינוני</option>
            <option>קשה</option>
          </select>
          <select value={proofType} onChange={(e) => setProofType(e.target.value)}>
            <option value="checklist">Checklist אישי</option>
            <option value="link">דורש קישור/קובץ</option>
            <option value="text">דורש תיאור תוצר</option>
          </select>
          <button className="btn btn-primary">הוסף</button>
        </form>

        <div style={{ display: 'grid', gap: 12, marginTop: 18 }}>
          {tasks.map(task => (
            <MetroCard
              key={task.id}
              title={task.title}
              caption={task.caption}
              tag={task.difficulty}
              proofType={task.proofType}
              proofLabel={task.proofLabel}
              proofValue={task.proofValue}
              guidance={task.guidance}
              completed={task.completed}
              onProofChange={(proofValue) => updateTaskProof(task.id, proofValue)}
              onToggle={() => toggleTask(task.id)}
              onDelete={() => deleteTask(task.id)}
            />
          ))}
        </div>
      </section>

      <section className="card" style={{ marginTop: 24 }}>
        <h3>פעילויות אחרונות</h3>
        <div style={{ display: 'grid', gap: 14, marginTop: 16 }}>
          <ActivityItem title="פיתוח תסריט שיחה" subtitle="עבודה על פתיחה אסרטיבית בפני לקוח" />
          <ActivityItem title="משוב צוות" subtitle="סיכום תוצאות עם חברי צוות ושיפור פרזנטציה" />
          <ActivityItem title="קביעת רשתות" subtitle="פנייה ל-3 שותפים חדשים באופן מקצועי" />
        </div>
      </section>
    </div>
  )
}

export default Dashboard
