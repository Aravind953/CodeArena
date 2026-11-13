
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Editor from '@monaco-editor/react'
import {
  Play,
  Send,
  RotateCcw,
  Code2,
  Terminal,
  ChevronDown
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import './CodingWorkspace.css'

const starterCode = {
  python: `def twoSum(nums, target):
    # Write your solution here
    pass
`,
  javascript: `function twoSum(nums, target) {
    // Write your solution here
}
`,
  java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[]{};
    }
}`,
  cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
    }
};`
}

const languageConfig = {
  python: { label: 'Python 3', monaco: 'python' },
  javascript: { label: 'JavaScript', monaco: 'javascript' },
  java: { label: 'Java', monaco: 'java' },
  cpp: { label: 'C++', monaco: 'cpp' }
}

function CodingWorkspace() {
  const { problemId } = useParams()
  const [language, setLanguage] = useState('python')
  const [code, setCode] = useState(starterCode.python)
  const [activeTab, setActiveTab] = useState('testcases')
  const [consoleMessage, setConsoleMessage] = useState(
    'Your program output will appear here.'
  )

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value
    setLanguage(selectedLanguage)
    setCode(starterCode[selectedLanguage])
  }

  const handleRun = () => {
    setActiveTab('output')
    setConsoleMessage(
      'Code execution will be connected when we build the backend.'
    )
  }

  const handleSubmit = () => {
    setActiveTab('output')
    setConsoleMessage(
      'Submission evaluation will be available after backend integration.'
    )
  }

  return (
    <>
      <Navbar />

      <main className="coding-workspace">
        <div className="workspace-main">
          <section className="workspace-problem">
            <span className="workspace-eyebrow">
              PROBLEM / DESCRIPTION
            </span>

            <h1>{problemId?.replaceAll('-', ' ')}</h1>

            <span className="workspace-difficulty">
              Practice Problem
            </span>

            <div className="workspace-description">
              <h2>Problem Statement</h2>
              <p>
                Write an efficient solution for the selected coding problem.
                Read the problem details carefully and implement your approach
                in the editor.
              </p>

              <h2>Instructions</h2>
              <ul>
                <li>Select your preferred programming language.</li>
                <li>Write your solution in the code editor.</li>
                <li>Use the test case panel to prepare your inputs.</li>
                <li>Run and submit functionality will be connected later.</li>
              </ul>
            </div>

            <Link
              to={`/problems/${problemId}`}
              className="workspace-full-problem"
            >
              View full problem description
            </Link>
          </section>

          <section className="workspace-editor-section">
            <div className="editor-toolbar">
              <div className="editor-language">
                <Code2 size={17} />

                <select
                  value={language}
                  onChange={handleLanguageChange}
                >
                  {Object.entries(languageConfig).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.label}
                    </option>
                  ))}
                </select>

                <ChevronDown size={14} />
              </div>

              <button
                type="button"
                className="editor-reset"
                onClick={() => setCode(starterCode[language])}
              >
                <RotateCcw size={15} />
                Reset
              </button>
            </div>

            <div className="monaco-container">
              <Editor
                height="100%"
                language={languageConfig[language].monaco}
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value ?? '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: 'monospace',
                  padding: { top: 20 },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 4
                }}
              />
            </div>

            <div className="editor-actions">
              <button
                type="button"
                className="run-button"
                onClick={handleRun}
              >
                <Play size={16} />
                Run Code
              </button>

              <button
                type="button"
                className="submit-button"
                onClick={handleSubmit}
              >
                <Send size={16} />
                Submit
              </button>
            </div>

            <div className="workspace-console">
              <div className="console-tabs">
                <button
                  type="button"
                  className={activeTab === 'testcases' ? 'active' : ''}
                  onClick={() => setActiveTab('testcases')}
                >
                  <Code2 size={15} />
                  Test Cases
                </button>

                <button
                  type="button"
                  className={activeTab === 'output' ? 'active' : ''}
                  onClick={() => setActiveTab('output')}
                >
                  <Terminal size={15} />
                  Output
                </button>
              </div>

              <div className="console-content">
                {activeTab === 'testcases' ? (
                  <div className="testcase-placeholder">
                    <p>Test case input</p>
                    <textarea
                      placeholder="Enter your test input here..."
                      rows={3}
                    />
                  </div>
                ) : (
                  <pre>{consoleMessage}</pre>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default CodingWorkspace
