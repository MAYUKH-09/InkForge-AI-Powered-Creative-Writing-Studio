import { useState, useEffect } from 'react'

export default function Header() {
  const [mode, setMode] = useState('demo')

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setMode(data.mode || 'demo'))
      .catch(() => setMode('demo'))
  }, [])

  return (
    <header className="header" id="app-header">
      <div className="header-brand">
        <div className="header-logo" aria-hidden="true">✒️</div>
        <div className="header-text">
          <h1>InkForge</h1>
          <p className="header-tagline">AI-Powered Creative Writing Studio</p>
        </div>
      </div>
      <div className="header-actions">
        <div className={`mode-indicator ${mode}`}>
          <span className="mode-dot"></span>
          {mode === 'gemini' ? 'Gemini Connected' : 'Demo Engine Active'}
        </div>
      </div>
    </header>
  )
}
