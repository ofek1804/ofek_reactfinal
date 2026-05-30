import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const TasksContext = createContext(null)
const STORAGE_KEY = 'boostme_tasks'

const initialTasks = [
  {
    id: 1,
    title: 'מצגת משכנעת',
    caption: 'חזק את נוכחותך לפני משקיעים ולקוחות.',
    difficulty: 'בינוני',
    completed: false,
    completedAt: null
  },
  {
    id: 2,
    title: 'משא ומתן אסטרטגי',
    caption: 'הגה עמדה איתנה וקבל ערך ברור מהשיחה.',
    difficulty: 'קשה',
    completed: false,
    completedAt: null
  },
  {
    id: 3,
    title: 'הובלת צוות',
    caption: 'תגבר אמון ותשפיע על המוטיבציה של הצוות.',
    difficulty: 'בינוני',
    completed: false,
    completedAt: null
  },
  {
    id: 4,
    title: 'רשת מקצועית',
    caption: 'צור קשרים בעלי ערך ותיצור נראות עסקית.',
    difficulty: 'קל',
    completed: false,
    completedAt: null
  }
]

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState(initialTasks)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setTasks(JSON.parse(saved))
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

  const addTask = ({ title, caption = '', difficulty = 'קל' }) => {
    setTasks((prev) => {
      const nextId = prev.length ? Math.max(...prev.map(t => t.id)) + 1 : 1
      const newTask = {
        id: nextId,
        title,
        caption,
        difficulty,
        completed: false,
        completedAt: null
      }
      return [newTask, ...prev]
    })
  }

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId))
  }

  const completedTasks = tasks.filter((task) => task.completed).length
  const activeTasks = tasks.length - completedTasks
  const taskProgress = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0

  const value = useMemo(() => ({ tasks, completedTasks, activeTasks, taskProgress, toggleTask, addTask, deleteTask }), [tasks, completedTasks, activeTasks, taskProgress])

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}

export function useTasks() {
  const context = useContext(TasksContext)
  if (!context) {
    throw new Error('useTasks must be used within TasksProvider')
  }
  return context
}
