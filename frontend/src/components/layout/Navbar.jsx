import { Link } from 'react-router-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useState } from 'react'
import Button from '../common/Button'
import './Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="ca-navbar">
      <div className="ca-navbar__container">

        <Link to="/" className="ca-logo" onClick={closeMenu}>
          <span className="ca-logo__symbol">//</span>
          CodeArena
        </Link>

        <button
          className="ca-navbar__mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={`ca-navbar__links ${menuOpen ? 'is-open' : ''}`}>
          <a href="#home" onClick={closeMenu}>Home</a>
          <a
  href="#features"
  onClick={(e) => {
    e.preventDefault()
    closeMenu()
    document.getElementById('features')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }}
>
  Features
</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#contests" onClick={closeMenu}>Contests</a>
        </nav>

        <div className="ca-navbar__actions">
          <Link to="/login" className="ca-navbar__login">
            Login
          </Link>

          <Button onClick={() => window.location.assign('/signup')}>
            Get Started <ArrowUpRight size={16} />
          </Button>
        </div>

      </div>
    </header>
  )
}

export default Navbar