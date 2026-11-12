
import { ArrowUpRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './WelcomePage.css'

function WelcomePage() {
  const navigate = useNavigate()

  return (
    <main className="welcome-page">
      <header className="welcome-header">
        <div className="welcome-logo">
          <span>//</span> CodeArena
        </div>
        <span className="welcome-version">WELCOME / 001</span>
      </header>

      <section className="welcome-content">
        <span className="welcome-eyebrow">
          YOUR CODING JOURNEY STARTS HERE
        </span>

        <h1>
          Welcome to
          <br />
          <span>CodeArena.</span>
        </h1>

        <p>
          Think better. Write better code.
          <br />
          Become a better programmer.
        </p>

        <button
          className="welcome-button"
          onClick={() => navigate('/home')}
        >
          Get Started
          <ArrowUpRight size={19} />
        </button>
      </section>

      <footer className="welcome-footer">
        <span>CODEARENA</span>
        <span>THINK. CODE. COMPETE.</span>
      </footer>
    </main>
  )
}

export default WelcomePage
