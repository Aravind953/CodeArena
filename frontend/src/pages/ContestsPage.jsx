
import { useState } from 'react'
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Trophy,
  Users
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import './ContestsPage.css'

const contests = [
  {
    id: 1,
    title: 'Weekly Coding Challenge #01',
    type: 'Weekly Contest',
    date: 'November 20, 2026',
    time: '7:00 PM IST',
    duration: '90 minutes',
    problems: 4,
    participants: 120,
    status: 'upcoming'
  },
  {
    id: 2,
    title: 'CodeArena Beginner Cup',
    type: 'Beginner Contest',
    date: 'November 25, 2026',
    time: '6:00 PM IST',
    duration: '60 minutes',
    problems: 3,
    participants: 85,
    status: 'upcoming'
  },
  {
    id: 3,
    title: 'Algorithm Masters #01',
    type: 'Rated Contest',
    date: 'December 2, 2026',
    time: '8:00 PM IST',
    duration: '120 minutes',
    problems: 5,
    participants: 210,
    status: 'upcoming'
  },
  {
    id: 4,
    title: 'CodeArena Launch Challenge',
    type: 'Special Contest',
    date: 'November 5, 2026',
    time: '7:00 PM IST',
    duration: '90 minutes',
    problems: 4,
    participants: 96,
    status: 'past',
    winner: 'Participant #001'
  },
  {
    id: 5,
    title: 'Algorithm Sprint #01',
    type: 'Weekly Contest',
    date: 'October 25, 2026',
    time: '6:00 PM IST',
    duration: '90 minutes',
    problems: 4,
    participants: 74,
    status: 'past',
    winner: 'Participant #014'
  }
]

function ContestsPage() {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [registeredContests, setRegisteredContests] = useState([])

  const visibleContests = contests.filter(
    (contest) => contest.status === activeTab
  )

  const handleRegistration = (contestId) => {
    setRegisteredContests((current) =>
      current.includes(contestId)
        ? current.filter((id) => id !== contestId)
        : [...current, contestId]
    )
  }

  return (
    <>
      <Navbar />

      <main className="contests-page">
        <section className="contests-content">
          <div className="contests-heading">
            <span className="contests-eyebrow">
              CODEARENA / COMPETITIONS
            </span>

            <h1>Compete. Improve. Win.</h1>

            <p>
              Challenge yourself, compete with other programmers
              and improve your problem-solving skills.
            </p>
          </div>

          <div className="contest-stats">
            <div className="contest-stat">
              <CalendarDays size={20} />
              <div>
                <strong>
                  {contests.filter((c) => c.status === 'upcoming').length}
                </strong>
                <span>Upcoming Contests</span>
              </div>
            </div>

            <div className="contest-stat">
              <Trophy size={20} />
              <div>
                <strong>
                  {contests.filter((c) => c.status === 'past').length}
                </strong>
                <span>Past Contests</span>
              </div>
            </div>

            <div className="contest-stat">
              <Users size={20} />
              <div>
                <strong>
                  {contests.reduce(
                    (total, contest) => total + contest.participants,
                    0
                  )}
                </strong>
                <span>Total Participants</span>
              </div>
            </div>
          </div>

          <div className="contests-tabs">
            <button
              type="button"
              className={activeTab === 'upcoming' ? 'active' : ''}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming Contests
            </button>

            <button
              type="button"
              className={activeTab === 'past' ? 'active' : ''}
              onClick={() => setActiveTab('past')}
            >
              Past Contests
            </button>
          </div>

          <div className="contests-list">
            {visibleContests.map((contest) => {
              const isRegistered = registeredContests.includes(contest.id)

              return (
                <article className="contest-card" key={contest.id}>
                  <div className="contest-card-main">
                    <div className="contest-card-heading">
                      <span className="contest-type">
                        {contest.type}
                      </span>

                      {contest.status === 'past' && (
                        <span className="contest-completed">
                          COMPLETED
                        </span>
                      )}
                    </div>

                    <h2>{contest.title}</h2>

                    <div className="contest-details">
                      <span>
                        <CalendarDays size={15} />
                        {contest.date}
                      </span>

                      <span>
                        <Clock3 size={15} />
                        {contest.time}
                      </span>

                      <span>
                        <Users size={15} />
                        {contest.participants} participants
                      </span>
                    </div>

                    <div className="contest-card-footer">
                      <span>{contest.duration}</span>
                      <span>{contest.problems} Problems</span>

                      {contest.status === 'past' && (
                        <span>Winner: {contest.winner}</span>
                      )}
                    </div>
                  </div>

                  <div className="contest-card-action">
                    {contest.status === 'upcoming' ? (
                      <button
                        type="button"
                        className={isRegistered ? 'registered' : ''}
                        onClick={() => handleRegistration(contest.id)}
                      >
                        {isRegistered ? 'Registered' : 'Register'}
                        {isRegistered ? (
                          <Trophy size={16} />
                        ) : (
                          <ArrowUpRight size={17} />
                        )}
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="leaderboard-button"
                        disabled
                      >
                        Leaderboard Soon
                      </button>
                    )}
                  </div>
                </article>
              )
            })}
          </div>

          {visibleContests.length === 0 && (
            <div className="contests-empty">
              <Trophy size={30} />
              <h3>No contests available</h3>
              <p>Check back later for more competitions.</p>
            </div>
          )}

          <div className="contests-footer-note">
            <span>CODEARENA COMPETITIONS</span>
            <span>THINK. CODE. COMPETE.</span>
          </div>
        </section>
      </main>
    </>
  )
}

export default ContestsPage
