import React from 'react'

function StreakBadge({ days }) {
  return (
    <div style={{ background: '#E8F5E9', borderRadius: 9999, padding: '10px 16px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <strong style={{ color: '#388E3C' }}>{days} ימים רצף</strong>
    </div>
  )
}

export default StreakBadge
