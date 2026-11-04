
import { useEffect, useState } from 'react'
import {
  Routes,
  Route,
  Navigate,
  useNavigate
} from 'react-router-dom'

import { supabase } from './supabase'

import HomePage from './pages/HomePage'
import Signup from './components/Signup'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  // Check existing login session and listen for auth changes
  useEffect(() => {
    let mounted = true

    async function getInitialSession() {
      try {
        const { data, error } = await supabase.auth.getSession()

        if (error) throw error

        if (mounted) {
          setUser(data.session?.user ?? null)
        }
      } catch (error) {
        console.error('Session error:', error)
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    getInitialSession()

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setUser(session?.user ?? null)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  // Display loading screen while checking authentication
  if (loading) {
    return (
      <div className="app-loading">
        <h2>CodeArena</h2>
        <p>Preparing your arena...</p>
      </div>
    )
  }

  return (
    <Routes>

      {/* Landing Page */}
      <Route
        path="/"
        element={<HomePage />}
      />

      {/* Login Page */}
      <Route
        path="/login"
        element={
          user ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login
              onLoginSuccess={() => navigate('/dashboard')}
              onSwitchToSignup={() => navigate('/signup')}
            />
          )
        }
      />

      {/* Signup Page */}
      <Route
        path="/signup"
        element={
          user ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Signup
              onSwitchToLogin={() => navigate('/login')}
            />
          )
        }
      />

      {/* Protected Dashboard */}
      <Route
        path="/dashboard"
        element={
          user ? (
            <Dashboard
              user={user}
              onLogout={() => navigate('/login')}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Unknown URLs */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  )
}

export default App
