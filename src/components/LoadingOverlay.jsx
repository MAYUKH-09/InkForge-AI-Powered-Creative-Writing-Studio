
import React from 'react';
export default function LoadingOverlay() { 
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <div className="loading-text">Generating</div>
      <div className="typewriter-container">
        <div className="typewriter-dot"></div>
        <div className="typewriter-dot"></div>
        <div className="typewriter-dot"></div>
      </div>
      <div className="loading-subtext">Forging your content using AI...</div>
    </div>
  );
}
