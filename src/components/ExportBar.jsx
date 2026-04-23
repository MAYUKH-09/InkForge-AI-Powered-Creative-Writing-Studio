
import React from 'react';
export default function ExportBar({onExport, loading}) { 
  return (
    <div className="export-bar">
       <button className="btn" disabled={loading} onClick={() => onExport('txt')}>📝 TXT</button>
       <button className="btn" disabled={loading} onClick={() => onExport('pdf')}>📑 PDF</button>
       <button className="btn btn-primary" disabled={loading} onClick={() => onExport('docx')}>📄 DOCX</button>
    </div>
  );
}
