import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import SecurityPanel from '../components/SecurityPanel.jsx'
import { useTasks } from '../context/TasksContext.jsx'

function Profile() {
  const { user, updateProfile } = useAuth()
  const { tasks, completedTasks, taskProgress } = useTasks()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [company, setCompany] = useState(user?.company || '')
  const [title, setTitle] = useState(user?.title || '')
  const [bio, setBio] = useState(user?.bio || '')
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [industry, setIndustry] = useState(user?.industry || '')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (user) {
      setName(user.name || '')
      setEmail(user.email || '')
      setCompany(user.company || '')
      setTitle(user.title || '')
      setBio(user.bio || '')
      setAvatarUrl(user.avatarUrl || '')
      setPhone(user.phone || '')
      setIndustry(user.industry || '')
    }
  }, [user])

  const recentCompleted = tasks
    .filter(t => t.completed)
    .sort((a, b) => (b.completedAt || '').localeCompare(a.completedAt || ''))
    .slice(0, 5)

  const handleSave = async (event) => {
    event.preventDefault()
    await updateProfile({ name, email, company, title, bio, avatarUrl, phone, industry })
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2500)
  }

  const handleAutoSave = async () => {
    await updateProfile({ name, email, company, title, bio, avatarUrl, phone, industry })
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div>
      <section className="card">
        <h2 className="section-title">פרופיל מקצועי</h2>
        <p className="section-subtitle">שפר את הנראות העסקית שלך ונהל את הרושם המקצועי שלך.</p>
        <div style={{ marginTop: 24, display: 'grid', gap: 18 }}>
          <div style={{ display: 'grid', gap: 14, padding: 22, borderRadius: 20, background: 'var(--surface)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" style={{ width: 66, height: 66, borderRadius: '50%', objectFit: 'cover', border: '2px solid #4CAF50' }} />
                  ) : (
                    <div style={{ width: 66, height: 66, borderRadius: '50%', background: '#E0F2F1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#388E3C', fontWeight: 700 }}>
                      {user?.name?.slice(0, 1) || 'מ'}
                    </div>
                  )}
                  <div>
                    <h3 style={{ margin: 0 }}>{user?.name || 'משתמש'}</h3>
                    <p style={{ margin: '6px 0 0', color: '#616161' }}>{user?.title || 'פרופיל מקצועי'}</p>
                  </div>
                </div>
                <span style={{ background: '#E8F5E9', color: '#388E3C', borderRadius: 999, padding: '8px 14px', fontWeight: 700 }}>
                  {user?.isAdmin ? 'Admin' : 'משתמש'}
                </span>
              </div>

              <form onSubmit={handleSave} style={{ display: 'grid', gap: 12 }}>
                <div style={{ display: 'grid', gap: 8 }}>
                  <label style={{ fontWeight: 700 }}>שם מלא</label>
                  <input value={name} onBlur={handleAutoSave} onChange={(e) => setName(e.target.value)} style={{ padding: 12, borderRadius: 12, border: '1px solid #E0E0E0' }} />
                </div>
                <div style={{ display: 'grid', gap: 8 }}>
                  <label style={{ fontWeight: 700 }}>דוא"ל</label>
                  <input value={email} onBlur={handleAutoSave} onChange={(e) => setEmail(e.target.value)} style={{ padding: 12, borderRadius: 12, border: '1px solid #E0E0E0' }} />
                </div>
                <div style={{ display: 'grid', gap: 8 }}>
                  <label style={{ fontWeight: 700 }}>חברה</label>
                  <input value={company} onBlur={handleAutoSave} onChange={(e) => setCompany(e.target.value)} style={{ padding: 12, borderRadius: 12, border: '1px solid #E0E0E0' }} />
                </div>
                <div style={{ display: 'grid', gap: 8 }}>
                  <label style={{ fontWeight: 700 }}>תפקיד</label>
                  <input value={title} onBlur={handleAutoSave} onChange={(e) => setTitle(e.target.value)} style={{ padding: 12, borderRadius: 12, border: '1px solid #E0E0E0' }} />
                </div>
                <div style={{ display: 'grid', gap: 8 }}>
                  <label style={{ fontWeight: 700 }}>טלפון</label>
                  <input value={phone} onBlur={handleAutoSave} onChange={(e) => setPhone(e.target.value)} placeholder="+972-50-1234567" style={{ padding: 12, borderRadius: 12, border: '1px solid #E0E0E0' }} />
                </div>
                <div style={{ display: 'grid', gap: 8 }}>
                  <label style={{ fontWeight: 700 }}>תחום / ענף</label>
                  <input value={industry} onBlur={handleAutoSave} onChange={(e) => setIndustry(e.target.value)} placeholder="ניהול מקצועי" style={{ padding: 12, borderRadius: 12, border: '1px solid #E0E0E0' }} />
                </div>
                <div style={{ display: 'grid', gap: 8 }}>
                  <label style={{ fontWeight: 700 }}>קצר עליך</label>
                  <textarea value={bio} onBlur={handleAutoSave} onChange={(e) => setBio(e.target.value)} rows={3} style={{ padding: 12, borderRadius: 12, border: '1px solid #E0E0E0', resize: 'vertical' }} />
                </div>
                <div style={{ display: 'grid', gap: 8 }}>
                  <label style={{ fontWeight: 700 }}>קישור תמונת פרופיל (URL)</label>
                  <input value={avatarUrl} onBlur={handleAutoSave} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://..." style={{ padding: 12, borderRadius: 12, border: '1px solid #E0E0E0' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <button type="submit" className="btn btn-primary">שמור פרופיל</button>
                  {saved && <span style={{ color: '#388E3C', fontWeight: 700 }}>השינויים נשמרו!</span>}
                </div>
              </form>
            </div>

            <div style={{ display: 'grid', gap: 8 }}>
              <p style={{ margin: 0 }}><strong>דוא"ל:</strong> {user?.email}</p>
              <p style={{ margin: 0 }}><strong>חברה:</strong> {user?.company}</p>
              <p style={{ margin: 0 }}><strong>תפקיד:</strong> {user?.title}</p>
              {user?.phone && <p style={{ margin: 0 }}><strong>טלפון:</strong> {user.phone}</p>}
              {user?.industry && <p style={{ margin: 0 }}><strong>ענף:</strong> {user.industry}</p>}
              {user?.bio && <p style={{ margin: 0, color: '#616161' }}><strong>עליך:</strong> {user.bio}</p>}
            </div>

            <div style={{ marginTop: 12, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ padding: 12, borderRadius: 12, background: 'white' }}>
                <div style={{ color: '#616161' }}>משימות הושלמו</div>
                <strong style={{ fontSize: 20 }}>{completedTasks}</strong>
              </div>
              <div style={{ padding: 12, borderRadius: 12, background: 'white' }}>
                <div style={{ color: '#616161' }}>אחוז התקדמות</div>
                <strong style={{ fontSize: 20 }}>{taskProgress}%</strong>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: 18 }}>
            <h3 style={{ marginTop: 0 }}>הישגי משימות אחרונים</h3>
            {recentCompleted.length === 0 && <p style={{ color: '#616161' }}>אין משימות שהושלמו עדיין.</p>}
            {recentCompleted.map(t => (
              <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F0F0F0' }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{t.title}</div>
                  <div style={{ color: '#616161', fontSize: 13 }}>{t.caption}</div>
                </div>
                <div style={{ color: '#616161', fontSize: 12 }}>{t.completedAt ? new Date(t.completedAt).toLocaleString('he-IL') : ''}</div>
              </div>
            ))}
          </div>

          <SecurityPanel />
        </div>
      </section>
    </div>
  )
}

export default Profile
