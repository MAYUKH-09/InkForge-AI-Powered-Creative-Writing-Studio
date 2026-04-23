
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
