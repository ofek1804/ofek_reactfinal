import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function Register() {
  const { user, signUp } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
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

    const { error } = await signUp({ name, email, password })
    if (error) {
      setError(error)
      return
    }

    navigate('/dashboard')
  }

  return (
    <div className="card" style={{ maxWidth: 520, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 16 }}>הרשמה</h1>
      <p style={{ color: '#616161', marginBottom: 24 }}>צור חשבון מקצועי וגש לכל התכנים והאתגרים של BoostMe.</p>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
        <label>
          שם מלא
          <input
            type="text"
            placeholder="שם מלא"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ccc' }}
          />
        </label>
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
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>הרשם</button>
      </form>
      <p style={{ marginTop: 24, textAlign: 'center' }}>
        יש לך חשבון? <Link to="/login">התחבר</Link>
      </p>
    </div>
  )
}

export default Register
