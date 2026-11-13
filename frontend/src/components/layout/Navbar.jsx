
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ArrowUpRight,
  LayoutDashboard,
  Code2,
  Trophy,
  UserRound,
  X
} from 'lucide-react'
import './Navbar.css'

const menuItems = [
  { label: 'Home', path: '/home', icon: LayoutDashboard },
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Problems', path: '/problems', icon: Code2 },
  { label: 'Contests', path: '/contests', icon: Trophy },
  { label: 'My Profile', path: '/profile', icon: UserRound }
]

function Navbar({ rightContent })  {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav className="navbar">
        <Link to="/home" className="navbar__logo" onClick={closeMenu}>
          <span>//</span> CodeArena
        </Link>

        <div className="navbar__actions">
  {rightContent}

  <Link to="/contests" className="navbar__contest-btn">
    Contests
    <ArrowUpRight size={16} />
  </Link>

  <button
            type="button"
            className={`navbar__menu-btn ${menuOpen ? 'is-open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div
        className={`navbar__overlay ${menuOpen ? 'is-visible' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <aside className={`navbar__drawer ${menuOpen ? 'is-open' : ''}`}>
        <div className="navbar__drawer-header">
          <span className="navbar__drawer-title">NAVIGATION / 001</span>

          <button
            type="button"
            className="navbar__close-btn"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X size={21} />
          </button>
        </div>

        <div className="navbar__drawer-content">
          <span className="navbar__drawer-label">EXPLORE CODEARENA</span>

          {menuItems.map((item, index) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={`navbar__menu-item ${isActive ? 'active' : ''}`}
                style={{ '--item-index': index }}
              >
                <span className="navbar__menu-item-left">
                  <Icon size={19} strokeWidth={1.7} />
                  {item.label}
                </span>

                <ArrowUpRight size={17} />
              </Link>
            )
          })}
        </div>

        <div className="navbar__drawer-footer">
          <span>THINK. CODE. COMPETE.</span>
          <span>CODEARENA © 2026</span>
        </div>
      </aside>
    </>
  )
}

export default Navbar
