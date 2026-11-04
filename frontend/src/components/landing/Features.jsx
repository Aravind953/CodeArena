
import {
  Code2,
  Trophy,
  Users,
  BrainCircuit,
  ArrowUpRight
} from 'lucide-react'

import './Features.css'

const features = [
  {
    number: '01',
    icon: Code2,
    title: 'Coding Practice',
    description:
      'Solve programming challenges, improve your logic and strengthen your problem-solving skills.',
    tag: 'PRACTICE'
  },
  {
    number: '02',
    icon: Trophy,
    title: 'Competitive Contests',
    description:
      'Participate in timed coding competitions and challenge developers across the platform.',
    tag: 'COMPETE'
  },
  {
    number: '03',
    icon: Users,
    title: 'Collaborative Rooms',
    description:
      'Work together with other developers, share ideas and solve coding problems as a team.',
    tag: 'COLLABORATE'
  },
  {
    number: '04',
    icon: BrainCircuit,
    title: 'AI Code Analysis',
    description:
      'Understand your code better with intelligent feedback, suggestions and improvement insights.',
    tag: 'IMPROVE'
  }
]

function Features() {
  return (
    <section className="features" id="features">

      <div className="features__stats">
        <div>
          <h3>01</h3>
          <p>LEARN BY DOING</p>
        </div>

        <div>
          <h3>02</h3>
          <p>CHALLENGE YOURSELF</p>
        </div>

        <div>
          <h3>03</h3>
          <p>GROW TOGETHER</p>
        </div>

        <div>
          <h3>04</h3>
          <p>THINK SMARTER</p>
        </div>
      </div>

      <div className="features__header">
        <div>
          <span className="features__eyebrow">
            WHAT YOU CAN DO
          </span>

          <h2>
            Everything you need
            <br />
            to <span>level up.</span>
          </h2>
        </div>

        <p>
          One platform. Multiple ways to learn, practice,
          compete and become a better developer.
        </p>
      </div>

      <div className="features__grid">
        {features.map((feature) => {
          const Icon = feature.icon

          return (
            <article className="feature-card" key={feature.number}>
              <div className="feature-card__top">
                <span>{feature.number} / 04</span>
                <Icon size={25} strokeWidth={1.5} />
              </div>

              <div className="feature-card__content">
                <span className="feature-card__tag">
                  {feature.tag}
                </span>

                <h3>{feature.title}</h3>

                <p>{feature.description}</p>
              </div>

              <div className="feature-card__bottom">
                <span>EXPLORE FEATURE</span>
                <ArrowUpRight size={18} />
              </div>
            </article>
          )
        })}
      </div>

    </section>
  )
}

export default Features
