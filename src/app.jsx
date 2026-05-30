import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { AppConfigProvider } from './context/AppConfigContext.jsx'
import { TasksProvider } from './context/TasksContext.jsx'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Challenges from './pages/Challenges.jsx'
import Journal from './pages/Journal.jsx'
import Progress from './pages/Progress.jsx'
import Profile from './pages/Profile.jsx'
import Achievements from './pages/Achievements.jsx'
import Admin from './pages/Admin.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import Landing from './pages/Landing.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {
  return (
    <AuthProvider>
      <AppConfigProvider>
        <TasksProvider>
          <Router>
            <div className="app-shell">
              <Sidebar />
              <div className="app-content">
                <Navbar />
                <main className="page-container">
                    <Routes>
                      <Route path="/" element={<Landing />} />
                      <Route path="/home" element={<Home />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />

                      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                      <Route path="/challenges" element={<ProtectedRoute><Challenges /></ProtectedRoute>} />
                      <Route path="/journal" element={<ProtectedRoute><Journal /></ProtectedRoute>} />
                      <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
                      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                      <Route path="/achievements" element={<ProtectedRoute><Achievements /></ProtectedRoute>} />

                      <Route path="/admin" element={<ProtectedRoute requireAdmin><Admin /></ProtectedRoute>} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>
                <Footer />
              </div>
            </div>
          </Router>
        </TasksProvider>
      </AppConfigProvider>
    </AuthProvider>
  )
}

export default App
