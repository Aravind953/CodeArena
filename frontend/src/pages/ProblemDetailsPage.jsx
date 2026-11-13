import Navbar from '../components/layout/Navbar'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2
} from 'lucide-react'
import './ProblemDetailsPage.css'

const problems = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays',
    description:
      'Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target.',
    details:
      'You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'nums[0] + nums[1] == 9.'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'nums[1] + nums[2] == 6.'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10⁴',
      '-10⁹ <= nums[i] <= 10⁹',
      '-10⁹ <= target <= 10⁹',
      'Only one valid answer exists.'
    ]
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Strings',
    description:
      'Given a string containing only the characters (), {}, and [], determine whether the input string is valid.',
    details:
      'An input string is valid when every opening bracket is closed by the same type of bracket in the correct order.',
    examples: [
      { input: 's = "()"', output: 'true', explanation: 'The brackets match.' },
      { input: 's = "()[]{}"', output: 'true', explanation: 'All brackets match.' }
    ],
    constraints: ['1 <= s.length <= 10⁴', 's consists of brackets only.']
  },
  {
    id: 'maximum-subarray',
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    description:
      'Given an integer array nums, find the contiguous subarray with the largest sum and return its sum.',
    details: 'A subarray is a contiguous non-empty sequence of elements.',
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'The subarray [4,-1,2,1] has sum 6.' }
    ],
    constraints: ['1 <= nums.length <= 10⁵', '-10⁴ <= nums[i] <= 10⁴']
  },
  {
    id: 'merge-intervals',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    category: 'Arrays',
    description:
      'Given an array of intervals, merge all overlapping intervals and return an array of non-overlapping intervals.',
    details: 'Each interval is represented by [start, end].',
    examples: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]', explanation: 'The first two intervals overlap.' }
    ],
    constraints: ['1 <= intervals.length <= 10⁴', 'Intervals are represented by pairs of integers.']
  },
  {
    id: 'binary-tree-inorder',
    title: 'Binary Tree Inorder Traversal',
    difficulty: 'Easy',
    category: 'Trees',
    description:
      'Given the root of a binary tree, return the inorder traversal of its nodes values.',
    details: 'Inorder traversal visits the left subtree, current node, and then right subtree.',
    examples: [
      { input: 'root = [1,null,2,3]', output: '[1,3,2]', explanation: 'Visit nodes in left, root, right order.' }
    ],
    constraints: ['The number of nodes is in the range [0, 100].', '-100 <= Node.val <= 100']
  },
  {
    id: 'longest-palindrome',
    title: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    category: 'Strings',
    description:
      'Given a string s, return the longest palindromic substring in s.',
    details: 'A palindrome reads the same forward and backward.',
    examples: [
      { input: 's = "babad"', output: '"bab"', explanation: '"aba" is also a valid answer.' }
    ],
    constraints: ['1 <= s.length <= 1000', 's consists of printable ASCII characters.']
  },
  {
    id: 'median-two-arrays',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    category: 'Arrays',
    description:
      'Given two sorted arrays nums1 and nums2, return the median of the two sorted arrays.',
    details: 'The overall run time complexity should be O(log(m+n)).',
    examples: [
      { input: 'nums1 = [1,3], nums2 = [2]', output: '2.0', explanation: 'The merged array is [1,2,3].' }
    ],
    constraints: ['0 <= nums1.length, nums2.length <= 1000', 'Both arrays are sorted.', 'At least one array is non-empty.']
  },
  {
    id: 'word-ladder',
    title: 'Word Ladder',
    difficulty: 'Hard',
    category: 'Graphs',
    description:
      'Given beginWord, endWord and a dictionary wordList, return the length of the shortest transformation sequence.',
    details: 'Only one letter may be changed at a time, and every intermediate word must exist in wordList.',
    examples: [
      { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: '5', explanation: 'One shortest sequence is hit -> hot -> dot -> dog -> cog.' }
    ],
    constraints: ['1 <= beginWord.length <= 10', 'endWord.length == beginWord.length', 'All words have the same length.']
  },
  {
    id: 'coin-change',
    title: 'Coin Change',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    description:
      'You are given an integer array coins representing coin denominations and an integer amount. Return the fewest number of coins needed to make up that amount.',
    details: 'If the amount cannot be made up by any combination of coins, return -1.',
    examples: [
      { input: 'coins = [1,2,5], amount = 11', output: '3', explanation: '11 = 5 + 5 + 1.' }
    ],
    constraints: ['1 <= coins.length <= 12', '1 <= coins[i] <= 2³¹ - 1', '0 <= amount <= 10⁴']
  }
]

function ProblemDetailsPage() {
  const { problemId } = useParams()

  const problemIndex = problems.findIndex(
    (problem) => problem.id === problemId
  )

  const problem = problems[problemIndex]

  if (!problem) {
    return (
      <main className="problem-not-found">
        <h1>Problem not found.</h1>
        <Link to="/problems">Back to Problems</Link>
      </main>
    )
  }

  const previousProblem = problems[problemIndex - 1]
  const nextProblem = problems[problemIndex + 1]

  return (
    <main className="problem-details-page">
      <Navbar />

      <div className="details-container">
        <div className="details-breadcrumb">
          CODEARENA / PROBLEMS / {problem.category.toUpperCase()}
        </div>

        <div className="details-title-row">
          <div>
            <span className="details-number">
              PROBLEM #{String(problemIndex + 1).padStart(3, '0')}
            </span>

            <h1>{problem.title}</h1>
          </div>

          <span className={`details-difficulty ${problem.difficulty.toLowerCase()}`}>
            {problem.difficulty}
          </span>
        </div>

        <div className="details-meta">
          <span>{problem.category}</span>
          <span>Practice Problem</span>
          <span>CodeArena Library</span>
        </div>

        <section className="details-section">
          <h2>Problem Statement</h2>
          <p>{problem.description}</p>
          <p>{problem.details}</p>
        </section>

        <section className="details-section">
          <h2>Examples</h2>

          {problem.examples.map((example, index) => (
            <div className="example-card" key={index}>
              <h3>Example {index + 1}</h3>

              <div className="example-content">
                <p><strong>Input:</strong> {example.input}</p>
                <p><strong>Output:</strong> {example.output}</p>
                <p><strong>Explanation:</strong> {example.explanation}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="details-section">
          <h2>Constraints</h2>

          <ul className="constraints-list">
            {problem.constraints.map((constraint, index) => (
              <li key={index}>
                <CheckCircle2 size={15} />
                {constraint}
              </li>
            ))}
          </ul>
        </section>

        <div className="details-solve-area">
          <div>
            <h2>Ready to solve?</h2>
            <p>Open the coding workspace and put your logic to the test.</p>
          </div>

          <Link
  to={`/problems/${problem.id}/solve`}
  className="details-workspace-button"
>
  Open Coding Workspace
  <ArrowUpRight size={17} />
</Link>
        </div>

        <nav className="problem-navigation">
          {previousProblem ? (
            <Link to={`/problems/${previousProblem.id}`}>
              <ArrowLeft size={16} />
              Previous Problem
            </Link>
          ) : <span />}

          {nextProblem && (
            <Link to={`/problems/${nextProblem.id}`}>
              Next Problem
              <ArrowRight size={16} />
            </Link>
          )}
        </nav>
      </div>
    </main>
  )
}

export default ProblemDetailsPage
