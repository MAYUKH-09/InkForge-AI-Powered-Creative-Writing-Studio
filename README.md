# 🖋️ InkForge — AI-Powered Creative Writing Studio

A full-stack web application that empowers users to **generate**, **refine**, **preview**, and **export** high-quality creative content using AI.

![InkForge Screenshot](https://img.shields.io/badge/Status-Production%20Ready-brightgreen) ![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB) ![Node](https://img.shields.io/badge/Backend-Express.js-339933) ![AI](https://img.shields.io/badge/AI-OpenAI%20GPT-412991)

---

## ✨ Features

- **🎯 Multi-Format Content Generation** — Stories, Essays, Poems, Scripts, Articles
- **🎨 8 Writing Styles** — Formal, Casual, Fantasy, Academic, Journalistic, Poetic, Technical, Humorous
- **🎭 8 Tone Options** — Professional, Friendly, Dramatic, Mysterious, Inspirational, Dark, Whimsical, Reflective
- **✏️ Live Editor** — Edit generated content directly in the workspace
- **🔄 AI Refinement** — Refine content with natural language instructions
- **📊 Content Analytics** — Word count, reading time, readability score, vocabulary richness
- **📤 Multi-Format Export** — Download as PDF, DOCX, or TXT
- **🌙 Premium Dark Theme** — Glassmorphism design with gradient accents
- **🤖 Dual Mode** — Works out of the box with built-in Demo Engine; switches to OpenAI GPT when API key is provided
- **📱 Fully Responsive** — Three-panel desktop layout that collapses to mobile

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or later
- npm (comes with Node.js)

### 1. Clone / Navigate to the project
```bash
cd "Creative Writing 2"
```

### 2. Start the Backend
```bash
cd backend
npm install
npm start
```
The backend starts on **http://localhost:3001** in **Demo Engine mode** (no API key needed).

### 3. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend starts on **http://localhost:5173**.

### 4. Open the App
Navigate to **http://localhost:5173** in your browser.

---

## 🤖 AI Modes

### Demo Engine (Default)
The app works **immediately out of the box** with a sophisticated built-in content generation engine. No API key required. It uses:
- Rich vocabulary banks
- Structural templates for each content type
- Randomized parameters for unique content each time

### OpenAI GPT Mode
To use OpenAI's GPT models for higher quality generation:

1. Copy `.env.example` to `.env` in the `backend/` folder
2. Add your OpenAI API key:
   ```
   OPENAI_API_KEY=sk-your-key-here
   ```
3. Restart the backend server

The app automatically detects the API key and switches modes.

---

## 📁 Project Structure

```
Creative Writing 2/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── generate.js        # POST /api/generate-content
│   │   │   ├── refine.js          # POST /api/refine-content
│   │   │   └── export.js          # POST /api/export
│   │   ├── services/
│   │   │   ├── openaiService.js   # GPT API wrapper + demo fallback
│   │   │   ├── promptBuilder.js   # Constructs prompts from input
│   │   │   ├── contentOptimizer.js# Readability & content analysis
│   │   │   └── demoEngine.js      # Built-in content generator
│   │   ├── middleware/
│   │   │   └── errorHandler.js
│   │   └── app.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── InputForm.jsx
│   │   │   ├── StyleSelector.jsx
│   │   │   ├── ContentEditor.jsx
│   │   │   ├── PreviewPanel.jsx
│   │   │   ├── ExportBar.jsx
│   │   │   ├── LoadingOverlay.jsx
│   │   │   └── Toast.jsx
│   │   ├── hooks/
│   │   │   └── useApi.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/generate-content` | Generate new creative content |
| POST | `/api/refine-content` | Refine existing content with instructions |
| POST | `/api/export` | Export content as PDF, DOCX, or TXT |
| GET | `/api/health` | Health check & mode detection |

### Generate Content — Request Body
```json
{
  "idea": "A mysterious traveler discovers an ancient library",
  "contentType": "story",
  "genre": "Fantasy",
  "tone": "mysterious",
  "style": "formal",
  "characters": "Elena, The Keeper",
  "keywords": "magic, secrets, discovery"
}
```

### Refine Content — Request Body
```json
{
  "content": "Your existing content here...",
  "instructions": "Make it more dramatic and add more dialogue"
}
```

### Export — Request Body
```json
{
  "content": "Content to export...",
  "format": "pdf",
  "title": "My Story Title"
}
```

---

## 🔐 Security

- API keys are stored in `.env` files (never committed to version control)
- All AI API calls are made from the **backend only**
- API keys are **never exposed** to the frontend
- The `.env` file is included in `.gitignore`

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite 5 |
| Styling | Vanilla CSS (glassmorphism, gradients) |
| Backend | Node.js + Express |
| AI | OpenAI GPT API (optional) |
| PDF Export | PDFKit |
| DOCX Export | docx |
| Typography | Inter + Playfair Display + JetBrains Mono |

---

## 📝 License

MIT License — feel free to use, modify, and distribute.
