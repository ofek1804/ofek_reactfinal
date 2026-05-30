import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function Navbar() {
  const { user, isAdmin, signOut } = useAuth()

  return (
    <header className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div>
          <span style={{ color: '#4CAF50', fontWeight: 700 }}>BoostMe</span>
          <h2 style={{ margin: '8px 0 0', fontSize: 24 }}>פלטפורמה לניהול ביטחון מקצועי</h2>
        </div>
      </Link>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {user ? (
          <>
            <span style={{ color: '#616161' }}>{user.name}{isAdmin ? ' (מנהל)' : ''}</span>
            <button
              type="button"
              onClick={signOut}
              style={{ border: '1px solid #E0E0E0', borderRadius: 999, padding: '10px 18px', background: 'white', cursor: 'pointer' }}
            >
              התנתק
            </button>
          </>
        ) : (
          <Link to="/login" style={{ color: '#212121' }}>התחבר</Link>
        )}
      </div>
    </header>
  )
}

export default Navbar
