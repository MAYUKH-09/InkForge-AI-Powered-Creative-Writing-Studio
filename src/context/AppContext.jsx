
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
  const [documentTitle, setDocumentTitle] = useState('InkForge Document');
  
  const removeToast = (id) => setToasts(t => t.filter(x => x.id !== id));
  
  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 5000);
  };

  const handleGenerate = async (formData) => {
    setLoading(true);
    try {
      const payload = { ...formData, style: selectedStyle };
      const res = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Generation failed');
      
      setContent(data.content);
      setAnalysis(data.analysis);
      setMetadata(data.metadata);
      setDocumentTitle(data.title || formData.idea || 'InkForge Document');
      setIsGenerated(true);
      setActivePanel('editor');
      addToast('Content generated successfully!', 'success');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRefine = async (instructions) => {
    if (!content) return;
    setLoading(true);
    try {
      const res = await fetch('/api/refine-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, instructions })
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Refinement failed');
      
      setContent(data.content);
      setAnalysis(data.analysis);
      addToast('Content refined successfully!', 'success');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format) => {
    if (!content) return;
    setLoading(true);
    try {
      const safeTitle = documentTitle.substring(0, 50).trim() || 'InkForge Document';
      const safeFilename = safeTitle.replace(/[^a-z0-9]/gi, '_').replace(/_+/g, '_').replace(/_$/, '');
      const downloadName = safeFilename ? `${safeFilename}.${format}` : `InkForge_Document.${format}`;

      const res = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, format, title: safeTitle })
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Export failed');
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = downloadName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      addToast(`Exported as ${format.toUpperCase()}`, 'success');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

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
