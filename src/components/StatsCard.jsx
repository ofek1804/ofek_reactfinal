import React from 'react'

function StatsCard({ label, value }) {
  return (
    <div className="card" style={{ minHeight: 124, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <span style={{ color: '#616161' }}>{label}</span>
      <strong style={{ fontSize: 32 }}>{value}</strong>
    </div>
  )
}

export default StatsCard
