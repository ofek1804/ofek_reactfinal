import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)
const STORAGE_KEY = 'boostme_auth_user'
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@test.com'

export const DEMO_USERS = [
  {
    role: 'admin',
    label: 'Admin',
    email: 'admin@test.com',
    password: 'Admin123!',
    name: 'Admin',
    isAdmin: true,
    company: 'BoostMe',
    title: 'מנהל מערכת',
    bio: 'משתמש דמו לניהול ובדיקת הרשאות המערכת.',
    phone: '+972-50-0000001',
    industry: 'ניהול מערכת'
  },
  {
    role: 'user',
    label: 'User',
    email: 'user@test.com',
    password: 'User123!',
    name: 'משתמש בדיקה',
    isAdmin: false,
    company: 'BoostMe',
    title: 'משתמש מקצועי',
    bio: 'משתמש דמו לבדיקת תהליך משתמש מלא.',
    phone: '+972-50-1234567',
    industry: 'מנהיגות עסקית'
  }
]

function createUserData({
  name,
  email,
  isAdmin = false,
  company = 'BoostMe',
  title = 'מומחה לניהול',
  bio = 'מפתח מיומן בביטחון עסקי',
  avatarUrl = '',
  phone = '',
  industry = 'ניהול מקצועי'
}) {
  return {
    email: email.trim().toLowerCase(),
    name: name.trim(),
    isAdmin,
    company,
    title,
    bio,
    avatarUrl,
    phone,
    industry
  }
}

function findDemoUser(email, password) {
  const normalized = email.trim().toLowerCase()
  return DEMO_USERS.find((demoUser) => demoUser.email === normalized && demoUser.password === password)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        setUser(JSON.parse(raw))
      }
    } catch (error) {
      console.warn('Unable to read auth state', error)
    }
  }, [])

  const persistUser = (nextUser) => {
    setUser(nextUser)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
  }

  const signIn = async ({ email, password }) => {
    if (!email || !password) {
      return { error: 'נא למלא אימייל וסיסמה' }
    }

    const demoUser = findDemoUser(email, password)
    if (demoUser) {
      const nextUser = createUserData(demoUser)
      persistUser(nextUser)
      return { user: nextUser }
    }

    const normalized = email.trim().toLowerCase()
    const isAdmin = normalized === ADMIN_EMAIL.toLowerCase()
    const nextUser = createUserData({
      name: isAdmin ? 'Admin' : 'משתמש מקצועי',
      email: normalized,
      isAdmin,
      company: isAdmin ? 'BoostMe Admin' : 'BoostMe',
      title: isAdmin ? 'מנהל מערכת' : 'מומחה בפיתוח מנהיגות',
      bio: isAdmin ? 'אחראי ניהול מערכת בעל גישה אסטרטגית' : 'מפתח מיומן בביטחון עסקי',
      avatarUrl: '',
      phone: isAdmin ? '+972-50-0000001' : '+972-50-1234567',
      industry: isAdmin ? 'ניהול מערכת' : 'מנהיגות עסקית'
    })
    persistUser(nextUser)
    return { user: nextUser }
  }

  const signUp = async ({ name, email, password }) => {
    if (!name || !email || !password) {
      return { error: 'נא למלא שם, אימייל וסיסמה' }
    }
    const normalized = email.trim().toLowerCase()
    const isAdmin = normalized === ADMIN_EMAIL.toLowerCase()
    const nextUser = createUserData({
      name,
      email: normalized,
      isAdmin,
      company: 'BoostMe',
      title: isAdmin ? 'מנהל מערכת' : 'משתמש מקצועי',
      bio: 'מפתח מיומן בביטחון עסקי',
      avatarUrl: '',
      phone: '+972-50-1234567',
      industry: 'מנהיגות עסקית'
    })
    persistUser(nextUser)
    return { user: nextUser }
  }

  const updateProfile = async (updates) => {
    setUser((prev) => {
      if (!prev) return prev
      const nextUser = {
        ...prev,
        ...updates,
        email: updates.email ? updates.email.trim().toLowerCase() : prev.email,
        name: updates.name ? updates.name.trim() : prev.name,
        company: updates.company ? updates.company.trim() : prev.company,
        title: updates.title ? updates.title.trim() : prev.title,
        bio: updates.bio !== undefined ? updates.bio.trim() : prev.bio,
        avatarUrl: updates.avatarUrl !== undefined ? updates.avatarUrl.trim() : prev.avatarUrl,
        phone: updates.phone !== undefined ? updates.phone.trim() : prev.phone,
        industry: updates.industry !== undefined ? updates.industry.trim() : prev.industry
      }
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
      return nextUser
    })
  }

  const signOut = async () => {
    setUser(null)
    window.localStorage.removeItem(STORAGE_KEY)
  }

  const value = useMemo(() => ({ user, isAdmin: Boolean(user?.isAdmin), signIn, signUp, signOut, updateProfile }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
