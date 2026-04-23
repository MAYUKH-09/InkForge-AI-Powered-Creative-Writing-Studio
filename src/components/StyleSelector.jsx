
import React from 'react';

const STYLES = [
  { value: 'formal', label: 'Formal', icon: '👔' },
  { value: 'casual', label: 'Casual', icon: '☕' },
  { value: 'fantasy', label: 'Fantasy', icon: '🐉' },
  { value: 'academic', label: 'Academic', icon: '📚' },
  { value: 'journalistic', label: 'Journalistic', icon: '📰' },
  { value: 'poetic', label: 'Poetic', icon: '✨' },
  { value: 'technical', label: 'Technical', icon: '💻' },
  { value: 'humorous', label: 'Humorous', icon: '😄' },
];

export default function StyleSelector({selected, onChange}) { 
  return (
    <div className="style-selector">
      <div className="style-selector-label">Writing Style</div>
      <div className="style-grid">
        {STYLES.map(style => (
          <div 
            key={style.value} 
            className={`style-card ${selected === style.value ? 'selected' : ''}`}
            onClick={() => onChange(style.value)}
          >
            <span className="style-card-icon">{style.icon}</span>
            <span className="style-card-name">{style.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
