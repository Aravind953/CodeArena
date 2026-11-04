
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowUpRight,
  Code2
} from 'lucide-react'

import { supabase } from '../supabase'
import './Login.css'

function Login({ onLoginSuccess, onSwitchToSignup }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(event) {
    event.preventDefault()

    setMessage('')
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setMessage(error.message)
        return
      }

      if (onLoginSuccess) {
        onLoginSuccess(data.user)
      }
    } catch (error) {
      setMessage(error.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">

      {/* Header */}
      <header className="login-header">
        <Link to="/" className="login-logo">
          <span>//</span> CodeArena
        </Link>

        <Link to="/" className="login-back">
          Back to home <ArrowUpRight size={16} />
        </Link>
      </header>

      {/* Main */}
      <main className="login-main">

        <div className="login-card">

          <div className="login-icon">
            <Code2 size={27} strokeWidth={1.6} />
          </div>

          <span className="login-eyebrow">
            WELCOME BACK
          </span>

          <h1>
            Enter the <span>arena.</span>
          </h1>

          <p className="login-description">
            Continue your journey. Learn, practice and become
            a better developer.
          </p>

          <form onSubmit={handleLogin} className="login-form">

            {/* Email */}
            <div className="login-field">
              <label htmlFor="login-email">Email address</label>

              <div className="login-input-wrapper">
                <Mail size={18} />

                <input
                  id="login-email"
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
            <div className="login-field">
              <div className="login-label-row">
                <label htmlFor="login-password">Password</label>
              </div>

              <div className="login-input-wrapper">
                <LockKeyhole size={18} />

                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {message && (
              <div className="login-message" role="alert">
                {message}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Enter CodeArena'}

              {!loading && <ArrowUpRight size={19} />}
            </button>

          </form>

          <div className="login-divider">
            <span>NEW TO CODEARENA?</span>
          </div>

          <button
            type="button"
            className="login-signup"
            onClick={onSwitchToSignup}
          >
            Create your account <ArrowUpRight size={17} />
          </button>

        </div>

        {/* Bottom text */}
        <div className="login-bottom">
          <span>01 / LEARN</span>
          <span>02 / PRACTICE</span>
          <span>03 / COMPETE</span>
        </div>

      </main>

    </div>
  )
}

export default Login
