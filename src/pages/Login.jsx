import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

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

  return (
    <div className="card" style={{ maxWidth: 520, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 16 }}>כניסה</h1>
      <p style={{ color: '#616161', marginBottom: 24 }}>התחבר כדי לגלות את כל הכלים, הקורסים והקהילה של BoostMe.</p>
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
