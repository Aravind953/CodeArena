
import { ArrowUpRight, Code2, Trophy, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Features from '../components/landing/Features'

import './HomePage.css'

function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section className="hero" id="home">

          <div className="hero__content">
            <span className="hero__eyebrow">
              THE NEXT GENERATION CODING ARENA
            </span>

            <h1>
              Don't just learn
              <br />
              to code. <span>Compete.</span>
            </h1>

            <p className="hero__description">
              Sharpen your programming skills, solve real-world challenges,
              compete with developers and become a better problem solver.
            </p>

            <div className="hero__actions">
              <Link
                to="/signup"
                className="hero__button hero__button--primary"
              >
                Start your journey
                <ArrowUpRight size={18} />
              </Link>

              <Link
                to="/login"
                className="hero__button hero__button--secondary"
              >
                Explore CodeArena
              </Link>
            </div>

            <div className="hero__trust">
              <span>01 / LEARN</span>
              <span>02 / PRACTICE</span>
              <span>03 / COMPETE</span>
            </div>
          </div>

          {/* HERO VISUAL */}
          <div className="hero__visual">
            <div className="hero__visual-label">
              CODE / 001
            </div>

            <div className="hero__orb">
              <div className="hero__orb-inner">
                <Code2 size={76} strokeWidth={1.2} />
              </div>
            </div>

            <div className="hero__floating-card hero__floating-card--top">
              <Trophy size={18} />
              <span>Challenge yourself</span>
            </div>

            <div className="hero__floating-card hero__floating-card--bottom">
              <Users size={18} />
              <span>Grow together</span>
            </div>

            <div className="hero__visual-caption">
              THINK. BUILD. IMPROVE.
            </div>
          </div>

        </section>

        {/* FEATURES SECTION */}
        <Features />

      </main>

      <Footer />
    </>
  )
}

export default HomePage
