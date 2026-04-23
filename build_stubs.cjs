const fs = require('fs');
const path = require('path');

const dirs = [
  './src/context',
  './src/components'
];

dirs.forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

fs.writeFileSync('./src/context/AppContext.jsx', `
import React, { createContext, useContext, useState } from 'react';
const AppContext = createContext({});
export function AppProvider({ children }) {
  const [content, setContent] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [selectedStyle, setStyle] = useState('formal');
  const [activePanel, setActivePanel] = useState('input');
  const [isGenerated, setIsGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);
  
  const handleGenerate = async (formData) => {};
  const handleRefine = async (instructions) => {};
  const handleExport = async (format) => {};
  const removeToast = (id) => setToasts(t => t.filter(x => x.id !== id));

  return (
    <AppContext.Provider value={{
      content, analysis, metadata, selectedStyle, activePanel, isGenerated, loading, toasts,
      setStyle, setActivePanel, setContent, handleGenerate, handleRefine, handleExport, removeToast
    }}>
      {children}
    </AppContext.Provider>
  );
}
export const useAppContext = () => useContext(AppContext);
`);

fs.writeFileSync('./src/components/StyleSelector.jsx', `
import React from 'react';
export default function StyleSelector({selected, onChange}) { 
  return <div className="style-selector"></div>; 
}
`);

fs.writeFileSync('./src/components/ContentEditor.jsx', `
import React, { useState } from 'react';
export default function ContentEditor({content, onChange, onRefine, loading, isGenerated}) {
  const [refineText, setRefineText] = useState('');
  return (
    <div className="content-editor">
      {isGenerated ? (
         <textarea className="editor-area" value={content} onChange={e => onChange(e.target.value)} />
      ) : (
         <div className="editor-empty">
           <div className="editor-empty-icon">📝</div>
           <div className="editor-empty-title">No content generated yet</div>
           <div className="editor-empty-subtitle">Use the compose panel to generate something amazing.</div>
         </div>
      )}
      {isGenerated && (
         <div className="refine-section">
           <input className="refine-input input-field" placeholder="Refine instructions..." value={refineText} onChange={e => setRefineText(e.target.value)} />
           <button className="btn btn-primary" disabled={loading} onClick={() => onRefine(refineText)}>Refine</button>
         </div>
      )}
    </div>
  );
}
`);

fs.writeFileSync('./src/components/PreviewPanel.jsx', `
import React from 'react';
export default function PreviewPanel({content, analysis}) { 
  if (!content) return <div className="preview-empty"><div className="preview-empty-icon">👁️</div><p>Nothing to preview yet</p></div>;
  return (
    <div className="preview-panel">
       <div className="preview-content">{content}</div>
       {analysis && (
          <div className="preview-stats">
             <div className="stat-card"><div className="stat-value">{analysis.wordCount}</div><div className="stat-label">Words</div></div>
             <div className="stat-card"><div className="stat-value">{analysis.readingTime}m</div><div className="stat-label">Read Time</div></div>
          </div>
       )}
    </div>
  );
}
`);

fs.writeFileSync('./src/components/ExportBar.jsx', `
import React from 'react';
export default function ExportBar({onExport, loading}) { 
  return (
    <div className="export-bar">
       <button className="btn" disabled={loading} onClick={() => onExport('txt')}>Export TXT</button>
       <button className="btn" disabled={loading} onClick={() => onExport('pdf')}>Export PDF</button>
       <button className="btn" disabled={loading} onClick={() => onExport('docx')}>Export DOCX</button>
    </div>
  );
}
`);

fs.writeFileSync('./src/components/LoadingOverlay.jsx', `
import React from 'react';
export default function LoadingOverlay() { 
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <div className="loading-text">Generating...</div>
    </div>
  );
}
`);

fs.writeFileSync('./src/components/Toast.jsx', `
import React from 'react';
export default function Toast({message, type, onClose}) { 
  return (
    <div className={\`toast toast-\${type}\`}>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose}>×</button>
    </div>
  );
}
`);

console.log("Mock components created successfully.");
