
import { ArrowUpRight } from 'lucide-react'
import './Footer.css'

function Footer() {
  return (
    <footer className="ca-footer">
      <div className="ca-footer__main">

        <div className="ca-footer__brand">
          <h2>// CodeArena</h2>
          <p>
            Your journey to better coding starts here.
            Think, practice and grow as a developer.
          </p>
        </div>

        <div className="ca-footer__column">
          <h3>Platform</h3>
          <a href="#features">Features</a>
          <a href="#contests">Contests</a>
          <a href="#about">About</a>
        </div>

        <div className="ca-footer__column">
          <h3>Account</h3>
          <a href="/login">Login</a>
          <a href="/signup">Get Started</a>
        </div>

        <div className="ca-footer__column">
          <h3>Connect</h3>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={13} />
          </a>
        </div>

      </div>

      <div className="ca-footer__bottom">
        <span>© {new Date().getFullYear()} CodeArena.</span>
        <span>Think. Code. Grow.</span>
      </div>
    </footer>
  )
}

export default Footer
