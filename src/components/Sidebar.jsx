import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Layout, Target, BookOpen, BarChart3, User, Settings, Award, ShieldCheck, Users } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

function Sidebar() {
  const { user, isAdmin } = useAuth()

  const publicLinks = [
    { path: '/', label: 'בית', icon: <Home size={18} /> },
    { path: '/home', label: 'סקירה', icon: <Layout size={18} /> }
  ]

  const protectedLinks = [
    { path: '/dashboard', label: 'דאשבורד', icon: <Layout size={18} /> },
    { path: '/challenges', label: 'אתגרים', icon: <Target size={18} /> },
    { path: '/journal', label: 'יומן', icon: <BookOpen size={18} /> },
    { path: '/progress', label: 'התקדמות', icon: <BarChart3 size={18} /> },
    { path: '/profile', label: 'פרופיל', icon: <User size={18} /> },
    { path: '/achievements', label: 'הישגים', icon: <Award size={18} /> }
  ]

  const links = user ? [...publicLinks, ...protectedLinks] : publicLinks
  if (user && isAdmin) links.push({ path: '/admin', label: 'מנהל', icon: <ShieldCheck size={18} /> })

  return (
    <aside style={{ background: '#FFFFFF', borderRight: '1px solid #E0E0E0', minHeight: '100vh', padding: '24px 16px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ margin: 0, fontSize: 24 }}>BoostMe</h1>
        <p style={{ margin: '8px 0 0', color: '#616161' }}>ניהול ביטחון עצמי לעסקים</p>
      </div>
      <nav style={{ display: 'grid', gap: 8 }}>
        {links.map(link => (
          <NavLink
            key={link.path}
            to={link.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 16px',
              borderRadius: 12,
              color: isActive ? '#FFFFFF' : '#212121',
              background: isActive ? '#4CAF50' : 'transparent',
              fontWeight: isActive ? 700 : 500,
              textDecoration: 'none'
            })}
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
