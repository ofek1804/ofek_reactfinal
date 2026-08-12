import React from 'react'

function MetroCard({ title, caption, tag, completed, proofType, proofLabel, proofValue, guidance, onProofChange, onToggle, onDelete }) {
  const requiresProof = proofType && proofType !== 'checklist'
  const canComplete = !requiresProof || Boolean(proofValue?.trim()) || completed

  return (
    <div className="card" style={{ padding: 24, opacity: completed ? 0.75 : 1, position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14, marginBottom: 14 }}>
        <div>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <span style={{ color: '#616161', fontSize: 14 }}>{caption}</span>
        </div>
        <span style={{ color: '#2196F3', fontWeight: 700 }}>{tag}</span>
      </div>

      <div style={{ padding: 14, borderRadius: 12, background: '#F5F9F9', color: '#424242', marginTop: 14 }}>
        <strong style={{ display: 'block', marginBottom: 6 }}>{proofLabel || 'סימון עצמי'}</strong>
        <span style={{ fontSize: 14 }}>{guidance || 'לאחר ביצוע המשימה באופן עצמאי, סמן V להמשך.'}</span>
        {requiresProof && (
          <input
            value={proofValue || ''}
            onChange={(e) => onProofChange?.(e.target.value)}
            placeholder={proofType === 'link' ? 'https://...' : 'תיאור קצר או קישור לתוצר'}
            style={{ width: '100%', marginTop: 12, padding: 12, borderRadius: 8, border: '1px solid #ccd8d7' }}
          />
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginTop: 20 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={onToggle}
            disabled={!canComplete}
            className={completed ? 'btn btn-secondary' : 'btn btn-primary'}
            style={{ width: 'auto', opacity: canComplete ? 1 : 0.55 }}
          >
            {completed ? 'בטל' : 'סמן כהושלם'}
          </button>
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="btn btn-ghost"
              style={{ width: 'auto', color: '#D32F2F', border: '1px solid #F2B8B8' }}
            >
              מחק
            </button>
          )}
        </div>
        {completed && <span style={{ color: '#388E3C', fontWeight: 700 }}>הושלם</span>}
      </div>
    </div>
  )
}

export default MetroCard
