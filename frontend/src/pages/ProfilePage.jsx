
import { useEffect, useState } from 'react'
import {
  UserRound,
  Mail,
  CalendarDays,
  Trophy,
  Code2,
  Target,
  Pencil,
  ArrowLeft
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabase'
import Navbar from '../components/layout/Navbar'
import './ProfilePage.css'

function ProfilePage({ user }) {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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

        if (active) setProfile(data)
      } catch (err) {
        console.error('Profile loading error:', err)
        if (active) setError('Unable to load your profile.')
      } finally {
        if (active) setLoading(false)
      }
    }

    loadProfile()

    return () => {
      active = false
    }
  }, [user.id])

  const displayName =
    profile?.display_name ||
    profile?.username ||
    user.email?.split('@')[0] ||
    'Developer'

  const username = profile?.username || 'Developer'

  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : 'Recently joined'

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="profile-loading">
          <div className="profile-loader" />
          <p>Loading your profile...</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />

      <main className="profile-page">
        <div className="profile-container">

          <Link to="/dashboard" className="profile-back">
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          <section className="profile-hero">
            <div className="profile-identity">
              <div className="profile-avatar">
                <UserRound size={38} />
              </div>

              <div>
                <span className="profile-eyebrow">
                  CODEARENA / MY PROFILE
                </span>

                <h1>{displayName}</h1>
                <p>@{username}</p>
              </div>
            </div>

            <span className="profile-member-badge">
              MEMBER
            </span>
          </section>

          {error && (
            <div className="profile-error">{error}</div>
          )}

          <section className="profile-section">
            <div className="profile-section-heading">
              <div>
                <span className="profile-eyebrow">
                  ACCOUNT INFORMATION
                </span>
                <h2>Personal details</h2>
              </div>

              <Pencil size={20} />
            </div>

            <div className="profile-info-grid">
              <div className="profile-info-item">
                <UserRound size={19} />
                <div>
                  <span>Display Name</span>
                  <strong>{displayName}</strong>
                </div>
              </div>

              <div className="profile-info-item">
                <UserRound size={19} />
                <div>
                  <span>Username</span>
                  <strong>@{username}</strong>
                </div>
              </div>

              <div className="profile-info-item">
                <Mail size={19} />
                <div>
                  <span>Email Address</span>
                  <strong>{user.email || 'Not available'}</strong>
                </div>
              </div>

              <div className="profile-info-item">
                <CalendarDays size={19} />
                <div>
                  <span>Member Since</span>
                  <strong>{memberSince}</strong>
                </div>
              </div>
            </div>
          </section>

          <section className="profile-section">
            <div className="profile-section-heading">
              <div>
                <span className="profile-eyebrow">
                  PERFORMANCE
                </span>
                <h2>Coding statistics</h2>
              </div>

              <Target size={21} />
            </div>

            <div className="profile-stats-grid">
              <article className="profile-stat-card">
                <Code2 size={21} />
                <h3>—</h3>
                <span>Problems Solved</span>
              </article>

              <article className="profile-stat-card">
                <Trophy size={21} />
                <h3>—</h3>
                <span>Contests Joined</span>
              </article>

              <article className="profile-stat-card profile-stat-dark">
                <Target size={21} />
                <h3>{profile?.rating ?? 1200}</h3>
                <span>Current Rating</span>
              </article>
            </div>
          </section>

          <section className="profile-section">
            <div className="profile-section-heading">
              <div>
                <span className="profile-eyebrow">
                  CODING HISTORY
                </span>
                <h2>Recent submissions</h2>
              </div>
              <Code2 size={21} />
            </div>

            <div className="profile-empty">
              <Code2 size={26} />
              <h3>No submissions yet</h3>
              <p>
                Your submitted coding solutions will appear here.
              </p>

              <Link to="/problems">
                Start solving problems
              </Link>
            </div>
          </section>

          <footer className="profile-footer">
            <span>// CODEARENA</span>
            <span>THINK. CODE. COMPETE.</span>
          </footer>

        </div>
      </main>
    </>
  )
}

export default ProfilePage
