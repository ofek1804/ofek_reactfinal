import React from 'react'

function ActivityItem({ title, subtitle }) {
  return (
    <div style={{ background: '#F9F9F9', borderRadius: 12, padding: 18, boxShadow: '0 12px 30px rgba(0,0,0,0.04)' }}>
      <h4 style={{ margin: 0, fontSize: 18 }}>{title}</h4>
      <p style={{ margin: '8px 0 0', color: '#616161' }}>{subtitle}</p>
    </div>
  )
}

export default ActivityItem
