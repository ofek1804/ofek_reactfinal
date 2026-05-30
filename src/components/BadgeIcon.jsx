import React from 'react'

function BadgeIcon({ title, subtitle }) {
  return (
    <div className="card" style={{ width: 240, padding: 18 }}>
      <strong style={{ marginBottom: 8, display: 'block' }}>{title}</strong>
      <p style={{ color: '#616161', margin: 0 }}>{subtitle}</p>
    </div>
  )
}

export default BadgeIcon
