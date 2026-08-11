import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Layout, Target, BookOpen, BarChart3, User, Award, ShieldCheck, Sparkles } from 'lucide-react'
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
    <aside className="sidebar">
      <div className="brand-lockup">
        <span className="brand-mark"><Sparkles size={18} /></span>
        <div>
          <h1>BoostMe</h1>
          <p>ביטחון מקצועי, כל יום</p>
        </div>
      </div>
      <nav className="sidebar-nav" aria-label="ניווט ראשי">
        {links.map(link => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => `sidebar-link${isActive ? ' is-active' : ''}`}
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-tip">
        <span>הצעד הבא שלך</span>
        <strong>5 דקות של נוכחות</strong>
      </div>
    </aside>
  )
}

export default Sidebar
