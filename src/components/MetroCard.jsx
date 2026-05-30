import React from 'react'

function MetroCard({ title, caption, tag, completed, onToggle, onDelete }) {
  return (
    <div className="card" style={{ padding: 24, opacity: completed ? 0.75 : 1, position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <span style={{ color: '#616161', fontSize: 14 }}>{caption}</span>
        </div>
        <span style={{ color: '#2196F3', fontWeight: 700 }}>{tag}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="button"
            onClick={onToggle}
            className={completed ? 'btn btn-secondary' : 'btn btn-primary'}
            style={{ width: 'auto' }}
          >
            {completed ? 'בטל' : 'סמן כהושלם'}
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="btn btn-ghost"
            style={{ width: 'auto', color: '#D32F2F', border: '1px solid #F2B8B8' }}
          >
            מחק
          </button>
        </div>
        {completed && <span style={{ color: '#388E3C', fontWeight: 700 }}>הושלם</span>}
      </div>
    </div>
  )
}

export default MetroCard
