import React from 'react'
import MetroCard from '../components/MetroCard.jsx'
import { useTasks } from '../context/TasksContext.jsx'

function Challenges() {
  const { tasks, toggleTask, completedTasks } = useTasks()

  return (
    <div>
      <section className="card">
        <h2 className="section-title">ספריית אתגרים</h2>
        <p className="section-subtitle">אתגרים ממוקדי קריירה שניתן להתחיל ולסיים בזמן קצר.</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20 }}>
          <div className="card" style={{ flex: '1', minWidth: 240, padding: 20 }}>
            <h3>משימות שהושלמו</h3>
            <strong style={{ fontSize: 28 }}>{completedTasks}</strong>
            <p style={{ marginTop: 10, color: '#616161' }}>עדכון אוטומטי בזמן סימון המשימות.</p>
          </div>
          <div className="card" style={{ flex: '1', minWidth: 240, padding: 20 }}>
            <h3>מעקב התקדמות</h3>
            <p style={{ marginTop: 10, color: '#616161' }}>סמן כל אתגר כהושלם כדי לעקוב אחרי ההתקדמות שלך.</p>
          </div>
        </div>
        <div className="course-grid" style={{ marginTop: 24 }}>
          {tasks.map((task) => (
            <MetroCard
              key={task.id}
              title={task.title}
              caption={task.caption}
              tag={task.difficulty}
              completed={task.completed}
              onToggle={() => toggleTask(task.id)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Challenges
