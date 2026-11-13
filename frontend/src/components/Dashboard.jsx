
import { useEffect, useState } from 'react'
import {
  Activity,
  ArrowUpRight,
  Code2,
  Trophy,
  Target,
  Clock3,
  LogOut,
  UserRound
} from 'lucide-react'

import { Link } from 'react-router-dom'
import { supabase } from '../supabase'
import Navbar from './layout/Navbar'
import './Dashboard.css'

function Dashboard({ user, onLogout }) {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [profileError, setProfileError] = useState('')
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    let active = true

    async function loadProfile() {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error) throw error

        if (active) {
          setProfile(data)
        }
      } catch (error) {
        console.error('Profile loading error:', error)

        if (active) {
          setProfileError('Unable to load your profile.')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadProfile()

    return () => {
      active = false
    }
  }, [user.id])

  async function handleLogout() {
    setLoggingOut(true)

    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Logout error:', error)
      setLoggingOut(false)
      return
    }

    onLogout()
  }

  const displayName =
    profile?.display_name ||
    profile?.username ||
    user.email?.split('@')[0] ||
    'Developer'

  const username = profile?.username || 'Developer'

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="dashboard-loading">
          <div className="dashboard-loader" />
          <p>Preparing your dashboard...</p>
        </div>
      </>
    )
  }

  const rating = profile?.rating ?? 1200

  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString(
        'en-IN',
        { day: 'numeric', month: 'long', year: 'numeric' }
      )
    : 'Recently joined'

  return (
    <main className="dashboard-page">

      <Navbar
        rightContent={
          <div className="dashboard-nav-user">
            <div className="dashboard-avatar">
              <UserRound size={17} />
            </div>
            <span>{username}</span>
          </div>
        }
      />

      <div className="dashboard-container">

        {/* Welcome section */}
        <section className="dashboard-welcome">
          <div>
            <span className="dashboard-eyebrow">
              YOUR PERSONAL WORKSPACE
            </span>

            <h1>
              Welcome back,
              <br />
              <span>{displayName}.</span>
            </h1>

            <p>
              Ready to solve problems and sharpen your coding skills?
            </p>
          </div>

          <div className="dashboard-welcome-actions">
            <div className="dashboard-member">
              <span>MEMBER SINCE</span>
              <strong>{memberSince}</strong>
            </div>

            <button
              className="dashboard-logout"
              onClick={handleLogout}
              disabled={loggingOut}
            >
              <LogOut size={16} />
              {loggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </section>

        {profileError && (
          <div className="dashboard-error">
            {profileError} Some profile information may be unavailable.
          </div>
        )}

        {/* Statistics */}
        <section className="dashboard-stats">
          <article className="dashboard-stat-card">
            <div className="dashboard-stat-top">
              <span>PROBLEMS SOLVED</span>
              <Code2 size={20} />
            </div>
            <h2>—</h2>
            <p>Practice tracking coming soon</p>
          </article>

          <article className="dashboard-stat-card">
            <div className="dashboard-stat-top">
              <span>CONTESTS JOINED</span>
              <Trophy size={20} />
            </div>
            <h2>—</h2>
            <p>Contest tracking coming soon</p>
          </article>

          <article className="dashboard-stat-card dashboard-stat-card--dark">
            <div className="dashboard-stat-top">
              <span>YOUR RATING</span>
              <Target size={20} />
            </div>
            <h2>{rating}</h2>
            <p>Current CodeArena rating</p>
          </article>
        </section>

        {/* Main dashboard content */}
        <section className="dashboard-main-grid">

          <article className="dashboard-panel">
            <div className="dashboard-panel-heading">
              <div>
                <span className="dashboard-eyebrow">
                  YOUR PROGRESS
                </span>
                <h2>Coding activity</h2>
              </div>
              <Activity size={21} />
            </div>

            <div className="dashboard-empty">
              <div className="dashboard-empty-icon">
                <Activity size={25} />
              </div>
              <h3>Your journey starts here.</h3>
              <p>
                Your coding activity and progress will appear
                here once you start solving problems.
              </p>
            </div>
          </article>

          <article className="dashboard-panel">
            <div className="dashboard-panel-heading">
              <div>
                <span className="dashboard-eyebrow">
                  RECENT ACTIVITY
                </span>
                <h2>Recent submissions</h2>
              </div>
              <Clock3 size={21} />
            </div>

            <div className="dashboard-empty">
              <div className="dashboard-empty-icon">
                <Code2 size={25} />
              </div>
              <h3>No submissions yet.</h3>
              <p>
                Your submitted solutions will appear here.
              </p>
            </div>
          </article>

        </section>

        {/* Quick access */}
        <section className="dashboard-quick-access">
          <div>
            <span className="dashboard-eyebrow">
              KEEP MOVING FORWARD
            </span>
            <h2>Your next challenge awaits.</h2>
            <p>
              Explore coding challenges and prepare to compete.
            </p>
          </div>

          <Link to="/problems" className="dashboard-coming-soon">
            <span>EXPLORE PROBLEMS</span>
            <ArrowUpRight size={25} />
          </Link>
        </section>

        <footer className="dashboard-footer">
          <span>// CODEARENA</span>
          <span>THINK. CODE. COMPETE.</span>
        </footer>

      </div>
    </main>
  )
}

export default Dashboard
