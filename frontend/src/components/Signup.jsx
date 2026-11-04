
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  User,
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowUpRight,
  Code2
} from 'lucide-react'

import { supabase } from '../supabase'
import './Signup.css'

function Signup({ onSignupSuccess, onSwitchToLogin }) {
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSignup(event) {
    event.preventDefault()

    setMessage('')
    setMessageType('')
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            username: username.trim(),
            display_name: displayName.trim(),
          },
        },
      })

      if (error) {
        setMessage(error.message)
        setMessageType('error')
        return
      }

      setMessage(
        'Account created! Check your email to verify your account.'
      )
      setMessageType('success')

      if (onSignupSuccess) {
        onSignupSuccess(data.user)
      }
    } catch (error) {
      setMessage(error.message || 'Something went wrong. Please try again.')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signup-page">

      {/* Header */}
      <header className="signup-header">
        <Link to="/" className="signup-logo">
          <span>//</span> CodeArena
        </Link>

        <Link to="/" className="signup-back">
          Back to home <ArrowUpRight size={16} />
        </Link>
      </header>

      {/* Main */}
      <main className="signup-main">

        <div className="signup-card">

          <div className="signup-icon">
            <Code2 size={27} strokeWidth={1.6} />
          </div>

          <span className="signup-eyebrow">
            JOIN THE COMMUNITY
          </span>

          <h1>
            Create your <span>account.</span>
          </h1>

          <p className="signup-description">
            Start learning, solving challenges and competing
            with developers on CodeArena.
          </p>

          <form onSubmit={handleSignup} className="signup-form">

            {/* Username */}
            <div className="signup-field">
              <label htmlFor="signup-username">Username</label>

              <div className="signup-input-wrapper">
                <User size={18} />

                <input
                  id="signup-username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Choose a username"
                  autoComplete="username"
                  minLength={3}
                  maxLength={30}
                  required
                />
              </div>
            </div>

            {/* Display Name */}
            <div className="signup-field">
              <label htmlFor="signup-display-name">Display name</label>

              <div className="signup-input-wrapper">
                <UserRound size={18} />

                <input
                  id="signup-display-name"
                  type="text"
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="signup-field">
              <label htmlFor="signup-email">Email address</label>

              <div className="signup-input-wrapper">
                <Mail size={18} />

                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="signup-field">
              <label htmlFor="signup-password">Password</label>

              <div className="signup-input-wrapper">
                <LockKeyhole size={18} />

                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  minLength={6}
                  required
                />

                <button
                  type="button"
                  className="signup-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <span className="signup-hint">
                Use at least 6 characters.
              </span>
            </div>

            {/* Feedback */}
            {message && (
              <div
                className={`signup-message signup-message--${messageType}`}
                role="alert"
              >
                {message}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="signup-submit"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account'}

              {!loading && <ArrowUpRight size={19} />}
            </button>

          </form>

          <div className="signup-divider">
            <span>ALREADY A MEMBER?</span>
          </div>

          <button
            type="button"
            className="signup-login"
            onClick={onSwitchToLogin}
          >
            Login to your account <ArrowUpRight size={17} />
          </button>

        </div>

        {/* Bottom */}
        <div className="signup-bottom">
          <span>01 / LEARN</span>
          <span>02 / PRACTICE</span>
          <span>03 / COMPETE</span>
        </div>

      </main>

    </div>
  )
}

export default Signup
