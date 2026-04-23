
import React from 'react';

export default function PreviewPanel({content, analysis}) { 
  if (!content) return (
    <div className="preview-empty">
      <div className="preview-empty-icon">👁️</div>
      <p>Nothing to preview yet</p>
    </div>
  );
  
  return (
    <div className="preview-panel">
       <div className="preview-content">{content}</div>
       {analysis && (
          <div className="preview-stats">
             <div className="stat-card">
               <div className="stat-value">{analysis.wordCount}</div>
               <div className="stat-label">Words</div>
             </div>
             <div className="stat-card">
               <div className="stat-value">{analysis.readingTime}m</div>
               <div className="stat-label">Read Time</div>
             </div>
             <div className="readability-meter" style={{ gridColumn: 'span 2' }}>
               <div className="meter-header">
                 <span className="meter-label">Readability Score</span>
                 <span className="meter-value">{analysis.readabilityScore}/100</span>
               </div>
               <div className="meter-bar">
                 <div className="meter-fill" style={{ width: `${analysis.readabilityScore}%` }}></div>
               </div>
             </div>
          </div>
       )}
    </div>
  );
}
