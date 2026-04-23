import './App.css'
import { AppProvider, useAppContext } from './context/AppContext'
import Header from './components/Header'
import InputForm from './components/InputForm'
import StyleSelector from './components/StyleSelector'
import ContentEditor from './components/ContentEditor'
import PreviewPanel from './components/PreviewPanel'
import ExportBar from './components/ExportBar'
import LoadingOverlay from './components/LoadingOverlay'
import Toast from './components/Toast'

/**
 * Main workspace layout — dramatically simplified.
 * All state and logic is managed by AppContext.
 */
function AppContent() {
  const {
    content, analysis, metadata, selectedStyle, activePanel,
    isGenerated, loading, toasts,
    setStyle, setActivePanel, setContent,
    handleGenerate, handleRefine, handleExport, removeToast,
  } = useAppContext()

  return (
    <div className="app">
      <Header />

      {/* Mobile Navigation */}
      <nav className="mobile-nav">
        {['input', 'editor', 'preview'].map(panel => (
          <button
            key={panel}
            className={`mobile-nav-btn ${activePanel === panel ? 'active' : ''}`}
            onClick={() => setActivePanel(panel)}
          >
            <span className="nav-icon">
              {panel === 'input' ? '✏️' : panel === 'editor' ? '📝' : '👁️'}
            </span>
            <span>{panel === 'input' ? 'Compose' : panel === 'editor' ? 'Editor' : 'Preview'}</span>
          </button>
        ))}
      </nav>

      {/* Main Workspace */}
      <main className="workspace">
        {/* Input Panel */}
        <section className={`panel panel-input ${activePanel === 'input' ? 'panel-active' : ''}`}>
          <div className="panel-header">
            <h2 className="panel-title">
              <span className="panel-icon">✨</span>
              Compose
            </h2>
            <span className="badge badge-purple">Input</span>
          </div>
          <div className="panel-content">
            <StyleSelector selected={selectedStyle} onChange={setStyle} />
            <InputForm onGenerate={handleGenerate} loading={loading} />
          </div>
        </section>

        {/* Editor Panel */}
        <section className={`panel panel-editor ${activePanel === 'editor' ? 'panel-active' : ''}`}>
          <div className="panel-header">
            <h2 className="panel-title">
              <span className="panel-icon">📝</span>
              Editor
            </h2>
            {metadata && (
              <span className={`badge ${metadata.mode === 'gemini' ? 'badge-success' : 'badge-cyan'}`}>
                {metadata.mode === 'gemini' ? 'Gemini' : 'Demo'} Engine
              </span>
            )}
          </div>
          <div className="panel-content">
            <ContentEditor
              content={content}
              onChange={setContent}
              onRefine={handleRefine}
              loading={loading}
              isGenerated={isGenerated}
            />
            {isGenerated && (
              <ExportBar onExport={handleExport} loading={loading} />
            )}
          </div>
        </section>

        {/* Preview Panel */}
        <section className={`panel panel-preview ${activePanel === 'preview' ? 'panel-active' : ''}`}>
          <div className="panel-header">
            <h2 className="panel-title">
              <span className="panel-icon">👁️</span>
              Preview
            </h2>
            {analysis && (
              <span className="badge badge-success">
                {analysis.readingLevel}
              </span>
            )}
          </div>
          <div className="panel-content">
            <PreviewPanel content={content} analysis={analysis} />
          </div>
        </section>
      </main>

      {/* Loading Overlay */}
      {loading && <LoadingOverlay />}

      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * App root — wraps content in the provider.
 */
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App
