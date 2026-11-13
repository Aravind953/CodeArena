
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  LayoutGrid,
  List,
  ArrowUpRight
} from 'lucide-react'

import Navbar from '../components/layout/Navbar'
import './ProblemsPage.css'

const problems = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays',
    description: 'Find two numbers in an array that add up to a target.'
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Strings',
    description: 'Determine whether a string of brackets is valid.'
  },
  {
    id: 'maximum-subarray',
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    description: 'Find the contiguous subarray with the largest sum.'
  },
  {
    id: 'merge-intervals',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    category: 'Arrays',
    description: 'Merge all overlapping intervals.'
  },
  {
    id: 'binary-tree-inorder',
    title: 'Binary Tree Inorder Traversal',
    difficulty: 'Easy',
    category: 'Trees',
    description: 'Return the inorder traversal of a binary tree.'
  },
  {
    id: 'longest-palindrome',
    title: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    category: 'Strings',
    description: 'Find the longest palindromic substring.'
  },
  {
    id: 'median-two-arrays',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    category: 'Arrays',
    description: 'Find the median of two sorted arrays.'
  },
  {
    id: 'word-ladder',
    title: 'Word Ladder',
    difficulty: 'Hard',
    category: 'Graphs',
    description: 'Find the shortest transformation sequence between words.'
  },
  {
    id: 'coin-change',
    title: 'Coin Change',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    description: 'Find the minimum number of coins needed to make an amount.'
  }
]

const categories = [
  'All Categories',
  'Arrays',
  'Strings',
  'Dynamic Programming',
  'Trees',
  'Graphs'
]

function ProblemsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [difficulty, setDifficulty] = useState('All')
  const [category, setCategory] = useState('All Categories')
  const [view, setView] = useState('grid')

  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      const matchesSearch =
        problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        problem.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesDifficulty =
        difficulty === 'All' || problem.difficulty === difficulty

      const matchesCategory =
        category === 'All Categories' || problem.category === category

      return matchesSearch && matchesDifficulty && matchesCategory
    })
  }, [searchTerm, difficulty, category])

  const clearFilters = () => {
    setSearchTerm('')
    setDifficulty('All')
    setCategory('All Categories')
  }

  return (
    <main className="problems-page">

      <Navbar />

      <section className="problems-content">
        <div className="problems-heading">
          <span className="problems-eyebrow">
            CODEARENA / PRACTICE
          </span>

          <h1>Problem Library.</h1>

          <p>
            Sharpen your problem-solving skills.
            Choose a challenge and start coding.
          </p>
        </div>

        <div className="problems-toolbar">
          <div className="problems-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search problems..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <div className="problems-view-toggle">
            <button
              type="button"
              className={view === 'grid' ? 'active' : ''}
              onClick={() => setView('grid')}
              aria-label="Grid view"
            >
              <LayoutGrid size={18} />
            </button>

            <button
              type="button"
              className={view === 'list' ? 'active' : ''}
              onClick={() => setView('list')}
              aria-label="List view"
            >
              <List size={18} />
            </button>
          </div>
        </div>

        <div className="problems-results">
          <span>
            {filteredProblems.length} PROBLEMS FOUND
          </span>

          <button type="button" onClick={clearFilters}>
            Clear filters
          </button>
        </div>

        {filteredProblems.length > 0 ? (
          <div className={`problems-grid ${view === 'list' ? 'list-view' : ''}`}>
            {filteredProblems.map((problem, index) => (
              <Link
                to={`/problems/${problem.id}`}
                className="problem-card"
                key={problem.id}
              >
                <div className="problem-card-top">
                  <span className="problem-number">
                    #{String(index + 1).padStart(3, '0')}
                  </span>

                  <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>
                    {problem.difficulty}
                  </span>
                </div>

                <div className="problem-card-content">
                  <h3>{problem.title}</h3>
                  <p>{problem.description}</p>
                </div>

                <div className="problem-card-bottom">
                  <span>{problem.category}</span>
                  <ArrowUpRight size={19} />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="problems-empty">
            <Search size={30} />
            <h3>No problems found</h3>
            <p>Try changing your search or filters.</p>
            <button type="button" onClick={clearFilters}>
              Reset filters
            </button>
          </div>
        )}
      </section>
    </main>
  )
}

export default ProblemsPage
