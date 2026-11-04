import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

function Dashboard({ user, onLogout }) {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProfile() {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Profile loading error:', error)
      } else {
        setProfile(data)
      }

      setLoading(false)
    }

    loadProfile()
  }, [user.id])

  async function handleLogout() {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Logout error:', error)
      return
    }

    onLogout()
  }

  if (loading) {
    return <p>Loading your dashboard...</p>
  }

  return (
    <div>
      <h1>Welcome to CodeArena</h1>

      {profile && (
        <div>
          <h2>{profile.display_name}</h2>

          <p>Username: @{profile.username}</p>

          <p>Rating: {profile.rating}</p>

          <p>Member since: {new Date(profile.created_at).toLocaleDateString()}</p>
        </div>
      )}

      <hr />

      <h2>Your Dashboard</h2>

      <p>Problems Solved: 0</p>
      <p>Contests Participated: 0</p>
      <p>Current Rating: {profile?.rating ?? 1200}</p>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default Dashboard