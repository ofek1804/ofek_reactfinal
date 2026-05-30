import React from 'react'
import BadgeIcon from '../components/BadgeIcon.jsx'
import { useTasks } from '../context/TasksContext.jsx'

function Achievements() {
  const { completedTasks, taskProgress } = useTasks()

  const earned = []
  if (completedTasks >= 1) earned.push({ title: 'התחלה מבוססת', subtitle: 'הושלמה המשימה הראשונה' })
  if (completedTasks >= 3) earned.push({ title: 'שליט שיחה', subtitle: 'הושלמו 3 אתגרים' })
  if (taskProgress >= 80) earned.push({ title: 'רצף חוסן', subtitle: 'אחוז התקדמות מעל 80%' })

  return (
    <div>
      <section className="card">
        <h2 className="section-title">הישגים מקצועיים</h2>
        <p className="section-subtitle">תגים, נקודות והתמדה שבונים את האמון שלך בעבודה.</p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 24 }}>
          {earned.length === 0 && <p style={{ color: '#616161' }}>עוד לא הושגו הישגים — סמן משימות כהושלמו כדי להרוויח תגיות.</p>}
          {earned.map(item => (
            <BadgeIcon key={item.title} title={item.title} subtitle={item.subtitle} />
          ))}
        </div>
      </section>

      <section className="card" style={{ marginTop: 24 }}>
        <h3>טיפים לשימור הצלחה</h3>
        <ul style={{ marginTop: 16, display: 'grid', gap: 12, paddingLeft: 18 }}>
          <li>הגדר מטרה לפני כל משימה וסקור תוצאות בסוף היום.</li>
          <li>שתף הצלחות עם חברי צוות ותבקש משוב ממוקד.</li>
          <li>שמור על רצף יומי של משימות קצרות וברורות.</li>
        </ul>
      </section>
    </div>
  )
}

export default Achievements
