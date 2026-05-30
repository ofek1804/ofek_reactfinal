import React from 'react'
import { Link } from 'react-router-dom'

function ForgotPassword() {
  return (
    <div className="card" style={{ maxWidth: 520, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 16 }}>שחזור סיסמה</h1>
      <p style={{ color: '#616161', marginBottom: 24 }}>הזן את כתובת המייל שלך ונשלח לך קישור לאיפוס סיסמה.</p>
      <form style={{ display: 'grid', gap: 16 }}>
        <label>
          אימייל
          <input type="email" placeholder="name@example.com" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ccc' }} />
        </label>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>שלח קישור</button>
      </form>
      <p style={{ marginTop: 24, textAlign: 'center' }}>
        חזרת? <Link to="/login">התחבר</Link>
      </p>
    </div>
  )
}

export default ForgotPassword
