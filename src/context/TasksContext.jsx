import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const TasksContext = createContext(null)
const STORAGE_KEY = 'boostme_tasks_v3'

const initialTasks = [
  {
    id: 1,
    title: 'מצגת משכנעת',
    caption: 'בנה מצגת קצרה שמציגה רעיון, בעיה ופתרון ברור.',
    difficulty: 'בינוני',
    proofType: 'link',
    proofLabel: 'קישור למצגת או קובץ',
    guidance: 'העלה את המצגת ל-Drive/Canva/PowerPoint Online והדבק כאן קישור לפני סימון ההשלמה.',
    proofValue: '/assets/boostme-demo-presentation.pptx',
    completed: false,
    completedAt: null
  },
  {
    id: 2,
    title: 'משא ומתן אסטרטגי',
    caption: 'תרגל פתיחת שיחה, הצגת ערך וסגירה מקצועית.',
    difficulty: 'קשה',
    proofType: 'checklist',
    proofLabel: 'סימון עצמי',
    guidance: 'לאחר ביצוע המשימה באופן עצמאי, סמן V להמשך.',
    proofValue: '',
    completed: false,
    completedAt: null
  },
  {
    id: 3,
    title: 'הובלת צוות',
    caption: 'כתוב הודעת עדכון צוותית עם מטרה, אחריות ולוח זמנים.',
    difficulty: 'בינוני',
    proofType: 'text',
    proofLabel: 'תוצר קצר',
    guidance: 'כתוב כאן משפט או קישור שמראה מה הכנת.',
    proofValue: '',
    completed: false,
    completedAt: null
  },
  {
    id: 4,
    title: 'רשת מקצועית',
    caption: 'פנה לשלושה אנשי קשר רלוונטיים באופן מקצועי.',
    difficulty: 'קל',
    proofType: 'checklist',
    proofLabel: 'סימון עצמי',
    guidance: 'לאחר ששלחת את הפניות בעצמך, סמן V להמשך.',
    proofValue: '',
    completed: false,
    completedAt: null
  }
]

function normalizeTask(task) {
  return {
    proofType: 'checklist',
    proofLabel: 'סימון עצמי',
    guidance: 'לאחר ביצוע המשימה באופן עצמאי, סמן V להמשך.',
    proofValue: '',
    ...task
  }
}

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState(initialTasks)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setTasks(JSON.parse(saved).map(normalizeTask))
      }
    } catch (error) {
      console.warn('Failed to load tasks', error)
    }
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch (error) {
      console.warn('Failed to save tasks', error)
    }
  }, [tasks])

  const toggleTask = (taskId) => {
    setTasks((prev) => prev.map((task) => {
      if (task.id !== taskId) return task
      const now = new Date().toISOString()
      const completed = !task.completed
      return {
        ...task,
        completed,
        completedAt: completed ? now : null
      }
    }))
  }

  const updateTaskProof = (taskId, proofValue) => {
    setTasks((prev) => prev.map((task) => (
      task.id === taskId ? { ...task, proofValue } : task
    )))
  }

  const addTask = ({ title, caption = '', difficulty = 'קל', proofType = 'checklist' }) => {
    setTasks((prev) => {
      const nextId = prev.length ? Math.max(...prev.map(t => t.id)) + 1 : 1
      const requiresProof = proofType !== 'checklist'
      const newTask = normalizeTask({
        id: nextId,
        title,
        caption,
        difficulty,
        proofType,
        proofLabel: requiresProof ? 'קישור או תיאור תוצר' : 'סימון עצמי',
        guidance: requiresProof
          ? 'אם יש תוצר למשימה, הוסף כאן קישור או תיאור קצר לפני סימון ההשלמה.'
          : 'לאחר ביצוע המשימה באופן עצמאי, סמן V להמשך.',
        completed: false,
        completedAt: null
      })
      return [newTask, ...prev]
    })
  }

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId))
  }

  const completedTasks = tasks.filter((task) => task.completed).length
  const activeTasks = tasks.length - completedTasks
  const taskProgress = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0

  const value = useMemo(
    () => ({ tasks, completedTasks, activeTasks, taskProgress, toggleTask, updateTaskProof, addTask, deleteTask }),
    [tasks, completedTasks, activeTasks, taskProgress]
  )

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}

export function useTasks() {
  const context = useContext(TasksContext)
  if (!context) {
    throw new Error('useTasks must be used within TasksProvider')
  }
  return context
}
