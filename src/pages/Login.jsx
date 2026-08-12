import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DEMO_USERS, useAuth } from '../context/AuthContext.jsx'

function Login() {
  const { user, signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const { error } = await signIn({ email, password })
    if (error) {
      setError(error)
      return
    }

    navigate('/dashboard')
  }

  const loginAsDemo = async (demoUser) => {
    setError('')
    setEmail(demoUser.email)
    setPassword(demoUser.password)
    const { error } = await signIn({ email: demoUser.email, password: demoUser.password })
    if (error) {
      setError(error)
      return
    }
    navigate('/dashboard')
  }

  return (
    <div className="card" style={{ maxWidth: 560, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 16 }}>כניסה</h1>
      <p style={{ color: '#616161', marginBottom: 24 }}>התחבר כדי לגלות את כל הכלים, הקורסים והקהילה של BoostMe.</p>

      <div style={{ display: 'grid', gap: 10, marginBottom: 22 }}>
        <strong>משתמשי בדיקה מוכנים</strong>
        <div style={{ display: 'grid', gap: 10 }}>
          {DEMO_USERS.filter((demoUser) => !demoUser.isAdmin).map((demoUser) => (
            <button
              key={demoUser.email}
              type="button"
              className="btn btn-primary"
              onClick={() => loginAsDemo(demoUser)}
              style={{ width: '100%' }}
            >
              כניסה כמשתמש בדיקה
            </button>
          ))}
        </div>
        <div style={{ display: 'grid', gap: 6, padding: 14, borderRadius: 12, background: '#F5F9F9', color: '#424242', fontSize: 14 }}>
          {DEMO_USERS.filter((demoUser) => !demoUser.isAdmin).map((demoUser) => (
            <span key={demoUser.email}>
              <strong>User:</strong> {demoUser.email} / {demoUser.password}
            </span>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
        <label>
          אימייל
          <input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ccc' }}
          />
        </label>
        <label>
          סיסמה
          <input
            type="password"
            placeholder="סיסמה"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ccc' }}
          />
        </label>
        {error && <div style={{ color: '#D32F2F' }}>{error}</div>}
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>התחבר</button>
      </form>
      <div style={{ marginTop: 18, textAlign: 'center' }}>
        <Link to="/forgot-password">שכחת סיסמה?</Link>
      </div>
      <p style={{ marginTop: 24, textAlign: 'center' }}>
        אין לך חשבון? <Link to="/register">הירשם</Link>
      </p>
    </div>
  )
}

export default Login
