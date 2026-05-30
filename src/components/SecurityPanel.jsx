import React from 'react'

function SecurityPanel() {
  return (
    <div>
      <h3 style={{ marginTop: 0 }}>אבטחה והרשאות</h3>
      <div style={{ display: 'grid', gap: 16 }}>
        <div style={{ background: '#F9F9F9', borderRadius: 12, padding: 18 }}>
          <strong>זיהוי דו-שלבי</strong>
          <p style={{ margin: '8px 0 0', color: '#616161' }}>הפעלת אבטחה נוספת לשמירה על החשבון שלך.</p>
        </div>
        <div style={{ background: '#F9F9F9', borderRadius: 12, padding: 18 }}>
          <strong>עדכון סיסמה</strong>
          <p style={{ margin: '8px 0 0', color: '#616161' }}>שנה סיסמה ועדכן את אישורי הגישה שלך.</p>
        </div>
      </div>
    </div>
  )
}

export default SecurityPanel
