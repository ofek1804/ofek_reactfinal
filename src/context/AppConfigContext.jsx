import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AppConfigContext = createContext(null)
const STORAGE_KEY = 'boostme_app_config'

const defaultConfig = {
  heroTitle: 'תוביל בביטחון, תשיג תוצאות.',
  heroSubtitle: 'אפליקציה לעסקים ומנהלים שמחפשים לצמוח בעוצמה מקצועית באמצעות משימות יומיות, קורסים ממוקדים וקהילה תומכת.',
  heroCta: 'הצטרף לקורס',
  heroSecondaryCta: 'גש לדאשבורד',
  articles: [
    { id: 1, title: 'מצגות עוצמתיות שפותחות עסקאות', description: 'כיצד לבנות מבנה ברור, להעביר אמון ולהוביל תוצאה בכל פגישה.' },
    { id: 2, title: 'ניהול משא ומתן מתוך עוצמה', description: 'גישות שמייצרות תוצאה תוך שמירה על שפה מקצועית ויציבה.' },
    { id: 3, title: 'רשתות מקצועיות איכותיות', description: 'איך ליצור קשרים משמעותיים ולחזק את נראותך בשטח.' }
  ],
  courses: [
    { id: 1, title: 'דיבור בפני קהל', description: 'קורס למנהלים שרוצים להראות סמכות ולהשאיר רושם.', price: '₪349' },
    { id: 2, title: 'מנהיגות עסקית פרקטית', description: 'כלים לבניית נוכחות ושיפור מנהיגות בצוות.', price: '₪399' },
    { id: 3, title: 'נוכחות מקצועית ברשת', description: 'איך לתת תשומת לב למותג האישי ואת התדמית העסקית.', price: '₪299' }
  ]
}

export function AppConfigProvider({ children }) {
  const [config, setConfig] = useState(defaultConfig)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setConfig(JSON.parse(saved))
      }
    } catch (error) {
      console.warn('Failed to load config', error)
    }
  }, [])

  const updateConfig = (partial) => {
    setConfig((prev) => {
      const next = { ...prev, ...partial }
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  const value = useMemo(() => ({ config, updateConfig }), [config])

  return <AppConfigContext.Provider value={value}>{children}</AppConfigContext.Provider>
}

export function useAppConfig() {
  const context = useContext(AppConfigContext)
  if (!context) {
    throw new Error('useAppConfig must be used within AppConfigProvider')
  }
  return context
}
