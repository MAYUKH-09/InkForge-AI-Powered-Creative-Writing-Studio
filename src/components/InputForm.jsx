import { useState } from 'react'

const CONTENT_TYPES = [
  { value: 'story', label: '📖 Story' },
  { value: 'essay', label: '📝 Essay' },
  { value: 'poem', label: '🎭 Poem' },
  { value: 'script', label: '🎬 Script' },
  { value: 'article', label: '📰 Article' },
  { value: 'notice', label: '📌 Notice' },
  { value: 'report', label: '📊 Report' },
  { value: 'summary', label: '✂️ Summary' },
]

const GENRES = [
  'Fantasy', 'Science Fiction', 'Romance', 'Mystery', 'Thriller',
  'Horror', 'Literary Fiction', 'Historical', 'Adventure', 'Drama',
  'Comedy', 'Dystopian', 'Magical Realism', 'Noir',
]

const TONES = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'dramatic', label: 'Dramatic' },
  { value: 'mysterious', label: 'Mysterious' },
  { value: 'inspirational', label: 'Inspirational' },
  { value: 'dark', label: 'Dark' },
  { value: 'whimsical', label: 'Whimsical' },
  { value: 'reflective', label: 'Reflective' },
]

const TARGET_AUDIENCES = [
  { value: 'general', label: 'General' },
  { value: 'kids', label: 'Kids' },
  { value: 'teens', label: 'Teens' },
  { value: 'young adults', label: 'Young Adults' },
  { value: 'expert', label: 'Expert' },
];

export default function InputForm({ onGenerate, loading }) {
  const [formData, setFormData] = useState({
    idea: '',
    contentType: 'story',
    genre: '',
    tone: 'professional',
    characters: '',
    keywords: '',
    wordLimit: '',
    targetAudience: 'general',
  })

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.idea.trim()) return
    onGenerate(formData)
  }

  return (
    <form className="input-form" onSubmit={handleSubmit} id="input-form">
      {/* Idea / Prompt */}
      <div className="form-group">
        <label className="input-label" htmlFor="idea-input">Your Idea ✨</label>
        <textarea
          id="idea-input"
          className="input-field"
          placeholder="Describe your creative idea... (e.g., 'A mysterious traveler discovers an ancient library that exists between dimensions')"
          value={formData.idea}
          onChange={(e) => handleChange('idea', e.target.value)}
          rows={4}
          required
        />
      </div>

      {/* Content Type */}
      <div className="form-group">
        <label className="input-label" htmlFor="content-type">Content Type</label>
        <div className="style-grid">
          {CONTENT_TYPES.map(type => (
            <button
              key={type.value}
              type="button"
              className={`style-card ${formData.contentType === type.value ? 'selected' : ''}`}
              onClick={() => handleChange('contentType', type.value)}
              id={`content-type-${type.value}`}
            >
              <span className="style-card-name">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Genre & Tone */}
      <div className="form-row">
        <div className="form-group">
          <label className="input-label" htmlFor="genre-select">Genre</label>
          <select
            id="genre-select"
            className="input-field"
            value={formData.genre}
            onChange={(e) => handleChange('genre', e.target.value)}
          >
            <option value="">Select genre...</option>
            {GENRES.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="input-label" htmlFor="tone-select">Tone</label>
          <select
            id="tone-select"
            className="input-field"
            value={formData.tone}
            onChange={(e) => handleChange('tone', e.target.value)}
          >
            {TONES.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Characters and Audience */}
      <div className="form-row">
        <div className="form-group">
          <label className="input-label" htmlFor="characters-input">Characters</label>
          <input
            id="characters-input"
            type="text"
            className="input-field"
            placeholder="Character names (comma separated)"
            value={formData.characters}
            onChange={(e) => handleChange('characters', e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label className="input-label" htmlFor="audience-select">Audience</label>
          <select
            id="audience-select"
            className="input-field"
            value={formData.targetAudience}
            onChange={(e) => handleChange('targetAudience', e.target.value)}
          >
            {TARGET_AUDIENCES.map(a => (
              <option key={a.value} value={a.value}>{a.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Themes & Word Limit */}
      <div className="form-row">
        <div className="form-group">
          <label className="input-label" htmlFor="keywords-input">Themes</label>
          <input
            id="keywords-input"
            type="text"
            className="input-field"
            placeholder="Key themes or words to include"
            value={formData.keywords}
            onChange={(e) => handleChange('keywords', e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label className="input-label" htmlFor="word-limit-input">Word Limit</label>
          <input
            id="word-limit-input"
            type="number"
            className="input-field"
            placeholder="e.g. 500"
            min="50"
            max="10000"
            step="50"
            value={formData.wordLimit}
            onChange={(e) => handleChange('wordLimit', e.target.value)}
          />
        </div>
      </div>

      {/* Submit */}
      <div className="generate-btn-wrapper">
        <button
          type="submit"
          className="btn btn-primary generate-btn"
          disabled={loading || !formData.idea.trim()}
          id="generate-btn"
        >
          <span className="btn-shine"></span>
          {loading ? '⏳ Generating...' : '✨ Generate Content'}
        </button>
      </div>
    </form>
  )
}
