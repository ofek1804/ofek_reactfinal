import React from 'react'
import StatsCard from '../components/StatsCard.jsx'
import BadgeIcon from '../components/BadgeIcon.jsx'
import { useTasks } from '../context/TasksContext.jsx'

function Progress() {
  const { tasks, completedTasks, taskProgress } = useTasks()

  const earnedBadges = []
  if (completedTasks >= 1) earnedBadges.push({ title: 'מתחיל פעיל', subtitle: 'השלמת המשימה הראשונה' })
  if (completedTasks >= 3) earnedBadges.push({ title: 'מנהיג צוות', subtitle: 'השלמת 3 אתגרים' })
  if (taskProgress >= 75) earnedBadges.push({ title: 'רצף ניצחון', subtitle: 'אחוז התקדמות גבוה' })

  return (
    <div>
      <section className="card">
        <h2 className="section-title">התקדמות אישית</h2>
        <p className="section-subtitle">מדדי צמיחה יומיים וחודשיים בניהול ביטחון מקצועי.</p>
        <div className="grid-2" style={{ marginTop: 24 }}>
          <StatsCard label="משימות כלליות" value={tasks.length} />
          <StatsCard label="משימות הושלמו" value={completedTasks} />
          <StatsCard label="אחוז התקדמות" value={`${taskProgress}%`} />
          <StatsCard label="פעילות אחרונה" value={tasks.length ? tasks[0].title : '-'} />
        </div>
      </section>

      <section className="card" style={{ marginTop: 24 }}>
        <h3>תגיות הרוויחו</h3>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 18 }}>
          {earnedBadges.length === 0 && <p style={{ color: '#616161' }}>טרם הושגו תגיות — סמן משימות כהושלמו כדי להרוויח תגיות.</p>}
          {earnedBadges.map(item => (
            <BadgeIcon key={item.title} title={item.title} subtitle={item.subtitle} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Progress
